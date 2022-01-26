import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('Many actions are performed correctly', () => {
    const actionFirst = {
      type: 'OK'
    }

    const actionSecond = {
      type: 'GOOD'
    }

    const actionThird = {
      type: 'BAD'
    }

    const state = initialState

    deepFreeze(state)

    const newState = counterReducer(state, actionFirst)
    
    const newerState = counterReducer(newState, actionSecond)

    const lastState = counterReducer(newerState, actionThird)

    expect(lastState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
  })

  test('zero is working correctly', () => {
    const action = {
      type: 'ZERO'
    }

    const state = {
      good: 23,
      ok: 11,
       bad: 1
    }
    deepFreeze(state)

    const newState = counterReducer(state, action)

    expect(newState).toEqual(initialState)
  })
})