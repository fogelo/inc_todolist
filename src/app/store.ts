import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistReducer} from '../features/TodolistList/todolists-reducer';
import {tasksReducer} from '../features/TodolistList/tasks-reducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

// type AppRootState = {
//     todolists: Array<TodolistType>
//     tasks: TasksStateType
// }

// дай мне тип данных который возвращает функция rootReducer
export type AppRootStoreType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


// @ts-ignore
window.store = store