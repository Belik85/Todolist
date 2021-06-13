import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {TaskType} from './Todolist'
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeFilterAC,
    ChangeTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTasksAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {todoListAPI} from "./api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

let styles = {padding: "15px"}


function AppWithRedux() {








    // useEffect(()=> {
   //     todoListAPI.getTodoList().then((res)=>{
   //         let todos = res.data
   //         dispatch(getTodolistAC(todos))
   //     })
   // },[])

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTasksAC(title, todoListID))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        debugger
        const action = removeTaskAC(taskID, todoListID);
        dispatch(action);

    }, [dispatch])

    const changeStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(ChangeFilterAC(todoListID, value))
    }, [dispatch])


    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID))

    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(ChangeTitleAC(todoListID, title))

    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid style={styles}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {
                        todoLists.map(tl => {

                            // let tasksForTodolist = tasks[tl.id];
                            // let tasksForTodolist = tasks[tl.id];
                            //
                            //
                            // if (tl.filter === "active") {
                            //     tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                            // }

                            // let allTodolistTasks = tasksForTodolist;
                            //
                            //
                            // if (tl.filter === "active") {
                            //     allTodolistTasks = tasksForTodolist.filter(t => t.isDone === false);
                            // }
                            // if (tl.filter === "completed") {
                            //     allTodolistTasks = tasksForTodolist.filter(t => t.isDone === true);
                            // }

                            return (
                                <Grid item={true} key={tl.id}>
                                    <Paper style={styles} elevation={3}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                         })
                    }
                </Grid>
            </Container>
        </div>

    )
}

export default AppWithRedux;
