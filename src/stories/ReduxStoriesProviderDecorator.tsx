import {Provider} from 'react-redux';
import {AppRootStoreType} from '../state/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../state/tasks-reducer';
import { todolistReducer} from '../state/todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

const rootState = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})


const initialGlobalState: AppRootStoreType = {
    tasks: {
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
                priority: TaskPriorities.Low},
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
                priority: TaskPriorities.Low},
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
                priority: TaskPriorities.Low},
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
                priority: TaskPriorities.Low},
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
                priority: TaskPriorities.Low},
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
                priority: TaskPriorities.Low},
        ]
    },
    todolists: [
        {
            id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '',
            order: 0
        },
        {
            id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '',
            order: 0
        },
    ]
}


export const storyBookStore = createStore(rootState, initialGlobalState)
export const ReduxStoriesProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}