import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, TodolistDomainType,
    todolistReducer
} from './todolists-reducer';

test('todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistDomainType> = [
        {
            id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '',
            order: 0
        },
    ]
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: Array<TodolistDomainType> = [
        {
            id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '',
            order: 0
        },
    ]

    let newTodolistTitle = 'new todolist'
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new todolist')
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'new todolist title'
    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate: '',
            order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all',addedDate: '',
            order: 0},
    ]

    const action = changeTodolistTitleAC(newTodolistTitle, todolistId2)

    const endState = todolistReducer(startState, action)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('new todolist title')
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate: '',
            order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all',addedDate: '',
            order: 0},
    ]

    const action = changeTodolistFilterAC('completed', todolistId2)
    const endState = todolistReducer(startState, action)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})