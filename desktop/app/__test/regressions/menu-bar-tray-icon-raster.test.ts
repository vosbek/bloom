import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync
} from 'fs'
import { createRequire } from 'module'
import { tmpdir } from 'os'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
import {
  createMenuBarTrayIconRenderPayload,
  createMenuBarTrayIconSvg,
  TRAY_FLOWER_SIZE,
  TRAY_IMAGE_HEIGHT,
  TRAY_IMAGE_SCALE,
  TRAY_STATUS_BADGE_HEIGHT
} from '@blume/app-core'
import { describe, expect, test } from 'vitest'
import { createTrayRasterFontOptions } from '../../src/main/menuBarTrayFont'

/**
 * The tray icon is rasterized by resvg rather than by Chromium, and resvg drops
 * or mis-sizes anything it cannot resolve without ever raising an error: `<text>`
 * with no font database behind it, the CSS `font:` shorthand, and artwork masked
 * by luminance when the artwork is not the colour the mask assumes. Those gaps
 * shipped in v1.0.62 as blank status badges and empty usage rings, so these
 * tests rasterize the real artwork with the real assets and assert the ink
 * actually lands on the canvas.
 */

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '../../../..')
const fontFile = join(repositoryRoot, 'apps/desktop/resources/fonts/IBMPlexMono-Bold.ttf')
const flowerFile = join(
  repositoryRoot,
  'packages/sidecar/ui/src/assets/flower-icons/blue-forgetmenot.png'
)
const harnessIconFile = join(
  repositoryRoot,
  'apps/desktop/src/renderer/src/assets/harness/claude.svg'
)

function dataUrl(path: string, mimeType: string): string {
  return `data:${mimeType};base64,${readFileSync(path).toString('base64')}`
}

function trayIconSvg(): string {
  return createMenuBarTrayIconSvg(
    createMenuBarTrayIconRenderPayload({
      counts: { running: 2, waiting: 0, finished: 3 },
      colored: false,
      statusIndicatorsFilled: false,
      animationFrame: 0,
      flowerDataUrl: dataUrl(flowerFile, 'image/png'),
      usageIndicators: [{ provider: 'claude', remainingPercent: 62 }],
      harnessIconDataUrls: { claude: dataUrl(harnessIconFile, 'image/svg+xml') }
    })
  )
}

async function rasterize(
  svg: string,
  rasterFontFile = fontFile
): Promise<{ pixels: Buffer; width: number; height: number }> {
  const { renderAsync } = await import('@resvg/resvg-js')
  const rendered = await renderAsync(svg, {
    fitTo: { mode: 'zoom', value: TRAY_IMAGE_SCALE },
    font: createTrayRasterFontOptions([rasterFontFile]),
    logLevel: 'off'
  })
  return { pixels: rendered.pixels, width: rendered.width, height: rendered.height }
}

/** Count of pixels carrying any ink at all. */
function opaquePixelCount(pixels: Buffer): number {
  let count = 0
  for (let offset = 3; offset < pixels.length; offset += 4) if (pixels[offset]! > 0) count++
  return count
}

/** Height of the inked rows of a raster, in device pixels. */
function inkHeight(raster: { pixels: Buffer; width: number; height: number }): number {
  let top = -1
  let bottom = -1
  for (let y = 0; y < raster.height; y++) {
    for (let x = 0; x < raster.width; x++) {
      if (raster.pixels[(y * raster.width + x) * 4 + 3]! === 0) continue
      if (top < 0) top = y
      bottom = y
      break
    }
  }
  return top < 0 ? 0 : bottom - top + 1
}

/** Highest alpha found in a horizontal band of the canvas, in device pixels. */
function peakAlphaInColumns(
  raster: { pixels: Buffer; width: number; height: number },
  startX: number,
  endX: number
): number {
  let peak = 0
  for (let y = 0; y < raster.height; y++) {
    for (let x = startX; x < Math.min(endX, raster.width); x++) {
      const alpha = raster.pixels[(y * raster.width + x) * 4 + 3]!
      if (alpha > peak) peak = alpha
    }
  }
  return peak
}

describe('menu bar tray icon rasterization', () => {
  // Runs a real electron-vite build, which can exceed vitest's 5 s default on CI runners.
  test('the built font import renders counts from the unpacked app resources', { timeout: 60_000 }, async () => {
    const { build } = await import('electron-vite')
    const desktopRoot = join(repositoryRoot, 'apps/desktop')
    const entry = readFileSync(join(desktopRoot, 'src/main/index.ts'), 'utf8')
    const fontImport = entry.match(/import trayBadgeFont from '([^']+)'/)
    expect(fontImport).not.toBeNull()
    const temporaryRoot = realpathSync(mkdtempSync(join(tmpdir(), 'blume-tray-font-')))
    try {
      // Exercise electron-vite's real asset transform, preserving the production
      // import query. Only the unpacked path contains a native-readable font.
      const projectRoot = join(temporaryRoot, 'project')
      const fixtureFont = join(projectRoot, 'resources/fonts/IBMPlexMono-Bold.ttf')
      mkdirSync(dirname(fixtureFont), { recursive: true })
      copyFileSync(fontFile, fixtureFont)
      const fixture = join(temporaryRoot, 'entry.mjs')
      writeFileSync(
        fixture,
        `export { default } from ${JSON.stringify(resolve(projectRoot, 'src/main', fontImport![1]!))}`
      )
      const outDir = join(projectRoot, 'out/main')
      const configFile = join(temporaryRoot, 'electron.vite.config.mjs')
      writeFileSync(
        configFile,
        `export default ${JSON.stringify({
          main: {
            root: desktopRoot,
            publicDir: join(projectRoot, 'resources'),
            build: {
              outDir,
              rollupOptions: {
                input: fixture,
                output: { format: 'cjs', entryFileNames: 'index.cjs' }
              }
            }
          }
        })}`
      )
      await build({ configFile, logLevel: 'silent', ignoreConfigWarning: true })
      const unpackedFont = join(
        temporaryRoot,
        'app.asar.unpacked/resources/fonts/IBMPlexMono-Bold.ttf'
      )
      mkdirSync(dirname(unpackedFont), { recursive: true })
      copyFileSync(fontFile, unpackedFont)
      const packagedEntry = join(temporaryRoot, 'app.asar/out/main/index.cjs')
      mkdirSync(dirname(packagedEntry), { recursive: true })
      copyFileSync(join(outDir, 'index.cjs'), packagedEntry)
      const builtFont = createRequire(import.meta.url)(packagedEntry) as string
      const svg = trayIconSvg()
      const withText = await rasterize(svg, builtFont)
      const withoutText = await rasterize(svg.replace(/<text[\s\S]*?<\/text>/g, ''), builtFont)

      expect(withText.pixels.equals(withoutText.pixels)).toBe(false)
      expect(builtFont).toBe(unpackedFont)
      expect(createTrayRasterFontOptions([builtFont]).loadSystemFonts).toBe(false)
    } finally {
      rmSync(temporaryRoot, { recursive: true, force: true })
    }
  })

  test('renders the status badge counts', async () => {
    const svg = trayIconSvg()
    const withText = await rasterize(svg)
    const withoutText = await rasterize(svg.replace(/<text[\s\S]*?<\/text>/g, ''))

    // Without a font database resvg drops the badge labels and both renders come
    // out identical, which is exactly how the counts went missing.
    expect(opaquePixelCount(withText.pixels)).not.toBe(opaquePixelCount(withoutText.pixels))
  })

  test('renders the harness glyph inside the usage ring', async () => {
    const svg = trayIconSvg()
    const withGlyph = await rasterize(svg)
    const withoutGlyph = await rasterize(
      svg.replace(
        /<mask id="menu-bar-usage-glyph-0"[\s\S]*?<\/mask>/,
        '<mask id="menu-bar-usage-glyph-0"/>'
      )
    )

    expect(opaquePixelCount(withGlyph.pixels)).toBeGreaterThan(
      opaquePixelCount(withoutGlyph.pixels)
    )
  })

  test('sizes the badge counts to fit inside the badge', async () => {
    // resvg ignores the CSS `font:` shorthand and falls back to its own default
    // size, which overflows the badge. Render the badge label on its own so the
    // surrounding artwork does not contribute ink to the measurement.
    const label = trayIconSvg().match(/<text[\s\S]*?<\/text>/)
    expect(label).not.toBeNull()
    const raster = await rasterize(
      `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="${TRAY_IMAGE_HEIGHT}" viewBox="0 0 60 ${TRAY_IMAGE_HEIGHT}">${label![0]}</svg>`
    )

    expect(inkHeight(raster)).toBeGreaterThan(0)
    expect(inkHeight(raster)).toBeLessThanOrEqual(TRAY_STATUS_BADGE_HEIGHT * TRAY_IMAGE_SCALE)
  })

  test('paints the flower as a solid silhouette rather than a luminance fade', async () => {
    const raster = await rasterize(trayIconSvg())

    // The flower is a pale full-colour PNG recoloured through a mask. Keyed off
    // luminance its lightest petals only reach partial alpha; keyed off the
    // alpha channel the tray ink lands at full strength.
    expect(peakAlphaInColumns(raster, 0, TRAY_FLOWER_SIZE * TRAY_IMAGE_SCALE)).toBe(255)
  })
})
