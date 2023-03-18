import React, {useCallback} from 'react';
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
import {v1} from "uuid";
import {TestType} from "./state/Task";


export type FilterValuesType = 'All' | 'Completed' | 'Active';


export type TasksStateType = {
    [key: string]: Array<TaskType>,
}

export type TodolistType = {
    todolistId: string,
    title: string,
    filter: FilterValuesType,
}

function AppWithRedux() {

    let todolistId1 = v1();
     let todolistId2 = v1();

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch();

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(removeTaskAC(taskId, todolistId))

    }, [dispatch])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }, [dispatch])


    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatch(action);

    }, [dispatch])


    const changeTaskTitle = useCallback(({ newTitle, todolistId,taskId }: TestType) => {
        // console.log(taskId, newTitle, todolistId)
        dispatch(changeTaskTitleAC({taskId, newTitle, todolistId}))
    }, [dispatch])


    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string ) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    let removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [])

    let changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const action = changeTodolistTileAC(todolistId, newTitle)
        dispatch(action)
    }, [])


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

                            let allTodolistTasks = tasks[tl.todolistId];
                            let tasksForTodolist = allTodolistTasks;

                            // if (tl.filter === 'Active') {
                            //     tasksForTodolist = allTodolistTasks.filter((t) => {
                            //         return t.isDone === false
                            //     })
                            // }
                            //
                            // if (tl.filter === 'Completed') {
                            //     tasksForTodolist = allTodolistTasks.filter((t) => {
                            //         return t.isDone === true
                            //     })
                            // }

                            return <Grid item key={tl.todolistId}>
                                <Paper style={{paddingLeft: '20px'}}>
                                    <Todolist
                                        key={tl.todolistId}
                                        todolistId={tl.todolistId}
                                        title={tl.title}
                                        filter={tl.filter}
                                        changeFilter={changeFilter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}

                                        tasks={tasksForTodolist}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
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
