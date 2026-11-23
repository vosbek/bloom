import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { EventEmitter } from 'node:events'
import { describe, expect, it, vi } from 'vitest'

import {
  ignoreBrokenStdioPipeErrors,
  isExpectedConsoleWriteEpipe
} from '../../src/main/consoleWriteEpipePolicy'

const SRC_MAIN = resolve(__dirname, '../../src/main')

function productionConsoleWriteEpipe(): Error {
  const error = new Error('write EPIPE') as NodeJS.ErrnoException
  error.code = 'EPIPE'
  error.errno = -32
  error.syscall = 'write'
  error.stack = [
    'Error: write EPIPE',
    '    at afterWriteDispatched (node:internal/stream_base_commons:159:15)',
    '    at writeGeneric (node:internal/stream_base_commons:150:3)',
    '    at Socket._writeGeneric (node:net:1026:11)',
    '    at Socket._write (node:net:1038:8)',
    '    at writeOrBuffer (node:internal/streams/writable:570:12)',
    '    at _write (node:internal/streams/writable:499:10)',
    '    at Writable.write (node:internal/streams/writable:508:10)',
    '    at console.value (node:internal/console/constructor:313:16)',
    '    at console.log (node:internal/console/constructor:416:26)',
    '    at console.log ([Path])'
  ].join('\n')
  return error
}

describe('console write EPIPE policy', () => {
  it('treats production console.log write EPIPE as expected non-fatal noise', () => {
    expect(isExpectedConsoleWriteEpipe(productionConsoleWriteEpipe())).toBe(true)
  })

  it('treats message-only write EPIPE with a console stack as expected', () => {
    const error = new Error('write EPIPE')
    error.stack = [
      'Error: write EPIPE',
      '    at Writable.write (node:internal/streams/writable:508:10)',
      '    at console.warn (node:internal/console/constructor:416:26)'
    ].join('\n')

    expect(isExpectedConsoleWriteEpipe(error)).toBe(true)
  })

  it('does not treat errno-code EPIPE with a stream-only write stack as expected', () => {
    // Stream/socket frames alone must not demote — child stdin / IPC EPIPE
    // shares those frames and must stay fatal.
    const error = new Error('broken pipe') as NodeJS.ErrnoException
    error.code = 'EPIPE'
    error.stack = [
      'Error: broken pipe',
      '    at afterWriteDispatched (node:internal/stream_base_commons:159:15)',
      '    at writeGeneric (node:internal/stream_base_commons:150:3)',
      '    at Writable.write (node:internal/streams/writable:508:10)'
    ].join('\n')

    expect(isExpectedConsoleWriteEpipe(error)).toBe(false)
  })

  it('does not treat write EPIPE without a console stack as expected', () => {
    const error = new Error('write EPIPE') as NodeJS.ErrnoException
    error.code = 'EPIPE'
    error.stack = [
      'Error: write EPIPE',
      '    at Object.<anonymous> (/app/main/somethingElse.ts:10:5)'
    ].join('\n')

    expect(isExpectedConsoleWriteEpipe(error)).toBe(false)
  })

  it('does not treat write EPIPE without a stack as expected', () => {
    const error = new Error('write EPIPE') as NodeJS.ErrnoException
    error.code = 'EPIPE'
    error.stack = undefined

    expect(isExpectedConsoleWriteEpipe(error)).toBe(false)
  })

  it('does not swallow unrelated fatals', () => {
    const failures: unknown[] = [
      new Error('Renderer process gone'),
      Object.assign(new Error('ECONNRESET'), { code: 'ECONNRESET' }),
      Object.assign(new Error('read EPIPE'), {
        code: 'EPIPE',
        stack: 'Error: read EPIPE\n    at Socket.read (node:net:1:1)'
      }),
      'write EPIPE',
      null,
      undefined
    ]

    for (const failure of failures) {
      expect(isExpectedConsoleWriteEpipe(failure)).toBe(false)
    }
  })

  it('attaches a no-op error listener on streams that have none', () => {
    const stream = new EventEmitter() as EventEmitter & {
      listenerCount: (event: string) => number
    }
    const onSpy = vi.spyOn(stream, 'on')

    ignoreBrokenStdioPipeErrors([stream as unknown as NodeJS.WritableStream])

    expect(onSpy).toHaveBeenCalledWith('error', expect.any(Function))
    expect(stream.listenerCount('error')).toBe(1)

    // Second call skips when a listener is already present.
    ignoreBrokenStdioPipeErrors([stream as unknown as NodeJS.WritableStream])
    expect(stream.listenerCount('error')).toBe(1)
  })

  it('swallows EPIPE/EIO on stdio error and rethrows other codes', () => {
    const stream = new EventEmitter() as EventEmitter & {
      listenerCount: (event: string) => number
    }
    const warn = vi.fn()

    ignoreBrokenStdioPipeErrors([stream as unknown as NodeJS.WritableStream], { warn })

    expect(() => {
      stream.emit('error', Object.assign(new Error('write EPIPE'), { code: 'EPIPE' }))
    }).not.toThrow()
    expect(() => {
      stream.emit('error', Object.assign(new Error('write EIO'), { code: 'EIO' }))
    }).not.toThrow()
    expect(warn).not.toHaveBeenCalled()

    const unexpected = Object.assign(new Error('write ENOSPC'), { code: 'ENOSPC' })
    expect(() => {
      stream.emit('error', unexpected)
    }).toThrow(unexpected)
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn).toHaveBeenCalledWith(
      'unexpected stdio stream error',
      expect.objectContaining({
        code: 'ENOSPC',
        error_name: 'Error',
        error_message: 'write ENOSPC'
      })
    )
  })

  it('wires the EPIPE guard into nativeLifecycle before fatal exit', () => {
    const lifecycle = readFileSync(resolve(SRC_MAIN, 'nativeLifecycle.ts'), 'utf8')

    expect(lifecycle).toContain('isExpectedConsoleWriteEpipe')
    expect(lifecycle).toContain('ignoreBrokenStdioPipeErrors')
    expect(lifecycle).toMatch(
      /ignoreBrokenStdioPipeErrors\(\[process\.stdout, process\.stderr\], deps\.log\)/
    )
    expect(lifecycle).toContain("reporting_action: 'local_log_only'")
    expect(lifecycle).toContain('ignored expected console write EPIPE')
    expect(lifecycle).toMatch(
      /if \(isExpectedConsoleWriteEpipe\(err\)\) \{[\s\S]*?return[\s\S]*?deps\.log\.fatal/
    )
  })
})
