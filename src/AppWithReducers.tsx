import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTileAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = 'All' | 'Completed' | 'Active';


export type TasksStateType = {
    [key: string]: Array<TaskType>,
}

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer,[

        {id: todolistId1, title: "What to learn", filter: "Completed"},
        {id: todolistId2, title: "What to Buy", filter: "Active"},

    ])

    let [tasks, disptachToTasksReducer] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'Docker', isDone: true},
            {id: v1(), title: 'PHP', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Beer', isDone: false}
        ]
    })

    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistReducer(action)
        disptachToTasksReducer(action)
    }


    let changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTileAC(todolistId, newTitle)
        dispatchToTodolistReducer(action)
    }



    const removeTask = (id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        disptachToTasksReducer(action)
    }

    const addTask = (title: string, todolistId: string) => {
        disptachToTasksReducer(addTaskAC(title, todolistId))

        // const action = addTaskAC(title, todolistId);
        // disptachToTasksReducer(action)
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
       const action = changeTodolistFilterAC( todolistId, value)
        dispatchToTodolistReducer(action)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, todolistId, isDone);
        disptachToTasksReducer(action)
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(taskId, todolistId, newTitle);
        disptachToTasksReducer(action)
    }

    function addTodolist(title: string) {
       const action = addTodolistAC(title)
        dispatchToTodolistReducer(action)
        disptachToTasksReducer(action)
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

                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === 'Completed') {
                                tasksForTodolist = tasks[tl.id].filter((t) => {
                                    return t.isDone === true
                                })
                            }
                            if (tl.filter === 'Active') {
                                tasksForTodolist = tasks[tl.id].filter((t) => {
                                    return t.isDone === false
                                })
                            }

                            return <Grid item>
                                <Paper style={{paddingLeft: '20px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
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


export default AppWithReducers;
