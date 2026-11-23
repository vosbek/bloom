import { readFile } from 'node:fs/promises'
import { describe, expect, test } from 'vitest'

const devViewUrl = new URL('../../src/renderer/src/DevView.tsx', import.meta.url)
const conceptsPageUrl = new URL(
  '../../src/renderer/src/components/dev/ConceptsPage.tsx',
  import.meta.url
)

describe('developer concept catalog', () => {
  test('is reachable from the desktop Dev menu', async () => {
    const source = await readFile(devViewUrl, 'utf8')

    expect(source).toMatch(/import \{ ConceptsPage \}/)
    expect(source).toMatch(/page === 'concepts'/)
    expect(source).toMatch(/title="Concepts"/)
    expect(source).toMatch(/onOpenConcepts/)
  })

  test('shows the palette, every catalog entry, and real relationship examples', async () => {
    const source = await readFile(conceptsPageUrl, 'utf8')

    expect(source).toMatch(/CONCEPT_IDS\.map/)
    expect(source).toMatch(/COLOR_TOKENS\.map/)
    expect(source).toMatch(/<ConceptIcon/)
    expect(source).toMatch(/Tile sizes/)
    expect(source).toMatch(/surface="neutral"/)
    expect(source).toMatch(/surface="transparent"/)
    expect(source).toMatch(/surface="solid"/)
    expect(source).toMatch(/surface="bare"/)
    expect(source).toMatch(/tileSize=\{tileSize\}/)
    expect(source).toMatch(/<EntityPageRelationEntitiesRow/)
    expect(source).toMatch(/icon: <ProjectAvatar/)
    expect(source).toMatch(/icon: <HarnessTile/)
    expect(source).toMatch(/iconSurface: 'tile'/)
    expect(source).toMatch(/concept: 'project'/)
    expect(source).toMatch(/concept: 'harness'/)
    expect(source).toMatch(/concept: 'worktree'/)
    expect(source).toMatch(/<ProjectSubtitle/)
    expect(source).toMatch(/<ConceptLabel/)
  })
})
