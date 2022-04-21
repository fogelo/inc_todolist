import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from '@mui/material';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolists-api';
import {FilterValueType, TodolistDomainType} from './state/todolists-reducer';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(task => task.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let newTasks = [...tasks, {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            description: '',
            deadline: '',
            startDate: '',
            todoListId: todolistId2,
            priority: TaskPriorities.Low
        }]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.status = status
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
        }
        setTodolists([...todolists])
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {
            id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '',
            order: 0
        },
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists([...filteredTodolist])
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }
    let changeTodolistTitle = (newTitle: string, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: todolistId1,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: todolistId1,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'React',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: todolistId1,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'Redux',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: todolistId1,
                priority: TaskPriorities.Low
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Book',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: todolistId2,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: todolistId2,
                priority: TaskPriorities.Low
            },
        ]
    })

    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {
            id: v1(), title: title, filter: 'all', addedDate: '',
            order: 0
        }
        setTodolists([...todolists, todolist])
        setTasks({...tasksObj, [todolist.id]: []})
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={12}>{todolists.map(tl => {
                    let tasksForToDoList = tasksObj[tl.id]
                    if (tl.filter === 'active') {
                        tasksForToDoList = tasksForToDoList.filter(task => task.status === TaskStatuses.New)
                    }
                    if (tl.filter === 'completed') {
                        tasksForToDoList = tasksForToDoList.filter(task => task.status === TaskStatuses.Completed)
                    }
                    return (
                        <Grid key={tl.id}
                              item>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForToDoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
                </Grid>
            </Container>
        </div>
    )
        ;
}


export default App;
