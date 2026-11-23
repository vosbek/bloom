import { describe, expect, test, vi } from 'vitest'

import {
  createDevMockSuggestionService,
  isDevMockSuggestionEvidenceJson,
  parseDevMockSuggestionInput
} from '@blume/app-core'
import { createHash } from 'node:crypto'
import { basename, join } from 'node:path'

describe('dev mock suggestions', () => {
  test('parses and bounds renderer input', () => {
    expect(
      parseDevMockSuggestionInput({
        title: '  Mock title  ',
        summary: '  Mock summary  ',
        action: 'update'
      })
    ).toEqual({
      title: 'Mock title',
      summary: 'Mock summary',
      action: 'update'
    })
    expect(() =>
      parseDevMockSuggestionInput({ title: 'Mock', summary: 'Summary', action: 'execute' })
    ).toThrow('Invalid mock suggestion action')
    expect(() =>
      parseDevMockSuggestionInput({ title: ' ', summary: 'Summary', action: 'create' })
    ).toThrow('Title is required')
  })

  test.each(['create', 'update', 'remove'] as const)(
    'seeds a real %s suggestion against only the isolated passive fixture',
    async (action) => {
      const writeTextFile = vi.fn(async () => undefined)
      const ensureDir = vi.fn(async () => undefined)
      const notifyChanged = vi.fn()
      let insertedSuggestion: Record<string, unknown> | undefined
      const service = createDevMockSuggestionService({
        getRootDir: () => '/tmp/blume-dev-root',
        getStore: () => ({
          async createSignalCluster(input) {
            expect(input.status).toBe('promoted')
            expect(input.tagsJson).toBe('["dev-mock"]')
            return { id: 17 } as never
          },
          async insertSuggestion(input) {
            insertedSuggestion = input
            return { id: 29 } as never
          }
        }),
        ensureDir,
        writeTextFile,
        joinPath: join,
        basename,
        hashText: (content) => createHash('sha256').update(content, 'utf8').digest('hex'),
        createId: () => 'fixed-id',
        now: () => 1234,
        notifyChanged
      })

      const result = await service.create({
        title: 'Exercise Improve',
        summary: 'Harmless lifecycle fixture.',
        action
      })

      expect(result).toEqual({
        suggestionId: 29,
        targetPath: '/tmp/blume-dev-root/dev-mock-suggestions/mock-1234-fixed-id.md',
        action
      })
      expect(ensureDir).toHaveBeenCalledWith('/tmp/blume-dev-root/dev-mock-suggestions')
      expect(writeTextFile).toHaveBeenCalledTimes(action === 'create' ? 0 : 1)
      expect(notifyChanged).toHaveBeenCalledOnce()
      expect(insertedSuggestion?.clusterId).toBe(17)
      expect(insertedSuggestion?.status).toBe('active')
      expect(isDevMockSuggestionEvidenceJson(String(insertedSuggestion?.evidenceJson))).toBe(true)

      const operations = JSON.parse(String(insertedSuggestion?.operationsJson)) as Array<
        Record<string, unknown>
      >
      expect(operations).toHaveLength(1)
      expect(operations[0]).toMatchObject({
        action,
        artifactType: 'doc',
        artifactScope: 'global',
        harnessApplicability: 'shared',
        targetPath: result.targetPath
      })
      expect(String(operations[0].patchPreview)).toContain(
        'diff --git a/dev-mock-suggestions/mock-1234-fixed-id.md'
      )
      expect(String(operations[0].patchPreview)).toContain(
        action === 'create'
          ? '@@ -0,0 +1,7 @@'
          : action === 'update'
            ? '@@ -1,7 +1,7 @@'
            : '@@ -1,7 +0,0 @@'
      )
      expect(String(operations[0].patchPreview)).not.toMatch(/\n[+-]$/)
      expect(String(operations[0].targetPath)).not.toMatch(
        /(?:AGENTS\.md|CLAUDE\.md|settings\.json|SKILL\.md)/
      )
      if (action === 'create') {
        expect(operations[0].baseHash).toBeNull()
      } else {
        expect(operations[0].baseHash).toMatch(/^[a-f0-9]{64}$/)
      }
      if (action === 'remove') {
        expect(operations[0]).not.toHaveProperty('newContent')
      } else {
        expect(String(operations[0].newContent)).toContain('State: after')
      }
    }
  )

  test('recognizes only the explicit dev marker for feedback suppression', () => {
    expect(isDevMockSuggestionEvidenceJson('[]')).toBe(false)
    expect(isDevMockSuggestionEvidenceJson('not json')).toBe(false)
    expect(
      isDevMockSuggestionEvidenceJson(
        JSON.stringify([{ source: 'blume-dev-mock', excerpt: 'fixture' }])
      )
    ).toBe(true)
  })
})
