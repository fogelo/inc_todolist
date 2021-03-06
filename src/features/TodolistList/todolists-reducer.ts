import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []


const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ title: string, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValueType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ status: RequestStatusType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    }
})

export const todolistReducer = slice.reducer /*(state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        default:
            return state
    }
}*/

//actions

export const {
    removeTodolistAC,
    addTodolistAC,
    setTodolistsAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatus
} = slice.actions

/*export const removeTodolistAC = (todolistId: string) => ({type: "REMOVE-TODOLIST", id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)
export const changeTodolistTitleAC = (title: string, id: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
} as const)
export const changeTodolistFilterAC = (filter: FilterValueType, id: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
} as const)
export const changeTodolistEntityStatus = (status: RequestStatusType, id: string) => ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    id,
    status
} as const)*/


//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTodolists()
        .then(response => {
            const action = setTodolistsAC({todolists: response.data})
            dispatch(action)
            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTodolist(title)
        .then(response => {
            const action = addTodolistAC({todolist: response.data.data.item})
            dispatch(action)
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(changeTodolistEntityStatus({status: "loading", id}))
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.deleteTodolist(id)
        .then(response => {
            if (response.data.resultCode === 0) {
                const action = removeTodolistAC({todolistId: id})
                dispatch(action)
                dispatch(setAppStatusAC({status: "succeeded"}))
            }
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                const action = changeTodolistTitleAC({title, id})
                dispatch(action)
            }
        })
}

//types
export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & { filter: FilterValueType, entityStatus: RequestStatusType }

export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
