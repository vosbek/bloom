import { readFileSync } from 'node:fs'

import { GLOBAL_SEARCH_CATEGORIES } from '@blume/storage-port'
import { describe, expect, test } from 'vitest'

import {
  createLatestOnlyLineQueue,
  createRaycastSearchLineFramer,
  parseRaycastSearchRequest,
  RAYCAST_SEARCH_MAX_REQUEST_BYTES
} from '../../src/main/raycastSearchProtocol'

describe('Raycast search helper protocol', () => {
  test('keeps the standalone Raycast wire contract aligned with the desktop helper', () => {
    const raycastProtocol = readFileSync(
      new URL('../../../raycast/src/protocol.ts', import.meta.url),
      'utf8'
    )
    expect(raycastProtocol).toContain('RAYCAST_SEARCH_PROTOCOL_VERSION = 1')
    expect(raycastProtocol).toContain('RAYCAST_SEARCH_MAX_REQUEST_BYTES = 8 * 1024')
    for (const category of GLOBAL_SEARCH_CATEGORIES) {
      expect(raycastProtocol).toContain(`"${category}"`)
    }
    for (const field of ['version: 1', 'type: "search"', 'id: number', 'query: string']) {
      expect(raycastProtocol).toContain(field)
    }
    for (const responseType of ['type: "ready"', 'type: "search-result"']) {
      expect(raycastProtocol).toContain(responseType)
    }
  })

  test('accepts bounded shared search requests', () => {
    expect(
      parseRaycastSearchRequest(
        JSON.stringify({
          version: 1,
          type: 'search',
          id: 7,
          query: '  project search  ',
          categories: ['projects', 'messages', 'unknown']
        })
      )
    ).toEqual({
      version: 1,
      type: 'search',
      id: 7,
      query: '  project search  ',
      categories: ['projects', 'messages']
    })
  })

  test('rejects malformed and oversized requests', () => {
    expect(() => parseRaycastSearchRequest('{}')).toThrow(/Invalid Raycast search request/)
    expect(() =>
      parseRaycastSearchRequest(
        JSON.stringify({
          version: 1,
          type: 'search',
          id: 1,
          query: 'x'.repeat(9 * 1024),
          categories: ['projects']
        })
      )
    ).toThrow(/too large/)
  })

  test('bounds raw stdin framing before a complete line is allocated', () => {
    const lines: string[] = []
    let oversized = 0
    const framer = createRaycastSearchLineFramer(
      (line) => lines.push(line),
      () => oversized++
    )
    framer.push(Buffer.alloc(RAYCAST_SEARCH_MAX_REQUEST_BYTES, 120))
    framer.push(Buffer.from('x\nvalid\n'))
    framer.push(Buffer.from('crlf\r\n'))
    framer.push(Buffer.from('tail'))
    framer.end()
    expect(oversized).toBe(1)
    expect(lines).toEqual(['valid', 'crlf', 'tail'])
  })

  test('coalesces a request burst to the newest pending search', async () => {
    const ran: string[] = []
    const superseded: string[] = []
    let releaseFirst: (() => void) | undefined
    const first = new Promise<void>((resolve) => {
      releaseFirst = resolve
    })
    const queue = createLatestOnlyLineQueue(
      async (line) => {
        ran.push(line)
        if (line === 'first') await first
      },
      (line) => superseded.push(line)
    )
    queue.submit('first')
    queue.submit('second')
    queue.submit('latest')
    releaseFirst?.()
    await queue.close()
    expect(ran).toEqual(['first', 'latest'])
    expect(superseded).toEqual(['second'])
  })

  test('continues after a queued search rejects and still closes', async () => {
    const ran: string[] = []
    const failures: string[] = []
    const queue = createLatestOnlyLineQueue(
      async (line) => {
        ran.push(line)
        if (line === 'first') throw new Error('broken search')
      },
      () => undefined,
      (error) => failures.push(error instanceof Error ? error.message : String(error))
    )
    queue.submit('first')
    queue.submit('second')
    await queue.close()
    expect(ran).toEqual(['first', 'second'])
    expect(failures).toEqual(['broken search'])
  })
})
