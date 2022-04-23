import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskRequestType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStoreType} from '../../app/store';

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, domainModel: UpdateTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', domainModel, taskId, todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC(response.data.items, todolistId))
        })
}

export const removeTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.deleteTask(todolistId, id)
        .then(response => {
            if (response.data.resultCode === 0) {
                const action = removeTaskAC(id, todolistId)
                dispatch(action)
            }
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.createTask(todolistId, title)
        .then(response => {
            const action = addTaskAC(response.data.data.item)
            dispatch(action)
        })
}

export const updateTaskTC = (
    taskId: string,
    domainModel: UpdateTaskModelType,
    todolistId: string) => (dispatch: Dispatch<ActionType>, getState: () => AppRootStoreType) => {

    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)

    if (!task) {
        throw new Error('task not found in the state')
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
                const action = updateTaskAC(taskId, apiModel, todolistId)
                dispatch(action)
            }
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

export type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | ReturnType<typeof setTasksAC>