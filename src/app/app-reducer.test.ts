import {appReducer, InitialAppStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})

test("status should be set", () => {
    const action = setAppStatusAC({status: "loading"})
    const endState = appReducer(startState, action)

    expect(endState.status).toBe("loading")
    expect(endState.error).toBe(null)
})
test("error message should be set", () => {
    const action = setAppErrorAC({error: "some error"})
    const endState = appReducer(startState, action)

    expect(endState.status).toBe("idle")
    expect(endState.error).toBe("some error")
})