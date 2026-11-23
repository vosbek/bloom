import { describe, expect, test } from 'vitest'

import {
  buildSurveyResponseProperties,
  surveyIdBasedResponseKey,
  surveyIndexBasedResponseKey
} from '../../src/renderer/src/lib/surveyPayload'

describe('survey response payloads', () => {
  const questions = [
    { id: 'email-question', question: "What's your email?" },
    { id: 'note-question', question: "Anything you'd like us to know?" }
  ]

  test('emits id-based and index-based response keys for PostHog survey compatibility', () => {
    expect(
      buildSurveyResponseProperties(questions, {
        'email-question': 'person@example.com',
        'note-question': 'Happy to chat'
      })
    ).toEqual({
      $survey_questions: [
        { id: 'email-question', question: "What's your email?", response: 'person@example.com' },
        {
          id: 'note-question',
          question: "Anything you'd like us to know?",
          response: 'Happy to chat'
        }
      ],
      '$survey_response_email-question': 'person@example.com',
      $survey_response: 'person@example.com',
      '$survey_response_note-question': 'Happy to chat',
      $survey_response_1: 'Happy to chat'
    })
  })

  test('omits unanswered optional questions from response keys', () => {
    expect(
      buildSurveyResponseProperties(questions, {
        'email-question': 'person@example.com',
        'note-question': undefined
      })
    ).toEqual({
      $survey_questions: [
        { id: 'email-question', question: "What's your email?", response: 'person@example.com' },
        { id: 'note-question', question: "Anything you'd like us to know?" }
      ],
      '$survey_response_email-question': 'person@example.com',
      $survey_response: 'person@example.com'
    })
  })

  test('matches PostHog survey response key conventions', () => {
    expect(surveyIdBasedResponseKey('question-id')).toBe('$survey_response_question-id')
    expect(surveyIndexBasedResponseKey(0)).toBe('$survey_response')
    expect(surveyIndexBasedResponseKey(2)).toBe('$survey_response_2')
  })
})
