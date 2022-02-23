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
        const newTask = {id: v1(), title: inputValue, isDone: false}
        setTasks([...tasks, newTask])
        setInputValue('')
    }

    return (
        <div className="App">
            <div>What to learn</div>
            <input value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} type="text"/>
            <button onClick={addTask}>+</button>

            <ul>
                {tasks.map(item => <li key={item.id}>{item.title}</li>)}
            </ul>

        </div>
    );
}

export default App;
