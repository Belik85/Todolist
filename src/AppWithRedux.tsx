import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import AddItemForm from "./AddItemForm";

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTileAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValuesType = 'All' | 'Completed' | 'Active';


export type TasksStateType = {
    [key: string]: Array<TaskType>,
}

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

function AppWithRedux() {

    const dispatch = useDispatch();

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)

    //перенесли в тудулист все таски и функции

    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    // const removeTask = (id: string, todolistId: string) => {
    //     const action = removeTaskAC(id, todolistId);
    //     dispatch(action)
    // }

    // const addTask = (title: string, todolistId: string) => {
    //     dispatch(addTaskAC(title, todolistId))

        // const action = addTaskAC(title, todolistId);
        // disptachToTasksReducer(action)
    // }

    // const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
    //     const action = changeTaskStatusAC(id, todolistId, isDone);
    //     dispatch(action)
    // }

    // const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
    //     const action = changeTaskTitleAC(id, todolistId, newTitle);
    //     dispatch(action)
    // }



    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    },[])

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC( todolistId, value )
        dispatch(action)
    }

    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    let changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTileAC(todolistId, newTitle)
        dispatch(action)
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton

                        edge="start"
                        color="inherit"
                        aria-label="menu"

                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((tl) => {

                            // let tasksForTodolist = tasks[tl.id];
                            // if (tl.filter === 'Completed') {
                            //     tasksForTodolist = tasks[tl.id].filter((t) => {
                            //         return t.isDone === true
                            //     })
                            // }
                            // if (tl.filter === 'Active') {
                            //     tasksForTodolist = tasks[tl.id].filter((t) => {
                            //         return t.isDone === false
                            //     })
                            // }

                            return <Grid item>
                                <Paper style={{paddingLeft: '20px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        changeFilter={changeFilter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}


                                        // tasks={tasksForTodolist}
                                        // removeTask={removeTask}
                                        // addTask={addTask}
                                        // changeTaskStatus={changeTaskStatus}
                                        // changeTaskTitle={changeTaskTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }

                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;
