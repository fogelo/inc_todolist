import {Provider} from 'react-redux';
import {AppRootStoreType} from '../app/store';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../features/TodolistList/tasks-reducer';
import {todolistReducer} from '../features/TodolistList/todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';
import {appReducer} from '../app/app-reducer';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from '../features/Login/auth-reducer';

const rootState = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
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
    },
    todolists: [
        {
            id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '',
            order: 0
        },
        {
            id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'loading', addedDate: '',
            order: 0
        },
    ],
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
}


export const storyBookStore = createStore(rootState, initialGlobalState, applyMiddleware(thunkMiddleware))
export const ReduxStoriesProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}