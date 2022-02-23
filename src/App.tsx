import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([])
    let [inputValue, setInputValue] = useState('')

    function addTask() {
        if (inputValue) {
            const newTask = {id: v1(), title: inputValue, isDone: false}
            setTasks([...tasks, newTask])
            setInputValue('')
        } else {
            return
        }

    }

    function removeTask(id: string) {
        setTasks(tasks.filter(item => item.id !== id))
    }

    function changeCheckbox(id: string) {
        let task = tasks.find(item => item.id === id)
        if(task){
            task.isDone = !task.isDone
            setTasks([...tasks])
        }

    }

    return (
        <div className="App">
            <div>What to learn</div>
            <input value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} type="text"/>
            <button onClick={addTask}>+</button>

            <ul>
                {tasks.map(item => <li key={item.id}>
                    <input onClick={() => changeCheckbox(item.id)} checked={item.isDone} type="checkbox"/>
                    {item.title}
                    <button onClick={() => removeTask(item.id)}>-</button>
                </li>)}
            </ul>

        </div>
    );
}

export default App;
