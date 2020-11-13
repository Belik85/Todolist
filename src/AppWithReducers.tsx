import React, {useReducer, useState} from 'react';
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


function AppWithReducers() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}

    ])


    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
        ],
        [todoListID2]: [
            {id: v1(), title: "Books", isDone: true},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Onion", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
        ]
    })

    function addTask(title: string, todoListID: string) {
        dispatchTasks(addTasksAC(title, todoListID))
    }


    function removeTask(taskID: string, todoListID: string) {
        dispatchTasks(removeTaskAC(taskID, todoListID))
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchTasks(changeTaskStatusAC(taskID, isDone, todoListID))

    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatchTasks(changeTaskTitleAC(taskID, title, todoListID))
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatchTodoLists(ChangeFilterAC(todoListID, value))
    }


    function removeTodoList(todoListID: string) {
        dispatchTodoLists(RemoveTodoListAC(todoListID))
        dispatchTasks(RemoveTodoListAC(todoListID))
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)

    }

    function changeTodoListTitle(todoListID: string, title: string) {
        dispatchTodoLists(ChangeTitleAC(todoListID, title))

    }

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
                            let tasksForTodolist = tasks[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                            }

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

export default AppWithReducers;
