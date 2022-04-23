import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'b1356b5e-074b-4608-a733-39db627817e8'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

//api
export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('todo-lists')
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
        return promise
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title})
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskRequestType) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    },
}

//types
export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    data: D
    fieldsErrors: Array<number>
    messages: Array<string>
    resultCode: number
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

export type UpdateTaskRequestType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

