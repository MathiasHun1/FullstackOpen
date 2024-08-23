import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialstate = {
    good: 0,
    ok: 0,
    bad: 0,
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      typr: 'DO NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialstate)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialstate

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

})

describe('state properties can be incremented', () => {
  const initialstate = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('property "good" can be incremented', () => {
    const state = initialstate
    const action = {
      type: 'GOOD'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState.good).toEqual(1)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('all properties can be incremented', () => {
    let state = initialstate
    const action1 = {
      type: 'GOOD'
    }
    const action2 = {
      type: 'OK'
    }
    const action3 = {
      type: 'BAD'
    }

    deepFreeze(state)
    const newState1 = counterReducer(state, action1)
    const newState2 = counterReducer(newState1, action2)
    const newState3 = counterReducer(newState2, action3)
    
    expect(newState3).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
  })

  test('incrementing multiple times succesfully', () => {
    let newState

    for (let i = 0; i < 10000; i++) {
      newState = counterReducer(newState, { type: 'GOOD' })
    }

    expect(newState).toEqual({
      good: 10000,
      ok: 0,
      bad: 0
    })
  })
})

describe('reset', () => {
  const initialstate = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('properties can be zero-ed', () => {
    let state = initialstate
    const action1 = {
      type: 'GOOD'
    }
    const action2 = {
      type: 'OK'
    }
    const action3 = {
      type: 'BAD'
    }

    deepFreeze(state)
    const newState1 = counterReducer(state, action1)
    const newState2 = counterReducer(newState1, action2)
    const newState3 = counterReducer(newState2, action3)

    const zeroState = counterReducer(newState3, { type: 'ZERO' })

    expect(zeroState).toEqual(initialstate)
  })
})