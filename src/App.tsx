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
    let [filter, setFilter] = useState<FilterValueType>('all')


    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTasks = [...tasks, {id: v1(), title: title, isDone: false}]
        setTasks(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
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
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}


export default App;
