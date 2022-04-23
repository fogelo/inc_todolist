import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {FilterValueType} from '../todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from '../tasks-reducer';


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>  // можно записать по другому TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodoList = React.memo((props: PropsType) => { //props = {title: 'What to learn', tasks: {}}
    console.log('Todolist')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

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
        tasksForToDoList = tasksForToDoList.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(task => task.status === TaskStatuses.Completed)
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

