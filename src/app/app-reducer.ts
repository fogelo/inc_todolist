const initialState: InitialAppStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)


//types

export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>
type ActionType =
    | SetStatusActionType
    | SetErrorActionType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialAppStateType = {
    status: RequestStatusType
    error: string | null
}
