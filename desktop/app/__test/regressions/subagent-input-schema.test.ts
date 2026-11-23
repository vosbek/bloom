import { describe, expect, test } from 'vitest'

import { validateJsonObjectAgainstSchema } from '@blume/insights-control'

describe('sub-agent input schema validation', () => {
  test('rejects missing, mistyped, and extra sub-agent input fields', () => {
    const schema = {
      type: 'object',
      required: ['conversationId', 'signalIds'],
      properties: {
        conversationId: { type: 'number' },
        signalIds: { type: 'array', items: { type: 'number' } },
        mode: { enum: ['cluster', 'promote'] }
      },
      additionalProperties: false
    }

    expect(
      validateJsonObjectAgainstSchema(
        {
          conversationId: '42',
          signalIds: [1, '2'],
          extraUserText: 'do not allow this',
          mode: 'other'
        },
        schema
      )
    ).toEqual([
      'input.extraUserText is not allowed',
      'input.conversationId must be a number',
      'input.signalIds[1] must be a number',
      'input.mode must be one of "cluster", "promote"'
    ])

    expect(validateJsonObjectAgainstSchema({ conversationId: 42 }, schema)).toEqual([
      'input.signalIds is required'
    ])
  })
})
