import React, {useCallback} from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import {Task} from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>  // можно записать по другому TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodoList = React.memo((props: PropsType) => { //props = {title: 'What to learn', tasks: {}}
    console.log('Todolist')
    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }, [props.changeTodolistTitle, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let tasksForToDoList = props.tasks
    if (props.filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(task => task.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(task => task.isDone === true)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForToDoList.map(task => <Task key={task.id}
                                                       task={task}
                                                       removeTask={props.removeTask}
                                                       changeTaskTitle={props.changeTaskTitle}
                                                       changeTaskStatus={props.changeTaskStatus}
                                                       todolistId={props.id}/>
                    )

                }
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={onActiveClickHandler}
                    className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    color={'secondary'}
                    onClick={onCompletedClickHandler}
                    className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </Button>
            </div>
        </div>)
})

