import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';

const initialState: InitialAppStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

export const setAppIsInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)


//thunks

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(response.data, dispatch)
            }
            dispatch(setAppIsInitializedAC(true))
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

//types

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type ActionType =
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof setAppIsInitializedAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialAppStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    //если ошибка какая-то глобальная произойдет - мы запишем ошибку сюда
    error: string | null
    //true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}
