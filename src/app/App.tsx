import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Box, Button, CircularProgress, Container} from '@mui/material';
import {TodolistList} from '../features/TodolistList/TodolistList';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackBar} from '../components/ErrorSnackBar/ErrorSnackBar';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStoreType} from './store';
import {RequestStatusType, initializeAppTC} from './app-reducer';
import {Routes, Route} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {logoutTC} from '../features/Login/auth-reducer';

type AppPT = {
    demo?: boolean
}

function App({demo = false}: AppPT) {
    console.log('App')
    const status = useSelector<AppRootStoreType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStoreType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStoreType>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    if (!isInitialized) {
        return <CircularProgress size={100} style={{display: 'flex', margin: '50px auto'}}/>
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <div className="App">
            <ErrorSnackBar/>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolist
                        </Typography>
                        {isLoggedIn && <Button color={'inherit'} onClick={logoutHandler}>log out</Button>}
                    </Toolbar>
                    {status === 'loading' ? <LinearProgress color="secondary"/> : ''}
                </AppBar>
            </Box>
            <Container fixed>

                <Routes>
                    <Route path="/" element={<TodolistList demo={demo}/>}/>
                    <Route path="login" element={<Login/>}/>
                </Routes>

            </Container>
        </div>
    )
        ;
}

export default App;
