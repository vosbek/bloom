import { createElement } from 'react'
import { act, create, type ReactTestRenderer } from 'react-test-renderer'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'

import { FlowerInviteCard, FlowerThemeProvider, SidecarHostProvider } from '@blume/sidecar-ui'
import { createFixtureHost } from '@blume/sidecar-ui/testing'
;(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')

beforeAll(() => {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      clearTimeout,
      setTimeout,
      localStorage: {
        getItem: () => null,
        setItem: () => undefined
      }
    }
  })
})

afterAll(() => {
  if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow)
  else Reflect.deleteProperty(globalThis, 'window')
})

test('invite link loads on mount so the first Share gesture opens sharing synchronously', async () => {
  let resolveLink!: (value: { code: string; inviteUrl: string }) => void
  const linkRequest = new Promise<{ code: string; inviteUrl: string }>((resolve) => {
    resolveLink = resolve
  })
  let userActivation = false
  let activationAtShare: boolean | null = null
  const getLink = vi.fn(() => linkRequest)
  const shareText = vi.fn(async () => {
    activationAtShare = userActivation
    return 'shared' as const
  })
  const host = createFixtureHost({
    system: {
      platform: 'web',
      runtime: 'web-lab',
      shareText
    }
  })
  host.referrals.getLink = getLink

  let renderer!: ReactTestRenderer
  await act(async () => {
    renderer = create(
      createElement(
        SidecarHostProvider,
        { host },
        createElement(FlowerThemeProvider, null, createElement(FlowerInviteCard))
      )
    )
    await Promise.resolve()
  })

  expect(getLink).toHaveBeenCalledOnce()
  expect(JSON.stringify(renderer.toJSON())).toContain('Creating invite link…')

  await act(async () => {
    resolveLink({
      code: 'delicate-bluebell-in-rain',
      inviteUrl: 'https://blume.codes/invite/delicate-bluebell-in-rain'
    })
    await linkRequest
  })
  expect(JSON.stringify(renderer.toJSON())).toContain(
    'https://blume.codes/invite/delicate-bluebell-in-rain'
  )

  const findShareButton = () =>
    renderer.root.find((node) => node.props['aria-label'] === 'Share invite link')

  await act(async () => {
    userActivation = true
    findShareButton().props.onClick()
    userActivation = false
    await Promise.resolve()
  })
  expect(getLink).toHaveBeenCalledOnce()
  expect(shareText).toHaveBeenCalledOnce()
  expect(activationAtShare).toBe(true)

  act(() => renderer.unmount())

  await act(async () => {
    renderer = create(
      createElement(
        SidecarHostProvider,
        { host },
        createElement(FlowerThemeProvider, null, createElement(FlowerInviteCard))
      )
    )
    await Promise.resolve()
  })

  expect(JSON.stringify(renderer.toJSON())).toContain(
    'https://blume.codes/invite/delicate-bluebell-in-rain'
  )
  expect(getLink).toHaveBeenCalledOnce()

  act(() => renderer.unmount())

  const replacementHost = createFixtureHost()
  replacementHost.referrals.getLink = () => new Promise(() => {})
  await act(async () => {
    renderer = create(
      createElement(
        SidecarHostProvider,
        { host: replacementHost },
        createElement(FlowerThemeProvider, null, createElement(FlowerInviteCard))
      )
    )
    await Promise.resolve()
  })

  expect(JSON.stringify(renderer.toJSON())).toContain('Creating invite link…')
  expect(JSON.stringify(renderer.toJSON())).not.toContain(
    'https://blume.codes/invite/delicate-bluebell-in-rain'
  )

  act(() => renderer.unmount())
})


test('the highlighted invite CopyLine copies its complete URL and keeps Share separate', async () => {
  const inviteUrl = 'https://blume.codes/invite/delicate-bluebell-in-rain'
  const writeText = vi.fn(async () => {})
  const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { clipboard: { writeText } }
  })
  const host = createFixtureHost()
  host.referrals.getLink = async () => ({ code: 'delicate-bluebell-in-rain', inviteUrl })
  let renderer: ReactTestRenderer | undefined
  try {
    await act(async () => {
      renderer = create(createElement(SidecarHostProvider, { host },
        createElement(FlowerThemeProvider, null, createElement(FlowerInviteCard))))
    })
    const line = renderer!.root.findByProps({ 'data-copy-line': 'url' })
    expect(line.props['data-highlight']).toBe(true)
    const target = line.findByProps({ 'data-copy-target': true })
    expect(target.props.disabled).toBe(false)
    expect(target.props['aria-label']).toContain(inviteUrl)
    expect(line.findAll((node) => node.type === 'button' && node.props['aria-label'] === 'Share invite link')).toHaveLength(1)
    await act(async () => { await target.props.onClick() })
    expect(writeText).toHaveBeenCalledExactlyOnceWith(inviteUrl)
    expect(JSON.stringify(renderer!.toJSON())).toContain('Invite link copied')
  } finally {
    if (renderer) act(() => renderer!.unmount())
    if (originalNavigator) Object.defineProperty(globalThis, 'navigator', originalNavigator)
    else Reflect.deleteProperty(globalThis, 'navigator')
  }
})
