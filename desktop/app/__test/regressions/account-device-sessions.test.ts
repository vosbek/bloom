import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const ACCOUNTS_MAIN = resolve(HERE, '../../src/main/accounts.ts')
const INDEX_MAIN = resolve(HERE, '../../src/main/index.ts')

describe('desktop account device sessions', () => {
  test('keeps Blume as the sole owner of production account callback listeners', () => {
    const source = readFileSync(ACCOUNTS_MAIN, 'utf8')

    expect(source).toMatch(/electronAccountClient\.setupMain\(\{[\s\S]*?scheme:\s*false/)
    expect(source).not.toContain('scheme: !process.defaultApp')
  })

  test('filters expected Code verifier not found failures before captureAppError', () => {
    const indexSource = readFileSync(INDEX_MAIN, 'utf8')

    expect(indexSource).toContain('reportAccountDeepLinkFailure')
    expect(indexSource).toMatch(
      /reportAccountDeepLinkFailure[\s\S]*from '\.\/accountOAuthCallbackFailurePolicy'/
    )
    expect(indexSource).not.toMatch(
      /\.catch\(\(error\) => void captureAppError\('main\.account-deep-link', error\)\)/
    )
  })

  test('dedupes concurrent account callback exchanges before Better Auth authenticate', () => {
    const source = readFileSync(ACCOUNTS_MAIN, 'utf8')

    expect(source).toContain('pendingAccountCallbackExchanges')
    expect(source).toMatch(
      /pendingAccountCallbackExchanges\.get\(token\)[\s\S]*exchangeAccountCallbackToken\(token\)/
    )
  })

  test('routes a cold-start account callback through the token exchange before native routes', () => {
    const accountsSource = readFileSync(ACCOUNTS_MAIN, 'utf8')
    const indexSource = readFileSync(INDEX_MAIN, 'utf8')

    expect(indexSource).toMatch(
      /process\.platform === 'darwin'\s*\?\s*false\s*:\s*await handleAccountDeepLinkFromArgv\(process\.argv\)[\s\S]*if \(!handledAccountLaunchCallback\) nativeDeepLinks\.handleLaunchArgv\(\)/
    )
    expect(accountsSource).toMatch(
      /handleAccountDeepLinkFromArgv[\s\S]*findAccountCallbackUrl\(argv, ACCOUNT_PROTOCOL\)[\s\S]*handleAccountDeepLink\(url\)/
    )
    expect(accountsSource).toMatch(
      /handleAccountDeepLink\(url:[\s\S]*accountCallbackToken\(url, ACCOUNT_PROTOCOL\)[\s\S]*electronAccountClient\.authenticate\(\{\s*token,/
    )
  })

  test('uses the token-free account endpoint instead of Better Auth fresh sessions', () => {
    const source = readFileSync(ACCOUNTS_MAIN, 'utf8')

    expect(source).toContain("authRequest<unknown>('/api/auth/blume/device-sessions')")
    expect(source).toMatch(
      /authRequest\(\s*`\/api\/auth\/blume\/device-sessions\/\$\{encodeURIComponent\(sessionId\)\}`,\s*\{\s*method:\s*'POST'/s
    )
    expect(source).not.toContain('authClient.listSessions()')
    expect(source).not.toContain('deviceSessionTokens')
  })
})
