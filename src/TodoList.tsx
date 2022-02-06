import React from 'react';
import {FilterValueType} from './App';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>  // можно записать по другому TaskType[]
    removeTask: Function
    changeFilter: (value: FilterValueType) => void
}

export function TodoList(props: PropsType) { //props = {title: 'What to learn', tasks: {}}
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => <li><input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => props.removeTask(task.id)}>X</button>
                        </li>
                    )

                }
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}