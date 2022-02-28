import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';


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
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export function TodoList(props: PropsType) { //props = {title: 'What to learn', tasks: {}}

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (title.trim() === '') {
            return
        }
        if (e.code === 'Enter') {
            props.addTask(title, props.id)
            setTitle('')
        }
    }
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError('field is required')
        }

    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input value={title}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                <div className={error ? 'error-message' : ''}>{error}</div>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                            const onClickHandler = () => props.removeTask(task.id, props.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                            }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeHandler}/>
                                <span>{task.title}</span>
                                <button onClick={onClickHandler}>X</button>
                            </li>
                        }
                    )

                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    onClick={onActiveClickHandler}
                    className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    )
}