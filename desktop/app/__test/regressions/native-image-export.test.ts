import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  appOnce: vi.fn(),
  readdir: vi.fn(async () => [
    'blume-share-leftover.png',
    'blume-share-active.png',
    'unrelated.txt'
  ]),
  owner: { id: 'share-owner' },
  sharePopup: vi.fn(),
  shareItems: [] as unknown[],
  stat: vi.fn(async (filePath: string) => ({
    mtimeMs: filePath.includes('active') ? Date.now() : 0
  })),
  unlink: vi.fn(async () => undefined),
  unlinkSync: vi.fn(),
  willQuit: undefined as (() => void) | undefined,
  writeFile: vi.fn(async () => undefined)
}))

vi.mock('electron', () => ({
  app: {
    getPath: () => '/tmp',
    once: (event: string, callback: () => void) => {
      mocks.appOnce(event, callback)
      mocks.willQuit = callback
    }
  },
  BrowserWindow: { fromWebContents: () => mocks.owner },
  dialog: { showSaveDialog: vi.fn() },
  ShareMenu: class {
    constructor(item: unknown) {
      mocks.shareItems.push(item)
    }
    popup(options?: unknown): void {
      mocks.sharePopup(options)
    }
  }
}))

vi.mock('node:fs', () => ({ unlinkSync: mocks.unlinkSync }))
vi.mock('node:fs/promises', () => ({
  readdir: mocks.readdir,
  stat: mocks.stat,
  unlink: mocks.unlink,
  writeFile: mocks.writeFile
}))

import {
  createDesktopNativeImageExportFacade,
  parseImageExportRequest,
  parseShareTextRequest
} from '../../src/main/nativeImageExport'

const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform')

beforeEach(() => {
  vi.clearAllMocks()
  mocks.willQuit = undefined
  mocks.shareItems.length = 0
  mocks.readdir.mockResolvedValue([
    'blume-share-leftover.png',
    'blume-share-active.png',
    'unrelated.txt'
  ])
  Object.defineProperty(process, 'platform', { configurable: true, value: 'darwin' })
})

afterAll(() => {
  if (originalPlatform) Object.defineProperty(process, 'platform', originalPlatform)
})

describe('native image export boundary', () => {
  test('validates public text-share requests', () => {
    expect(
      parseShareTextRequest({
        title: 'Grow with Blume',
        text: 'Come grow your garden.',
        url: 'https://blume.codes/invite/beautiful-rose-in-rain'
      })
    ).toEqual({
      title: 'Grow with Blume',
      text: 'Come grow your garden.',
      url: 'https://blume.codes/invite/beautiful-rose-in-rain'
    })
    expect(() =>
      parseShareTextRequest({ title: 'Blume', text: 'Nope', url: 'file:///tmp/private' })
    ).toThrow('Invalid share URL')
  })

  test('opens the macOS share sheet with text and the invite URL', async () => {
    let handler: ((event: { sender: object }, input: unknown) => unknown) | undefined
    const facade = createDesktopNativeImageExportFacade()
    facade.registerIpcHandlers(((channel: string, callback: typeof handler) => {
      if (channel === 'share:text') handler = callback
    }) as never)

    const result = await handler?.(
      { sender: {} },
      {
        title: 'Grow with Blume',
        text: 'Come grow your garden.',
        url: 'https://blume.codes/invite/beautiful-rose-in-rain'
      }
    )

    expect(result).toBe('opened')
    expect(mocks.shareItems).toEqual([
      {
        texts: ['Come grow your garden.'],
        urls: ['https://blume.codes/invite/beautiful-rose-in-rain']
      }
    ])
    expect(mocks.sharePopup).toHaveBeenCalledWith({ window: mocks.owner })
  })

  test('accepts encoded SVG images and sanitizes the suggested file name', () => {
    const parsed = parseImageExportRequest({
      dataUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent('<svg></svg>')}`,
      suggestedName: '../../My Flower.svg',
      target: 'original'
    })

    expect(parsed.extension).toBe('svg')
    expect(parsed.suggestedName).toBe('My-Flower.svg')
    expect(parsed.bytes.toString()).toBe('<svg></svg>')
  })

  test('accepts generated PNG wallpaper data and rejects non-image payloads', () => {
    const parsed = parseImageExportRequest({
      dataUrl: 'data:image/png;base64,aGVsbG8=',
      suggestedName: 'flower-phone.png',
      target: 'phone'
    })
    expect(parsed.target).toBe('phone')
    expect(parsed.bytes.toString()).toBe('hello')

    expect(() =>
      parseImageExportRequest({
        dataUrl: 'data:text/plain;base64,aGVsbG8=',
        suggestedName: 'bad.txt',
        target: 'phone'
      })
    ).toThrow('Unsupported image data')
  })

  test('cleans stale share files and active files when the app quits', async () => {
    let handler: ((event: { sender: object }, input: unknown) => Promise<void>) | undefined
    const facade = createDesktopNativeImageExportFacade()
    facade.registerIpcHandlers(((channel: string, callback: typeof handler) => {
      if (channel === 'image:export') handler = callback
    }) as never)

    expect(mocks.appOnce).toHaveBeenCalledWith('will-quit', expect.any(Function))
    await handler?.(
      { sender: {} },
      {
        dataUrl: 'data:image/png;base64,aGVsbG8=',
        suggestedName: 'flower-phone.png',
        target: 'phone'
      }
    )

    expect(mocks.unlink).toHaveBeenCalledWith('/tmp/blume-share-leftover.png')
    expect(mocks.unlink).not.toHaveBeenCalledWith('/tmp/blume-share-active.png')
    const temporaryPath = mocks.writeFile.mock.calls[0]?.[0]
    expect(temporaryPath).toMatch(/^\/tmp\/blume-share-.+\.png$/)
    mocks.willQuit?.()
    expect(mocks.unlinkSync).toHaveBeenCalledWith(temporaryPath)
  })

  test('removes the temporary file immediately when the share menu fails', async () => {
    mocks.sharePopup.mockImplementationOnce(() => {
      throw new Error('share menu unavailable')
    })
    let handler: ((event: { sender: object }, input: unknown) => Promise<void>) | undefined
    const facade = createDesktopNativeImageExportFacade()
    facade.registerIpcHandlers(((channel: string, callback: typeof handler) => {
      if (channel === 'image:export') handler = callback
    }) as never)

    await expect(
      handler?.(
        { sender: {} },
        {
          dataUrl: 'data:image/png;base64,aGVsbG8=',
          suggestedName: 'flower-phone.png',
          target: 'phone'
        }
      )
    ).rejects.toThrow('share menu unavailable')
    expect(mocks.unlink).toHaveBeenCalledWith(mocks.writeFile.mock.calls[0]?.[0])
  })
})
