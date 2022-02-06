import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    let [filter, setFilter] = useState('all')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    let tasksForToDoList = tasks
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(task => task.isDone === true)
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}


export default App;
