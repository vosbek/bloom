import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'vitest'
import { createNativeStartupEvents } from '../../src/main/nativeStartupEvents'

test('buffers native callbacks until runtime handlers attach, then delivers each exactly once', () => {
  const events = createNativeStartupEvents()
  const received: string[] = []
  let prevented = 0
  events.receiveOpenUrl(
    {
      preventDefault: () => {
        prevented += 1
      }
    },
    'codes.blume://callback/early'
  )
  const argv = ['Blume', 'codes.blume://callback/second']
  events.receiveSecondInstance({}, argv)
  argv[1] = 'mutated'
  events.onOpenUrl((_event, url) => received.push(`account:${url}`))
  events.onOpenUrl((_event, url) => received.push(`route:${url}`))
  events.onSecondInstance((_event, args) => received.push(args[1]))
  assert.deepEqual(received, [])
  events.activate()
  events.activate()
  assert.deepEqual(received, [
    'account:codes.blume://callback/early',
    'route:codes.blume://callback/early',
    'codes.blume://callback/second'
  ])
  events.receiveOpenUrl(
    {
      preventDefault: () => {
        prevented += 1
      }
    },
    'codes.blume://callback/live'
  )
  assert.equal(received.length, 5)
  assert.equal(prevented, 2)
})

test('pending native event count and payload are bounded and discarded on startup failure', () => {
  let dropped = 0
  const events = createNativeStartupEvents(() => {
    dropped += 1
  })
  const received: string[] = []
  for (let n = 0; n < 40; n += 1) {
    events.receiveOpenUrl({ preventDefault() {} }, String(n))
  }
  events.receiveOpenUrl({ preventDefault() {} }, 'x'.repeat(16_385))
  events.receiveSecondInstance({}, Array(65).fill('arg'))
  events.receiveSecondInstance({}, ['x'.repeat(16_385)])
  events.onOpenUrl((_event, url) => received.push(url))
  events.activate()
  assert.equal(received.length, 32)
  assert.equal(received[0], '8')
  assert.equal(dropped, 11)
  events.dispose()
  events.receiveOpenUrl({ preventDefault() {} }, 'after-disposal')
  assert.equal(received.length, 32)
  const failed = createNativeStartupEvents()
  failed.receiveOpenUrl({ preventDefault() {} }, 'secret')
  failed.onOpenUrl(() => assert.fail('failed startup must discard callbacks'))
  failed.dispose()
  failed.activate()
})

test('browsing activities ignore unrelated/missing data and share the bounded startup queue', () => {
  let overflow = 0
  let prevented = 0
  const events = createNativeStartupEvents(() => overflow++)
  const event = {
    preventDefault() {
      prevented++
    }
  }
  const received: string[] = []
  events.onOpenUrl((_event, url) => received.push(url))
  events.receiveContinueActivity(event, 'other.activity', {}, { webpageURL: 'ignored' })
  events.receiveContinueActivity(event, 'NSUserActivityTypeBrowsingWeb', {}, {})
  events.receiveContinueActivity(event, 'NSUserActivityTypeBrowsingWeb', null, {
    webpageURL: 'x'.repeat(16_385)
  })
  for (let n = 0; n < 33; n++) {
    events.receiveContinueActivity(event, 'NSUserActivityTypeBrowsingWeb', null, {
      webpageURL: `url-${n}`
    })
  }
  events.activate()
  assert.equal(overflow, 2)
  assert.equal(prevented, 34)
  assert.equal(received.length, 32)
  assert.equal(received[0], 'url-1')
  events.dispose()
  events.receiveContinueActivity(
    event,
    'NSUserActivityTypeBrowsingWeb',
    {},
    { webpageURL: 'after-disposal' }
  )
  assert.equal(received.length, 32)
})

test('identity and lock precede manifest IO while endpoint consumers stay behind configuration', () => {
  const read = (name: string) =>
    readFileSync(new URL(`../../src/main/${name}`, import.meta.url), 'utf8')
  const bootstrap = read('backendManifestBootstrap.ts')
  const native = read('nativeStartup.ts')
  const main = read('index.ts')
  const userDataPosition = native.search(/app\.setPath\(\s*'userData'/)
  assert.ok(userDataPosition >= 0)
  assert.ok(userDataPosition < native.indexOf('app.requestSingleInstanceLock()'))
  assert.match(native, /ELECTRON_USER_DATA_DIR \?\? getCanaryUserDataDir\(\)/)
  assert.match(native, /isDev: is.dev,[\s\S]*?forceSingleInstanceLock: isE2e &&/)
  assert.ok(
    bootstrap.indexOf("from './nativeStartup'") <
      bootstrap.indexOf('async function configureStableBackends')
  )
  assert.match(bootstrap, /if \(!mayStartNativeRuntime\)[\s\S]*?app.exit\(0\)[\s\S]*?else/)
  assert.match(
    bootstrap,
    /configureStableBackends\(\)[\s\S]*?then\(\(\) => import\('\.\/index'\)\)[\s\S]*?nativeStartupEvents.activate\(\)/
  )
  assert.doesNotMatch(
    main,
    /app\.requestSingleInstanceLock|app\.on\('(?:open-url|second-instance)'/
  )
  assert.match(main, /onOpenUrl: nativeStartupEvents.onOpenUrl/)
  assert.match(
    native,
    /app\.on\('continue-activity', nativeStartupEvents.receiveContinueActivity\)/
  )
})
