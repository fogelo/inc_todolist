import {useEffect, useState} from 'react';
import {todolistsAPI} from '../api/api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.createTodolist('hello')
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '150e62fb-f9be-4584-94d0-76dcc547540b'
    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '1e837d2c-4b98-421a-b185-6fbcd5c07f73'
    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const getTask = () => {
        todolistsAPI.getTasks(todolistId)
            .then(response => {
                setState(response.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" value={todolistId}
                   placeholder={'todolistId'}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>

            <button onClick={getTask}>get task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    // const todolistId = '150e62fb-f9be-4584-94d0-76dcc547540b'
    // const taskId = '150e62fb-f9be-4584-94d0-76dcc547540b'
    // useEffect(() => {
    //     todolistsAPI.deleteTask(todolistId, taskId)
    //         .then(response => {
    //             setState(response.data)
    //         })
    // }, [])
    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
                .then(response => {
                    setState(response.data)
                })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" value={todolistId}
                   placeholder={'todolistId'}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input type="text" value={taskId}
                   placeholder={'taskId'}
                   onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}