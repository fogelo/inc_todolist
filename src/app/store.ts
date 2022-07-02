import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistReducer} from '../features/TodolistList/todolists-reducer';
import {tasksReducer} from '../features/TodolistList/tasks-reducer';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

// type AppRootState = {
//     todolists: Array<TodolistType>
//     tasks: TasksStateType
// }

// дай мне тип данных который возвращает функция rootReducer
export type AppRootStoreType = ReturnType<typeof rootReducer>


// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware),
})

// @ts-ignore
window.store = store