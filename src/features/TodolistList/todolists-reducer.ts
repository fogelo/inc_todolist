import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {RequestStatusType, setStatusAC, SetStatusActionType} from '../../app/app-reducer';

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (filter: FilterValueType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)


//thunks
export const fetchTodolistsTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(response => {
            const action = setTodolistsAC(response.data)
            dispatch(action)
            dispatch(setStatusAC('succeeded'))
        })
}

export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(response => {
            const action = addTodolistAC(response.data.data.item)
            dispatch(action)
            dispatch(setStatusAC('succeeded'))
        })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.deleteTodolist(id)
        .then(response => {
            if (response.data.resultCode === 0) {
                const action = removeTodolistAC(id)
                dispatch(action)
            }
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.updateTodolist(id, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                const action = changeTodolistTitleAC(title, id)
                dispatch(action)
            }
        })
}

//types
export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & { filter: FilterValueType, entityStatus: RequestStatusType }

export type ActionType =
    RemoveTodolistAT
    | AddTodolistAT
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsAT


export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

type ThunkDispatch = Dispatch<ActionType | SetStatusActionType>