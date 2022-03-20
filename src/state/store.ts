import {combineReducers, createStore} from 'redux';
import {todolistReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

// type AppRootState = {
//     todolists: Array<TodolistType>
//     tasks: TasksStateType
// }

// дай мне тип данных который возвращает функция rootReducer
export type AppRootStore = ReturnType<typeof rootReducer>



export const store = createStore(rootReducer)


// @ts-ignore
window.store = store