import { describe, expect, test } from 'vitest'

import { mergeConversationPersistenceState } from '@blume/conversations-model'

describe('conversation persistence policy', () => {
  test('preserves owned titles and current manual state overrides', () => {
    const existing = {
      title: 'User title',
      providerTitle: 'Old provider title',
      titleSource: 'user' as const,
      state: 'idle' as const,
      dismissedAt: 250,
      stateOverrideTurnPosition: 3
    }

    const sameTurn = mergeConversationPersistenceState(existing, {
      title: 'Fresh provider title',
      providerTitle: 'Fresh provider title',
      titleSource: 'provider',
      state: 'running',
      dismissedAt: null,
      stateOverrideTurnPosition: null,
      lastActivityTs: 300,
      latestUserTurnPosition: 3,
      providerTitleIsSet: true
    })

    expect(sameTurn).toMatchObject({
      title: 'User title',
      providerTitle: 'Fresh provider title',
      titleSource: 'user',
      state: 'idle',
      dismissedAt: 250,
      stateOverrideTurnPosition: 3
    })

    const newerTurn = mergeConversationPersistenceState(existing, {
      title: 'Fresh provider title',
      providerTitle: 'Fresh provider title',
      titleSource: 'provider',
      state: 'running',
      dismissedAt: null,
      stateOverrideTurnPosition: null,
      lastActivityTs: 400,
      latestUserTurnPosition: 4,
      providerTitleIsSet: true
    })

    expect(newerTurn).toMatchObject({
      title: 'User title',
      providerTitle: 'Fresh provider title',
      titleSource: 'user',
      state: 'running',
      dismissedAt: null,
      stateOverrideTurnPosition: null
    })
  })
})
