import {appReducer, InitialAppStateType, setErrorAC, setStatusAC} from './app-reducer';

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

test('status should be set', () => {
    const action = setStatusAC('loading')
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading')
    expect(endState.error).toBe(null)
})
test('error message should be set', () => {
    const action = setErrorAC('some error')
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('idle')
    expect(endState.error).toBe('some error')
})