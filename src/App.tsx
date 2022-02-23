import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const initialState = [
    {id: v1(), title: 'html', isDone: true},
    {id: v1(), title: 'css', isDone: true},
    {id: v1(), title: 'js', isDone: true},
    {id: v1(), title: 'react', isDone: false},
    {id: v1(), title: 'redux', isDone: false},
]

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>(initialState)
    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState(false)
    let [filter, setFilter] = useState('all')

    function addTask() {
        if (inputValue) {
            const newTask = {id: v1(), title: inputValue, isDone: false}
            setTasks([...tasks, newTask])
            setInputValue('')
        } else {
            setError(true)
        }
    }

    function addTaskByEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        setError(false)
        if (e.code === 'Enter') {
            if (!inputValue) {
                setError(true)
                return
            }
            const newTask = {id: v1(), title: inputValue, isDone: false}
            setTasks([...tasks, newTask])
            setInputValue('')
        }
    }

    function removeTask(id: string) {
        setTasks(tasks.filter(item => item.id !== id))
    }

    function changeCheckbox(id: string) {
        let task = tasks.find(item => item.id === id)
        if (task) {
            task.isDone = !task.isDone
            setTasks([...tasks])
        }
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(item => !item.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(item => item.isDone)
    }

    return (
        <div className="App">
            <div>What to learn</div>
            <div className={'wrapper'}>
                <div className={'input'}>
                    <input className={error ? 'input-error' : ''} onKeyPress={(e) => addTaskByEnter(e)}
                           value={inputValue}
                           onChange={(e) => setInputValue(e.currentTarget.value)} type="text"/>
                    <button onClick={addTask}>+</button>
                    <div className={'message-error'}>{error ? 'field is required' : ''}</div>
                </div>

                <ul>
                    {filteredTasks.map(item => <li className={item.isDone ? 'isDone' : ''} key={item.id}>
                        <input onChange={() => changeCheckbox(item.id)} checked={item.isDone} type="checkbox"/>
                        <button onClick={() => removeTask(item.id)}>x</button>
                        <div>
                            {item.title}
                        </div>
                    </li>)}
                </ul>

                <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>all</button>
                <button className={filter === 'active' ? 'active' : ''}
                        onClick={() => setFilter('active')}>active
                </button>
                <button className={filter === 'completed' ? 'active' : ''}
                        onClick={() => setFilter('completed')}>completed
                </button>
            </div>

        </div>
    );
}

export default App;
