import {Provider} from 'react-redux';
import {AppRootStoreType} from '../state/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../state/tasks-reducer';
import { todolistReducer} from '../state/todolists-reducer';
import {v1} from 'uuid';

const rootState = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})


const initialGlobalState = {
    tasks: {
        'todolistId1': [
            {id: v1(), title: 'css', isDone: false},
            {id: v1(), title: 'js', isDone: true},
            {id: v1(), title: 'react', isDone: false},
        ],
        'todolistId2': [
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'tea', isDone: false},
        ]
    },
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'},
    ]
}


export const storyBookStore = createStore(rootState, initialGlobalState as AppRootStoreType)
export const ReduxStoriesProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}