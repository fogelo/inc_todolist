import {
    addTodolistAC,
    AddTodolistAT,
    removeTodolistAC,
    RemoveTodolistAT,
    setTodolistsAC,
    SetTodolistsAT
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskRequestType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStoreType} from "../../app/store";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}


const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, domainModel: UpdateTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        })
    }
})

export const tasksReducer = slice.reducer

// export const _tasksReducer = (state = initialState, action: any): TasksStateType => {
//     switch (action.type) {
//         case "REMOVE-TASK":
//             return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
//         case "ADD-TASK":
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         case "UPDATE-TASK":
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId]
//                     .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
//             }
//         // case 'ADD-TODOLIST':
//         case addTodolistAC.type:
//             return {...state, [action.payload.todolist.id]: []}
//         // case 'REMOVE-TODOLIST': {
//         case removeTodolistAC.type: {
//             const stateCopy = {...state}
//             delete stateCopy[action.payload.id]
//             return stateCopy
//         }
//         // case 'SET-TODOLISTS': {
//         case setTodolistsAC.type: {
//             const stateCopy = {...state}
//             action.payload.todolists.forEach((tl: any) => stateCopy[tl.id] = [])
//             return stateCopy
//         }
//         case "SET-TASKS":
//             return {...state, [action.todolistId]: action.tasks}
//         default:
//             return state
//     }
// }

//actions

export const {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} = slice.actions

// export const removeTaskAC = (taskId: string, todolistId: string) =>
//     ({type: "REMOVE-TASK", taskId, todolistId} as const)
// export const addTaskAC = (task: TaskType) =>
//     ({type: "ADD-TASK", task} as const)
// export const updateTaskAC = (taskId: string, domainModel: UpdateTaskModelType, todolistId: string) =>
//     ({type: "UPDATE-TASK", domainModel, taskId, todolistId} as const)
// export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
//     ({type: "SET-TASKS", tasks, todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC({tasks: response.data.items, todolistId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}

export const removeTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, id)
        .then(response => {
            if (response.data.resultCode === 0) {
                const action = removeTaskAC({taskId: id, todolistId})
                dispatch(action)
            }
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTask(todolistId, title)
        .then(response => {
            if (response.data.resultCode === 0) {
                const action = addTaskAC({task: response.data.data.item})
                dispatch(action)
                dispatch(setAppStatusAC({status: "succeeded"}))

            } else {
                handleServerAppError(response.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (
    taskId: string,
    domainModel: UpdateTaskModelType,
    todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStoreType) => {

    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)

    if (!task) {
        throw new Error("task not found in the state")
        // console.warn('task not found in the state')
    }

    const apiModel: UpdateTaskRequestType = {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel
    }
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
        .then(response => {
            if (response.data.resultCode === 0) {
                const action = updateTaskAC({taskId: taskId, domainModel: apiModel, todolistId})
                dispatch(action)
            } else {
                handleServerAppError(response.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

//types
type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// export type ActionType =
//     ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof updateTaskAC>
//     | AddTodolistAT
//     | RemoveTodolistAT
//     | SetTodolistsAT
//     | ReturnType<typeof setTasksAC>

// type ThunkDispatch = Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>