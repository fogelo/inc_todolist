import {TasksStateType} from '../App';
import {addTodolistAC, TodolistDomainType, todolistReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

test('id should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC('new todolist')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistReducer(startTodolistsState, action)


    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)

})