import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container} from '@mui/material';
import {TodolistList} from '../features/TodolistList/TodolistList';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackBar} from '../components/ErrorSnackBar/ErrorSnackBar';
import {useSelector} from 'react-redux';
import {AppRootStoreType} from './store';
import {RequestStatusType} from './app-reducer';


function App() {
    console.log('App')
    const status = useSelector<AppRootStoreType, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <ErrorSnackBar/>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolist
                    </Typography>
                </Toolbar>
                {status === 'loading' ? <LinearProgress color="secondary"/> : ''}
            </AppBar>

            <Container fixed>
                <TodolistList/>
            </Container>
        </div>
    )
        ;
}

export default App;
