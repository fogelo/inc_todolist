import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>  // можно записать по другому TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (value: string) => void
}

export function TodoList(props: PropsType) { //props = {title: 'What to learn', tasks: {}}

    let [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                            const onRemoveHandler = () => props.removeTask(task.id)
                            return <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        }
                    )

                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}