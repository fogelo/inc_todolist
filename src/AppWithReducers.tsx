import React, {useReducer} from 'react';
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
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC,
    todolistReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {TaskType, TaskStatuses, TaskPriorities} from './api/todolists-api';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistReducer, [
        {
            id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '',
            order: 0
        },
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(), title: 'CSS',
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
                id: v1(), title: 'Redux', status: TaskStatuses.New,
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
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: todolistId2,
                priority: TaskPriorities.Low},
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                deadline: '',
                startDate: '',
                todoListId: todolistId2,
                priority: TaskPriorities.Low},
        ]
    })

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        const action = changeTaskStatusAC(taskId, status, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        const action = changeTodolistFilterAC(value, todolistId)
        dispatchToTodolistReducer(action)
    }


    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReducer(action)
        dispatchToTodolistReducer(action)
    }
    let changeTodolistTitle = (newTitle: string, todolistId: string) => {
        const action = changeTodolistTitleAC(newTitle, todolistId)
        dispatchToTodolistReducer(action)
    }


    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodolistReducer(action)
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


export default AppWithReducers;
