import { describe, expect, test, vi } from 'vitest'

/**
 * isUnsafeScanRoot guards against scanning / watching the macOS home folder or
 * any of its ancestors (which hold every harness's global config plus huge
 * unrelated trees). Real projects live *inside* home and must stay scannable.
 */
describe('isUnsafeScanRoot', () => {
  test('blocks the home folder and its ancestors, allows real projects', async () => {
    vi.resetModules()
    vi.doMock('os', async () => {
      const actual = await vi.importActual<typeof import('os')>('os')
      return { ...actual, homedir: () => '/Users/testuser' }
    })

    try {
      const { isUnsafeScanRoot } = await import('../../src/main/setup')

      // Home itself — including non-normalized forms — is too broad to scan.
      expect(isUnsafeScanRoot('/Users/testuser')).toBe(true)
      expect(isUnsafeScanRoot('/Users/testuser/')).toBe(true)
      expect(isUnsafeScanRoot('/Users/testuser/../testuser')).toBe(true)

      // Ancestors of home are even broader.
      expect(isUnsafeScanRoot('/Users')).toBe(true)
      expect(isUnsafeScanRoot('/')).toBe(true)

      // Real repos inside home, sibling homes, and unrelated paths are fine.
      expect(isUnsafeScanRoot('/Users/testuser/code/demo')).toBe(false)
      expect(isUnsafeScanRoot('/Users/testuser/.cursor/skills/x')).toBe(false)
      expect(isUnsafeScanRoot('/Users/otheruser')).toBe(false)
      expect(isUnsafeScanRoot('/tmp/proj')).toBe(false)
    } finally {
      vi.doUnmock('os')
    }
  })

  test('handles Windows drives — blocks home, allows same- and cross-drive projects', async () => {
    vi.resetModules()
    vi.doMock('os', async () => {
      const actual = await vi.importActual<typeof import('os')>('os')
      return { ...actual, homedir: () => 'C:\\Users\\testuser' }
    })
    // Force win32 path semantics so resolve/relative/isAbsolute behave as they
    // would on Windows (drive letters, backslashes, cross-drive relative()).
    vi.doMock('path', async () => {
      const actual = await vi.importActual<typeof import('path')>('path')
      return { ...actual.win32, default: actual.win32 }
    })

    try {
      const { isUnsafeScanRoot } = await import('../../src/main/setup')

      // Home and its ancestors on the home drive are still too broad.
      expect(isUnsafeScanRoot('C:\\Users\\testuser')).toBe(true)
      expect(isUnsafeScanRoot('C:\\Users')).toBe(true)
      expect(isUnsafeScanRoot('C:\\')).toBe(true)

      // A real project on the home drive is fine.
      expect(isUnsafeScanRoot('C:\\Users\\testuser\\code\\demo')).toBe(false)

      // A project on a different drive can't be home or an ancestor of it, so
      // it must stay scannable — even though relative() returns an absolute
      // path across drives.
      expect(isUnsafeScanRoot('D:\\proj')).toBe(false)
      expect(isUnsafeScanRoot('D:\\')).toBe(false)
    } finally {
      vi.doUnmock('path')
      vi.doUnmock('os')
    }
  })
})
