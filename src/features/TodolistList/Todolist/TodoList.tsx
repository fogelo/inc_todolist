import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@mui/material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValueType, TodolistDomainType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>  // можно записать по другому TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    demo?: boolean
}

export const TodoList = React.memo(({demo = false, ...props}: PropsType) => { //props = {title: 'What to learn', tasks: {}}
    console.log("Todolist")

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return
        } else {
            dispatch(fetchTasksTC(props.todolist.id))
        }

    }, [])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolist.id), [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolist.id), [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolist.id), [props.changeFilter, props.todolist.id])
    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolist.id)
    }, [props.changeTodolistTitle, props.todolist.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    let tasksForToDoList = props.tasks
    if (props.todolist.filter === "active") {
        tasksForToDoList = tasksForToDoList.filter(task => task.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForToDoList = tasksForToDoList.filter(task => task.status === TaskStatuses.Completed)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {
                    tasksForToDoList?.map(task => <Task key={task.id}
                                                                           task={task}
                                                                           removeTask={props.removeTask}
                                                                           changeTaskTitle={props.changeTaskTitle}
                                                                           changeTaskStatus={props.changeTaskStatus}
                                                                           todolistId={props.todolist.id}/>
                    )
                }
            </div>
            <div>
                <Button
                    variant={props.todolist.filter === "all" ? "contained" : "text"}
                    className={props.todolist.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={props.todolist.filter === "active" ? "contained" : "text"}
                    color={"primary"}
                    onClick={onActiveClickHandler}
                    className={props.todolist.filter === "active" ? "active-filter" : ""}>Active
                </Button>
                <Button
                    variant={props.todolist.filter === "completed" ? "contained" : "text"}
                    color={"secondary"}
                    onClick={onCompletedClickHandler}
                    className={props.todolist.filter === "completed" ? "active-filter" : ""}>Completed
                </Button>
            </div>
        </div>)
})

