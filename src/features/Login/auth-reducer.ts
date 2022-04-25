import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialAuthState: InitialAuthStateType = {
    isLoggedIn: false
}

export const authReducer = (state = initialAuthState, action: ActionType) => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'SET-IS-LOGGED-IN', value} as const)

//thunks
export const loginTC = (params: LoginParamsType) => (dispatch: Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(params)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}
export const logoutTC = () => (dispatch: Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

//types
type ActionType = ReturnType<typeof setIsLoggedInAC>
type InitialAuthStateType = {
    isLoggedIn: boolean
}