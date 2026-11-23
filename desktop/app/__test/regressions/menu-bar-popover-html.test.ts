import { describe, expect, test } from 'vitest'
import { createMenuBarPopoverHtml, MENU_BAR_POPOVER_WIDTH } from '../../src/main/menuBarPopoverHtml'

describe('menu bar popover html', () => {
  test('uses one fixed content width and groups provider windows under one icon', () => {
    const html = createMenuBarPopoverHtml({
      dark: true,
      appDisplayName: 'Blume Dev',
      showConversations: true,
      conversations: [
        {
          ref: 'conversation/1',
          title: 'A very long conversation title that should ellipsize within the popover',
          source: 'codex',
          state: 'running',
          statusColor: '#9172f8',
          harnessColor: '#556cdb',
          harnessIconDataUrl: 'data:image/svg+xml;base64,codex'
        },
        {
          ref: 'conversation/2',
          title: 'Waiting',
          source: 'claude',
          state: 'needs-approval',
          statusColor: '#fb923c',
          harnessColor: '#cc7a4a',
          harnessIconDataUrl: null
        },
        {
          ref: 'conversation/3',
          title: 'Finished',
          source: 'codex',
          state: 'finished',
          statusColor: '#5b8fd6',
          harnessColor: '#556cdb',
          harnessIconDataUrl: null
        },
        {
          ref: 'conversation/4',
          title: 'Failed',
          source: 'codex',
          state: 'failed',
          statusColor: '#e25d5d',
          harnessColor: '#556cdb',
          harnessIconDataUrl: null
        }
      ],
      hiddenConversationCount: 2,
      showUsage: true,
      usage: [
        {
          provider: 'claude',
          label: 'Claude',
          harnessColor: '#cc7a4a',
          harnessIconDataUrl: 'data:image/svg+xml;base64,claude',
          windows: [
            {
              id: 'session',
              label: 'Session (5h)',
              remainingPercent: 58,
              resetText: 'resets soon'
            },
            {
              id: 'weekly',
              label: 'Weekly · all models',
              remainingPercent: 36,
              resetText: 'resets in 5d'
            }
          ]
        }
      ]
    })

    expect(html).toContain(`body{width:${MENU_BAR_POPOVER_WIDTH}px`)
    expect(html).toContain('height:100%')
    expect(html).toContain('background:var(--panel);overflow-x:hidden;overflow-y:auto')
    expect(html).toContain('--panel:rgba(50,49,47,.82)')
    expect(html).toContain('@media(prefers-reduced-motion:reduce)')
    expect(html).toContain('.panel{width:100%}')
    expect(html).not.toContain('.panel{width:100%;padding:')
    expect(html).not.toContain('box-shadow:0 10px 28px')
    expect(html).toContain('.conversation{width:100%')
    expect(html).toContain('grid-template-columns:12px minmax(0,1fr) 16px')
    expect(html).toContain('padding:0 7px;font-size:14px')
    expect(html).toContain('.source{width:10px;height:10px')
    expect(html).toContain('.source.harness-letter{font-size:6px}')
    expect(html).toContain('justify-self:end')
    expect(html).toContain('class="status status-spinner"')
    expect(html).toContain('stroke-dasharray="23.28 6.57"')
    expect(html).toContain('@keyframes status-spin')
    expect(html).toContain('class="status status-dot"')
    expect(html).toContain('class="status-ping"')
    expect(html).toContain('M1.5 6 L 4.7 9.3 L 9.4 3')
    expect(html).toContain('M2.85 2.85 L 9.15 9.15')
    expect(html).toContain('.usage-provider{display:block;width:100%')
    expect(html).toContain('.provider-glyph{width:12px;height:12px')
    expect(html).toContain('.harness-letter{font-size:8px')
    expect(html).toContain('grid-template-columns:minmax(0,1fr) 30px')
    expect(html).toContain('grid-template-rows:minmax(15px,auto) 4px')
    expect(html).toContain('.usage-window-label{grid-column:1;grid-row:1')
    expect(html).toContain('white-space:normal;overflow-wrap:anywhere')
    expect(html).toContain('.usage-track{grid-column:1/-1;grid-row:2')
    expect(html).toContain('.usage-window-value{grid-column:2;grid-row:1')
    expect(html).toContain('align-self:end;font-size:11px')
    expect(html).not.toContain('text-overflow:ellipsis}.usage-window-reset')
    expect(html).toContain('class="usage-window-value">58%</span>')
    expect(html).toContain('aria-label="58% remaining · resets soon"')
    expect(html).toContain('-webkit-mask-image:url(&quot;data:image/svg+xml;base64,claude&quot;)')
    expect(html).toContain('-webkit-mask-image:url(&quot;data:image/svg+xml;base64,codex&quot;)')
    expect(html).toContain('class="source" style="background-color:#556cdb;')
    expect(html).not.toContain('class="source" style="background:#556cdb"')
    expect(html).toContain('class="source harness-letter" style="color:#cc7a4a"')
    expect(html).toContain('<div class="more">More…</div>')
    expect(html).not.toContain('2 more…')
    expect(html).not.toContain('class="provider-header"><span class="source"')
    expect(html).toContain('M14 17H5')
    expect(html).toContain('<circle cx="17" cy="17" r="3"/>')
    expect(html).toContain('<circle cx="7" cy="7" r="3"/>')
    expect(html).toContain('.action-icon svg{width:12px;height:12px')
    expect(html).toContain('style="stroke-width:2"')
    expect(html).not.toContain('blume-menu://pin')
    expect(html).not.toContain('M12 17v5')
    expect(html).toContain(
      'href="blume-menu://quit"><span class="action-icon"><svg viewBox="0 0 24 24"'
    )
    expect(html).toContain('M12 2v10')
    expect(html).toContain('M18.36 6.64a9 9 0 1 1-12.72 0')
    expect(html).toContain('<rect x="2" y="3" width="12" height="10" rx="2"/>')
    expect(html).not.toContain('background-image:url("data:image/png;base64,app")')
    expect(html).not.toContain('open-action')
    expect(html).not.toContain('.action:nth-child(3) .action-icon svg{fill:currentColor')
    expect(html.indexOf('Preferences…')).toBeLessThan(html.indexOf('Active Conversations'))
    expect(html).toContain('<kbd>⌘,</kbd>')
    expect(html.match(/blume-menu:\/\/usage\?provider=claude/g)).toHaveLength(1)
    expect(html.match(/data:image\/svg\+xml;base64,claude/g)).toHaveLength(2)
    expect(html.match(/class="provider-glyph"/g)).toHaveLength(1)
    expect(html).toContain('Session (5h)')
    expect(html).toContain('Weekly · all models')
    expect(html).toContain('width:58%')
    expect(html).toContain('width:36%')
  })

  test('starts with its spinners and pings paused until the popover opens', () => {
    const html = createMenuBarPopoverHtml({
      dark: false,
      appDisplayName: 'Blume',
      showConversations: true,
      conversations: [
        {
          ref: 'conversation/1',
          title: 'Running',
          source: 'codex',
          state: 'running',
          statusColor: '#9172f8',
          harnessColor: '#556cdb',
          harnessIconDataUrl: null
        }
      ],
      hiddenConversationCount: 0,
      showUsage: false,
      usage: []
    })
    expect(html).toContain('status-spinner')
    // A hidden popover still paints at the display rate, so a fresh page holds every loop still.
    expect(html).toContain('<body data-motion="paused">')
    expect(html).toContain(
      'body[data-motion=paused] *,body[data-motion=paused] *::before,body[data-motion=paused] *::after{animation-play-state:paused!important}'
    )
  })
})
