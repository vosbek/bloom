import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const CONVERSATION_RUNTIME = resolve(HERE, '../../src/main/conversations/index.ts')
const REFRESH_HOST = resolve(HERE, '../../src/main/conversations/refreshHost.ts')
const REFRESH_WORKER = resolve(HERE, '../../src/main/conversations/refreshWorker.ts')
const MAIN_INDEX = resolve(HERE, '../../src/main/index.ts')
const NATIVE_MENU_BAR = resolve(HERE, '../../src/main/nativeMenuBarStatus.ts')

describe('desktop conversation refresh worker policy', () => {
  test('does not fall back to running refresh or boot ingest on Electron main', () => {
    const source = readFileSync(CONVERSATION_RUNTIME, 'utf8')

    expect(source).not.toContain('coreConversationRuntime.refreshFromDisk')
    expect(source).not.toContain('coreConversationRuntime.bootIngest')
    expect(source).not.toContain('coreConversationRuntime.waitForConversationRefreshes')
    expect(source).not.toContain('coreConversationRuntime.requestConversationRefreshStop')
    expect(source).not.toContain('coreConversationRuntime.resumeConversationRefreshes')
  })

  test('keeps the bounded menu-bar snapshot in the conversation utility process', () => {
    const host = readFileSync(REFRESH_HOST, 'utf8')
    const worker = readFileSync(REFRESH_WORKER, 'utf8')
    const main = readFileSync(MAIN_INDEX, 'utf8')
    const menuBar = readFileSync(NATIVE_MENU_BAR, 'utf8')

    expect(main).toContain(': loadMenuBarConversationProjectionViaWorker')
    expect(main).toContain('loadConversationProjection: loadNativeMenuBarConversationProjection')
    expect(main).not.toContain(
      'loadConversationProjection: () => conversationRuntime.loadMenuBarConversationProjection()'
    )
    expect(host).toContain('utilityProcess.fork')
    expect(host).toContain("type: 'menu-bar-snapshot'")
    expect(worker).toContain('loadMenuBarConversationProjection(')
    expect(menuBar).not.toContain("from 'better-sqlite3'")
    expect(menuBar).not.toContain('getStorage()')
  })
})
