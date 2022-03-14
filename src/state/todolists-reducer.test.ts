import {v1} from 'uuid';
import {FilterValueType} from '../App';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './todolists-reducer';

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
test('todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    let newTodolistTitle = 'new todolist'
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('new todolist')
    expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'new todolist title'
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistReducer(startState, action)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('new todolist title')
})

test('correct filter of todolist should be changed', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const action = changeTodolistFilterAC(todolistId2, 'completed')
    const endState = todolistReducer(startState, action)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})