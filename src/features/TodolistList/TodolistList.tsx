import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "../../app/store";
import {TaskStatuses} from "../../api/todolists-api";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {
    addTodolistTC, changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistTC, TodolistDomainType
} from "./todolists-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./Todolist/TodoList";
import {useNavigate} from "react-router-dom";

type TodolistListPT = {
    demo?: boolean
}
export const TodolistList = ({demo = false, ...props}: TodolistListPT) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const todolists = useSelector<AppRootStoreType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStoreType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStoreType>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo) {
            return
        }
        if (!isLoggedIn) {
            // debugger
            navigate("/login")
        }
        isLoggedIn && dispatch(fetchTodolistsTC())
    }, [isLoggedIn])

    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(todolistId, title)
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(taskId, {status}, todolistId)
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(taskId, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        const thunk = changeTodolistFilterAC({filter: value, id: todolistId})
        dispatch(thunk)
    }, [])


    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistTC(todolistId)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
        const thunk = changeTodolistTitleTC(todolistId, newTitle)
        dispatch(thunk)
    }, [])


    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [])


    return (
        <>
            <Grid container style={{padding: "10px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={12}>{todolists.map(tl => {
                let tasksForToDoList = tasks[tl.id]
                return (
                    <Grid key={tl.id}
                          item>
                        <Paper style={{padding: "10px"}}>
                            <TodoList
                                todolist={tl}
                                tasks={tasksForToDoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                )
            })}
            </Grid>
        </>
    )
}