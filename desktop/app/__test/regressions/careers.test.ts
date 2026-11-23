import { describe, expect, test, vi } from 'vitest'

import { createDesktopCareersFacade } from '../../src/main/careers'

interface CareersHarness {
  handlers: Map<string, (...args: unknown[]) => unknown>
  fetch: ReturnType<typeof vi.fn>
  openExternal: ReturnType<typeof vi.fn>
}

function harness(response: unknown = { openings: [] }): CareersHarness {
  const handlers = new Map<string, (...args: unknown[]) => unknown>()
  const fetch = vi.fn(async () => Response.json(response))
  const openExternal = vi.fn(async () => {})
  createDesktopCareersFacade({ fetch, openExternal }).registerIpcHandlers((channel, listener) => {
    handlers.set(channel, listener)
  })
  return { handlers, fetch, openExternal }
}

describe('desktop careers facade', () => {
  test('loads the sanitized Blume careers feed without following redirects', async () => {
    const opening = {
      id: 'job-1',
      title: 'Founding engineer',
      pitch: 'Build Blume.',
      department: 'Engineering',
      location: 'Oslo',
      remoteStatus: 'hybrid',
      employmentType: 'Full time',
      jobUrl: 'https://jobs.blume.codes/jobs/job-1',
      applyUrl: 'https://jobs.blume.codes/jobs/job-1/apply'
    }
    const { handlers, fetch } = harness({ openings: [opening] })

    await expect(handlers.get('careers:listOpenings')?.({})).resolves.toEqual([opening])
    expect(fetch).toHaveBeenCalledWith(
      'https://blume.codes/api/careers/jobs',
      expect.objectContaining({ redirect: 'error' })
    )
  })

  test('opens only allow-listed Blume and Teamtailor destinations', async () => {
    const { handlers, openExternal } = harness()
    await handlers.get('careers:openOpening')?.({}, 'https://jobs.blume.codes/jobs/job-1')
    expect(openExternal).toHaveBeenCalledWith('https://jobs.blume.codes/jobs/job-1')
    await handlers.get('careers:openOpening')?.({}, 'https://blume-demo.teamtailor.com/jobs/job-1')
    expect(openExternal).toHaveBeenCalledWith('https://blume-demo.teamtailor.com/jobs/job-1')
    expect(() => handlers.get('careers:openOpening')?.({}, 'https://example.com/job')).toThrow(
      'Invalid career destination'
    )
  })
})
