const { app, BrowserWindow, nativeImage } = require('electron')
const { mkdirSync, writeFileSync } = require('node:fs')
const { resolve } = require('node:path')

const desktopRoot = resolve(__dirname, '..')
const flowerAssets = {
  bluebell: resolve(
    desktopRoot,
    '../../packages/sidecar/ui/src/assets/flower-icons/purple-bluebell.png'
  ),
  forgetmenot: resolve(
    desktopRoot,
    '../../packages/sidecar/ui/src/assets/flower-icons/blue-forgetmenot.png'
  ),
  tulip: resolve(desktopRoot, '../../packages/sidecar/ui/src/assets/flower-icons/red-tulip.png'),
  sunflower: resolve(
    desktopRoot,
    '../../packages/sidecar/ui/src/assets/flower-icons/yellow-sunflower.png'
  ),
  lantana: resolve(
    desktopRoot,
    '../../packages/sidecar/ui/src/assets/flower-icons/orange-lantana.png'
  ),
  daylily: resolve(
    desktopRoot,
    '../../packages/sidecar/ui/src/assets/flower-icons/orange-daylily.png'
  )
}

const variants = ['stable', 'dev', 'canary']
// Dock icons per flower, and the window icon per channel (the bluebell).
const dockRoot = resolve(desktopRoot, 'resources/dock-icons')
const windowIconRoot = resolve(desktopRoot, 'resources')

function badgeSvg(variant) {
  if (variant === 'stable') return ''
  // A soft ribbon across the bottom of the tile names the channel.
  const ribbonFill = variant === 'dev' ? '#c9b9ee' : '#f3c397'
  const ribbonText = variant === 'dev' ? '#51406e' : '#72471f'
  return [
    '<g clip-path="url(#dock-tile-clip)">',
    `<rect x="48" y="384" width="416" height="80" fill="${ribbonFill}"/>`,
    `<text x="256" y="442" fill="${ribbonText}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="48" font-weight="700" text-anchor="middle" letter-spacing="3">${variant === 'dev' ? 'DEV' : 'CANARY'}</text>`,
    '</g>'
  ].join('')
}

function dockIconSvg(flowerDataUrl, variant) {
  // Channel builds shrink the flower so it clears the bottom ribbon.
  const flowerSize = variant === 'stable' ? 312 : 244
  const flowerInset = (512 - flowerSize) / 2
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">',
    '<defs>',
    '<linearGradient id="dock-tile-fill" x1="0" y1="0" x2="0" y2="1">',
    '<stop offset="0" stop-color="#fef8e7"/>',
    '<stop offset="1" stop-color="#f6efd6"/>',
    '</linearGradient>',
    '<clipPath id="dock-tile-clip"><rect x="48" y="48" width="416" height="416" rx="82"/></clipPath>',
    '</defs>',
    '<rect x="48.5" y="48.5" width="415" height="415" rx="81.5" fill="url(#dock-tile-fill)" stroke="#4b4a43" stroke-width="1"/>',
    badgeSvg(variant),
    `<image href="${flowerDataUrl}" x="${flowerInset}" y="${flowerInset}" width="${flowerSize}" height="${flowerSize}"/>`,
    '</svg>'
  ].join('')
}

async function generateDockIcons() {
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
  await app.whenReady()

  const renderer = new BrowserWindow({
    show: true,
    x: -10_000,
    y: -10_000,
    width: 512,
    height: 512,
    frame: false,
    transparent: true,
    opacity: 0,
    focusable: false,
    skipTaskbar: true,
    webPreferences: {
      backgroundThrottling: false
    }
  })

  try {
    for (const variant of variants) {
      const outputDir = resolve(dockRoot, variant)
      mkdirSync(outputDir, { recursive: true })

      for (const [flower, assetPath] of Object.entries(flowerAssets)) {
        const source = nativeImage.createFromPath(assetPath)
        if (source.isEmpty()) throw new Error(`Flower source is empty: ${assetPath}`)

        const svg = dockIconSvg(source.toDataURL(), variant)
        await renderer.loadURL(`data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`)
        await renderer.webContents.executeJavaScript(
          'Promise.all([document.fonts.ready, new Promise(requestAnimationFrame), new Promise(requestAnimationFrame)])'
        )
        const capture = await renderer.webContents.capturePage()
        if (capture.isEmpty()) throw new Error(`Rendered icon is empty: ${variant}/${flower}`)
        const icon = capture.resize({ width: 512, height: 512, quality: 'best' })
        const png = icon.toPNG({ scaleFactor: 1 })
        if (png.length === 0) throw new Error(`Encoded icon is empty: ${variant}/${flower}`)
        const outputs = [resolve(outputDir, `${flower}.png`)]
        // The window icon for dev and canary is the bluebell tile; stable keeps its packaged icon.
        if (flower === 'bluebell' && variant !== 'stable') outputs.push(resolve(windowIconRoot, `icon-${variant}.png`))
        for (const outputPath of outputs) {
          writeFileSync(outputPath, png)
          console.log(outputPath)
        }
      }
    }
  } finally {
    renderer.destroy()
    app.quit()
  }
}

void generateDockIcons().catch((error) => {
  console.error(error)
  app.exit(1)
})
