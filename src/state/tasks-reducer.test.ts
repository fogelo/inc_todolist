import {TasksStateType} from '../App';
import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer, updateTaskAC
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'css',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: 'todolistId1',
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'js',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: 'todolistId1',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'react',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: 'todolistId1',
                priority: TaskPriorities.Low
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: 'todolistId2',
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: 'todolistId2',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: 'todolistId2',
                priority: TaskPriorities.Low
            },
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId1')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'].every(t => t.id !== '2')).toBeTruthy()
    expect(endState['todolistId1'][0].id).toBe('1')
    expect(endState['todolistId1'][1].id).toBe('3')
})
test('correct task should be added to correct array', () => {


    const action = addTaskAC({
        id: '1',
        title: 'css',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        description: '',
        deadline: '',
        startDate: '',
        todoListId: 'todolistId1',
        priority: TaskPriorities.Low
    })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('css')
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {


    const action = updateTaskAC('2', {status: TaskStatuses.New}, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})
test('title of specified task should be changed', () => {
    const action = updateTaskAC('2', {title: 'Milkyway'}, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('js')
    expect(endState['todolistId2'][1].title).toBe('Milkyway')
})
test('new property with new array should  of specified task should be changed', () => {
    const action = addTodolistAC({
        id: 'todolistId3',
        title: 'title',
        order: 0,
        addedDate: ''
    })
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})

test('empty arrays of tasks should be added when we todolists', () => {
    const todolists = [
        {
            id: '1', title: 'What to learn', addedDate: '', order: 0
        },
        {
            id: '2', title: 'What to buy', addedDate: '', order: 0
        },
    ]
    const action = setTodolistsAC(todolists)

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
    const action = setTasksAC(startState['todolistId1'], 'todolistId1')
    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': [],
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})