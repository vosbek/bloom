import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const PARSER_BINDING = resolve(HERE, '../../src/main/conversations/parserBinding.ts')

describe('desktop parser binding worker policy', () => {
  test('does not fall back to synchronous parser subprocess work on Electron main', () => {
    const source = readFileSync(PARSER_BINDING, 'utf8')

    expect(source).not.toContain('createSubprocessBinding')
    expect(source).not.toContain('spawnSync')
  })
})
