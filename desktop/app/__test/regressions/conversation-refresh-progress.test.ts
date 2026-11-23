import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const desktopRoot = join(import.meta.dirname, '../..')

describe('conversation refresh progress wiring', () => {
  it('forwards only successful worker ingest progress to desktop callbacks', async () => {
    const host = await readFile(join(desktopRoot, 'src/main/conversations/refreshHost.ts'), 'utf8')

    expect(host).toContain('if (message.ok) emitRefreshProgress()')
    expect(host).toContain('onConversationIngested?: RefreshProgressCallback')
  })

  it('passes boot progress through before the final first-pass notification', async () => {
    const conversations = await readFile(
      join(desktopRoot, 'src/main/conversations/index.ts'),
      'utf8'
    )

    expect(conversations).toContain(
      'await refreshViaConversationRefreshWorker(CONVERSATION_DAY_MS, options.onFirstPassDone)'
    )
    expect(conversations).toMatch(
      /refreshViaConversationRefreshWorker\(CONVERSATION_DAY_MS, options\.onFirstPassDone\)[\s\S]*options\.onFirstPassDone\?\.\(\)/
    )
  })
})
