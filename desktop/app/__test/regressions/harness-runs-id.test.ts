import { describe, expect, it } from 'vitest'

import { HARNESS_RUNS_ID, isHarnessRunsPath } from '../../src/main/blume-home'

// The marker id is a unique token: its presence ANYWHERE in a path is enough to
// identify a Blume self-run, so ingest skips it — no `.blume` ancestor required.
describe('harness-run id identifies a harness-run path', () => {
  it('identifies any path containing the id', () => {
    expect(isHarnessRunsPath(`/Users/x/.blume/harnessruns${HARNESS_RUNS_ID}`)).toBe(true)
    expect(
      isHarnessRunsPath(`/Users/x/anywhere/harnessruns${HARNESS_RUNS_ID}/sub/file.jsonl`)
    ).toBe(true)
    expect(isHarnessRunsPath(`/some/relocated/root/${HARNESS_RUNS_ID}`)).toBe(true)
  })

  it('does not identify a path without the id', () => {
    expect(isHarnessRunsPath('/Users/x/sidecar-prototype')).toBe(false)
  })
})
