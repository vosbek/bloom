import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'vitest'

const appUrl = new URL('../../src/renderer/src/App.tsx', import.meta.url)
const sidecarAppUrl = new URL(
  '../../../../packages/sidecar/ui/src/shell/SidecarApp.tsx',
  import.meta.url
)
const shellUrl = (path) =>
  new URL(`../../../../packages/sidecar/ui/src/shell/${path}`, import.meta.url)
const conversationResourceUrl = new URL(
  '../../../../packages/sidecar/ui/src/host/conversationResource.tsx',
  import.meta.url
)
const setupViewUrl = new URL(
  '../../../../packages/sidecar/ui/src/features/setup/SetupView.tsx',
  import.meta.url
)

test('high-churn conversation state stays outside desktop and shared app shells', async () => {
  const [app, sidecarApp, conversationRoute, conversationResource] = await Promise.all([
    readFile(appUrl, 'utf8'),
    readFile(sidecarAppUrl, 'utf8'),
    readFile(shellUrl('pages/ConversationRoute.tsx'), 'utf8'),
    readFile(conversationResourceUrl, 'utf8')
  ])
  const electronApp = app.slice(app.indexOf('function ElectronApp('))

  assert.doesNotMatch(electronApp, /const \[items, setItems\]/)
  assert.doesNotMatch(electronApp, /api\.onConversationsChanged\(/)
  // Only the route that shows a conversation reads the high-churn cache, never the page switch.
  assert.doesNotMatch(sidecarApp, /useConversationResource\(/)
  assert.match(conversationResource, /function ConversationResourceProvider/)
  assert.match(conversationResource, /useHostResource\(/)
  assert.match(
    conversationRoute,
    /function LiveConversationRoute[\s\S]*?useConversationResource\(\)/
  )
})

test('project invalidations use the identity-preserving live resource boundary', async () => {
  const setupView = await readFile(setupViewUrl, 'utf8')

  assert.doesNotMatch(setupView, /projectRevision/)
  assert.match(setupView, /const projects = useHostResource<ProjectView\[\]>/)
  assert.match(setupView, /host\.projects\.onChanged\(onChanged\)/)
  assert.match(setupView, /isEqual: hostSnapshotsEqual/g)
})
