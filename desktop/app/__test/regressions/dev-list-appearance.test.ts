import { readFile } from 'node:fs/promises'
import { describe, expect, test } from 'vitest'

const devViewUrl = new URL('../../src/renderer/src/DevView.tsx', import.meta.url)
const processesUrl = new URL(
  '../../src/renderer/src/components/dev/BlumeProcesses.tsx',
  import.meta.url
)
const conceptsUrl = new URL(
  '../../src/renderer/src/components/dev/ConceptsPage.tsx',
  import.meta.url
)
const performanceUrl = new URL('../../src/renderer/src/components/DevPanel.tsx', import.meta.url)
const featureFlagsUrl = new URL(
  '../../src/renderer/src/components/dev/PosthogFeatureFlagsPage.tsx',
  import.meta.url
)

describe('developer list appearance', () => {
  test('the dev menu uses settings tabs and grouped settings rows', async () => {
    const source = await readFile(devViewUrl, 'utf8')

    expect(source).not.toMatch(/ListAppearanceProvider/)
    expect(source).toMatch(/<SettingsTabs[\s\S]*?value=\{currentTab\}/)
    expect(source).toMatch(/<SettingsTabsTrigger value="product"/)
    expect(source).toMatch(/<SettingsTabsTrigger value="ui-lab"/)
    expect(source).toMatch(/<SettingsTabsTrigger value="diagnostics"/)
    expect(source).toMatch(/function DevMenuRow/)
    expect(source).toMatch(/function DevMenuRow[\s\S]*?<SettingsNavRow/)
    expect(source).toMatch(/function DevToggleRow[\s\S]*?<SettingsToggleRow/)
    expect(source).toMatch(/function DevMenuSection[\s\S]*?<SettingsSection[\s\S]*?<SettingsGroup>/)
    expect(source).toMatch(/<DevMenuSection label="Preview flows" count=\{1\}>/)
    expect(source).toMatch(/concept="feedback"[\s\S]*?title="Monday Wrapped delivery"/)
    expect(source).toMatch(/activePage === 'posthog-menu'/)
    expect(source).toMatch(/function PosthogMenu/)

    const menuSource = source.slice(
      source.indexOf('function DevMenu('),
      source.indexOf('function DevTerminalPage(')
    )
    expect(menuSource).not.toMatch(/Reset first-run answers/)
  })

  test('the format tree keeps the shared stateless list appearance', async () => {
    const source = await readFile(devViewUrl, 'utf8')

    expect(source).toMatch(/function FormatNodeRow/)
    expect(source).toMatch(/concept=\{isDirectory \? 'setup' : 'documentation'\}/)
    expect(source).toMatch(/icon=\{isDirectory \? FolderOpen : FileText\}/)
  })

  test('feature flags are compact settings disclosures with controls inside', async () => {
    const source = await readFile(featureFlagsUrl, 'utf8')

    expect(source).toMatch(/POSTHOG_FEATURE_FLAGS\.map/)
    expect(source).toMatch(/<SettingsDisclosureRow/)
    expect(source).toMatch(/title=\{flag\.label\}/)
    expect(source).toMatch(/rolloutSummary\(evaluation, flag\.rolloutPercentage\)/)
    expect(source).toMatch(/<SettingsSelectRow[\s\S]*?title="Local behavior"/)
    expect(source).not.toMatch(/<article/)
  })

  test('process and concept trees use configurable list surfaces and semantic concepts', async () => {
    const [processes, concepts, performance] = await Promise.all([
      readFile(processesUrl, 'utf8'),
      readFile(conceptsUrl, 'utf8'),
      readFile(performanceUrl, 'utf8')
    ])

    expect(processes).toMatch(/<ConfigurableList[\s\S]*?role="tree"/)
    expect(processes).toMatch(/aria-label="Current Blume process hierarchy"/)
    expect(processes).toMatch(/aria-label="Recently finished Blume process hierarchy"/)
    expect(processes).toMatch(/<ConfigurableListRow/)
    expect(processes).toMatch(/concept="workflow" icon=\{Layers\}/)
    expect(processes).toMatch(/concept="activity"[\s\S]*?runtimeRoleIconComponent/)
    expect(processes).toMatch(/concept=\{processTypeConcept\(process\.type\)\}/)

    expect(concepts).toMatch(/<ConfigurableList[\s\S]*?appearance=\{\{ colorMode: 'concept' \}\}/)
    expect(concepts).toMatch(/<ConfigurableListRow/)
    expect(concepts).toMatch(/<ConfigurableListIcon concept=\{conceptId\} scale="medium" \/>/)

    expect(performance).toMatch(
      /<ConfigurableList className="rounded-lg bg-transparent shadow-none">/
    )
    expect(performance).toMatch(/<ConfigurableListRow/)
    expect(performance).toMatch(/concept="activity" icon=\{Cpu\}/)
  })
})
