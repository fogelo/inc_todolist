import {useEffect, useState} from 'react';
import {todolistsAPI} from '../api/todolists-api';

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


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const deleteTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
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
            <input type="text" value={taskTitle}
                   placeholder={'taskId'}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <button onClick={deleteTask}>create task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [title, setTitle] = useState('')

    const [description, setDescription] = useState('')
    const [status, setStatus] = useState(0)
    const [priority, setPriority] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [deadline, setDeadline] = useState('')
    const deleteTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            title, description, status, priority, startDate, deadline
        })
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
            <input type="text" value={title}
                   placeholder={'title'}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input type="text" value={description}
                   placeholder={'description'}
                   onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input type="number" value={status}
                   placeholder={'status'}
                   onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <input type="number" value={priority}
                   placeholder={'priority'}
                   onChange={(e) => setPriority(+e.currentTarget.value)}/>
            {/*<input type="text" value={startDate}*/}
            {/*       placeholder={'startDate'}*/}
            {/*       onChange={(e) => setStartDate(e.currentTarget.value)}/>*/}
            {/*<input type="text" value={deadline}*/}
            {/*       placeholder={'deadline'}*/}
            {/*       onChange={(e) => setDeadline(e.currentTarget.value)}/>*/}
            <button onClick={deleteTask}>update task</button>
        </div>
    </div>
}