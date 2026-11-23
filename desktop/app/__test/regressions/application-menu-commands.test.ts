import { describe, expect, test } from 'vitest'
import { goMenuItems, menuAccelerator, sanitizeMenuCommands } from '../../src/main/nativeAppBootstrap'

describe('application menu commands', () => {
  test('the menu shows the same keys the app handles', () => {
    expect(menuAccelerator('Mod+1')).toBe('CmdOrCtrl+1')
    expect(menuAccelerator('Mod+Shift+F')).toBe('CmdOrCtrl+Shift+F')
    expect(menuAccelerator('Mod+[')).toBe('CmdOrCtrl+[')
    expect(menuAccelerator('Mod+,')).toBe('CmdOrCtrl+,')
    expect(menuAccelerator(undefined)).toBeUndefined()
    expect(menuAccelerator('Mod+<script>')).toBeUndefined()
  })

  test('a menu key press never runs the command; only a click does, so the app keeps its key rules', () => {
    const ran: string[] = []
    const [item] = goMenuItems([{ id: 'go./deliveries', label: 'Go to Deliveries', keys: 'Mod+1' }], (id) => ran.push(id))
    const click = (triggeredByAccelerator: boolean) =>
      item!.click!(item as never, undefined, { triggeredByAccelerator } as Electron.KeyboardEvent)
    click(true)
    expect(ran).toEqual([])
    click(false)
    expect(ran).toEqual(['go./deliveries'])
    expect(item).toMatchObject({ accelerator: 'CmdOrCtrl+1', registerAccelerator: false })
  })

  test('commands from the renderer are bounded and plain before they reach the menu', () => {
    expect(
      sanitizeMenuCommands([
        { id: 'go./deliveries', label: 'Go to Deliveries', keys: 'Mod+1', group: 'Go to' },
        { id: '', label: 'no id' },
        { id: 'x', label: 'y'.repeat(200) },
        'not an object',
        { id: 'page.find', label: 'Find on this page', keys: 42 }
      ])
    ).toEqual([
      { id: 'go./deliveries', label: 'Go to Deliveries', keys: 'Mod+1', group: 'Go to' },
      { id: 'page.find', label: 'Find on this page', keys: undefined, group: undefined }
    ])
    expect(sanitizeMenuCommands('nope')).toEqual([])
    expect(
      sanitizeMenuCommands(Array.from({ length: 100 }, (_, n) => ({ id: `c${n}`, label: 'C' })))
    ).toHaveLength(60)
  })
})
