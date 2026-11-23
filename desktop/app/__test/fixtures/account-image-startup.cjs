const assert = require('node:assert/strict')
const { app, net, protocol } = require('electron')
const { createAuthClient } = require('better-auth/client')
const {
  electronClient,
  registerUserImageScheme,
  normalizeUserOutput
} = require('@better-auth/electron/client')
app.setPath('userData', process.env.ELECTRON_USER_DATA_DIR)

// Real pinned integration and Electron lifecycle, without user credentials.
// Stable waits for backend selection before importing the account client.
if (process.env.BLUME_TEST_LATE_SCHEME !== '1') registerUserImageScheme()
const image = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aY1sAAAAASUVORK5CYII=',
  'base64'
)
const requests = []
app
  .whenReady()
  .then(async () => {
    assert.equal(app.isReady(), true)
    await new Promise((resolve) => setTimeout(resolve, 50))
    const client = createAuthClient({
      baseURL: 'https://selected-backend.example.invalid',
      fetchOptions: {
        customFetchImpl: async (url) => {
          requests.push(String(url))
          return Response.json({
            user: {
              id: 'startup-user',
              image: `data:image/png;base64,${image.toString('base64')}`
            },
            session: {}
          })
        }
      },
      plugins: [
        electronClient({
          protocol: { scheme: 'codes.blume' },
          storage: { getItem: async () => null, setItem: async () => {} }
        })
      ]
    })
    client.setupMain({ bridges: false, csp: false, scheme: false })
    await new Promise((resolve) => setImmediate(resolve))
    assert.equal(await protocol.isProtocolHandled('user-image'), true)
    assert.equal(
      normalizeUserOutput({ id: 'startup-user', image: 'avatar' }).image,
      'user-image://startup-user'
    )
    const result = await net.fetch('user-image://startup-user')
    assert.equal(result.status, 200)
    assert.equal(result.headers.get('content-type'), 'image/png')
    assert.deepEqual(Buffer.from(await result.arrayBuffer()), image)
    assert.ok(requests.length > 0)
    assert.ok(requests.every((url) => url.startsWith('https://selected-backend.example.invalid/')))
    console.log('PASS: delayed stable startup and authenticated avatar proxy')
    app.exit(0)
  })
  .catch((error) => {
    console.error(error)
    app.exit(1)
  })
