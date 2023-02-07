import React, {useState} from 'react';
// import './App.css';
// import Todolist, {TaskType} from './Todolist';
// import {v1} from "uuid";
// import AddItemForm from "./AddItemForm";
//
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
// import {Menu} from "@material-ui/icons";
//
//
// export type FilterValuesType = 'All' | 'Completed' | 'Active';
//
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>,
// }
//
// export type TodolistType = {
//     id: string,
//     title: string,
//     filter: FilterValuesType,
// }
//
// function App() {

    // let initTasks: Array<TaskType> = [
    //     {id: 1, title: 'React', isDone: true},
    //     {id: 2, title: 'HTML', isDone: false},
    //     {id: 3, title: 'JS', isDone: true},
    //     {id: 4, title: 'CSS', isDone: false},
    //     {id: 5, title: 'Docker', isDone: true},
    //     {id: 6, title: 'PHP', isDone: false}
    // ]


    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: 'React', isDone: true},
    //     {id: v1(), title: 'HTML', isDone: false},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'CSS', isDone: false},
    //     {id: v1(), title: 'Docker', isDone: true},
    //     {id: v1(), title: 'PHP', isDone: false}
    // ])

    // let [filter, setFilter] = useState<FilterValuesType>('All')

    // let [todolists, setTodolists] = useState<Array<TodolistType>>([
    //     {id: v1(), title: "What to Buy", filter: "Active"},
    //     {id: v1(), title: "What to learn", filter: "Completed"},
    //
    // ])

    // let todolistId1 = v1();
    // let todolistId2 = v1();
    //
    // let [todolists, setTodolists] = useState<Array<TodolistType>>([
    //
    //     {id: todolistId1, title: "What to learn", filter: "Completed"},
    //     {id: todolistId2, title: "What to Buy", filter: "Active"},
    //
    // ])
    //
    // let removeTodolist = (todolistId: string) => {
    //     let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    //     setTodolists(filteredTodolist)
    //     delete tasks[todolistId];
    //     setTasks({...tasks})
    // }
    //
    //
    // let changeTodolistTitle = (todolistId: string, newTitle: string) => {
    //     const todolist = todolists.find(tl => tl.id === todolistId);
    //     if (todolist) {
    //         todolist.title = newTitle;
    //         setTodolists([...todolists])
    //     }
    // }

    // let [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistId1]: [
    //         {id: v1(), title: 'React', isDone: true},
    //         {id: v1(), title: 'HTML', isDone: false},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'CSS', isDone: false},
    //         {id: v1(), title: 'Docker', isDone: true},
    //         {id: v1(), title: 'PHP', isDone: false}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: 'Milk', isDone: true},
    //         {id: v1(), title: 'Beer', isDone: false}
    //     ]
    // })
    //
    // const removeTask = (id: string, todolistId: string) => {
    //     let todolistTasks = tasks[todolistId]
    //     let filteredTasks = todolistTasks.filter(t => t.id !== id)
    //     tasks[todolistId] = filteredTasks
    //     setTasks({...tasks})
    // }


    // const removeTask = (id: string) => {
    //     let resultTasks = tasks.filter(t => t.id !== id)
    //     setTasks(resultTasks)

    // (t) => {
    // return (t.id !== id)

    // if (t.id !== id)
    //     return true
    // else return false
    // }


    // const addTask = (title: string, todolistId: string) => {
    //     let newTask = {id: v1(), title: title, isDone: false}
    //     let todolistTasks = tasks[todolistId]
    //     let newTasks = [newTask, ...todolistTasks]
    //     tasks[todolistId] = newTasks
    //     setTasks({...tasks})
    // }

    // const addTask = (title: string) => {
    //     let newTask = {id: v1(), title: title, isDone: false}
    //     let newTasks = [newTask, ...tasks]
    //     setTasks(newTasks)
    // }

    // const changeFilter = (value: FilterValuesType, todolistId: string) => {
    //     let todolist = todolists.find((tl) => {
    //         return tl.id === todolistId
    //     })
    //     if (todolist) {
    //         todolist.filter = value;
    //         setTodolists([...todolists])
    //     }
    // }


    // const changeFilter = (value: FilterValuesType) => {
    //     setFilter(value)
    // }


    // let tasksForTodolist = tasks;
    // if (filter === 'Completed') {
    //     tasksForTodolist = tasks.filter((t) => {
    //         return t.isDone === true
    //     })
    // }
    // if (filter === 'Active') {
    //     tasksForTodolist = tasks.filter((t) => {
    //         return t.isDone === false
    //     })
    // }

    //
    // const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    //     let todolistTasks = tasks[todolistId]
    //     let task = todolistTasks.find(t => t.id === taskId);
    //     if (task) {
    //         task.isDone = isDone;
    //         setTasks({...tasks})
    //     }
    // }

    // const changeTaskStatus = (taskId: string, isDone: boolean) => {
    //     let task = tasks.find(t => t.id === taskId);
    //     if (task) {
    //         task.isDone = isDone;
    //     }
    //     setTasks([...tasks])

    // let copy = [...tasks]
    // setTasks(copy)
    // }

    // const changeTaskStatus = (taskId: string, isDone: boolean) => {
    //     let task = tasks.find((t) => {
    //         if (t.id === taskId) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //         if (task) {
    //             task.isDone === isDone;
    //         }
    //         let copy = [...tasks]
    //         setTasks(copy)
    //     })
    //
    // }

    //
    // const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    //     let todolistTasks = tasks[todolistId]
    //     let task = todolistTasks.find(t => t.id === taskId);
    //     if (task) {
    //         task.title = newTitle;
    //         setTasks({...tasks})
    //     }
    // }
    //
    // function addTodolist(title: string) {
    //     let todolist: TodolistType = {
    //         id: v1(),
    //         filter: "All",
    //         title: title,
    //     }
    //     setTodolists([todolist, ...todolists]);
    //     setTasks({
    //         ...tasks,
    //         [todolist.id]: [],
    //     })
    // }
    //
    //
    // return (
    //     <div className="App">
    //         <AppBar position="static">
    //             <Toolbar>
    //                 <IconButton
    //
    //                     edge="start"
    //                     color="inherit"
    //                     aria-label="menu"
    //
    //                 >
    //                     <Menu/>
    //                 </IconButton>
    //                 <Typography variant="h6">
    //                     News
    //                 </Typography>
    //                 <Button color="inherit">Login</Button>
    //             </Toolbar>
    //         </AppBar>
    //         <Container fixed>
    //             <Grid container style={{padding: '10px'}}>
    //                 <AddItemForm addItem={addTodolist}/>
    //             </Grid>
    //             <Grid container spacing={5}>
    //                 {
    //                     todolists.map((tl) => {
    //
    //                         let tasksForTodolist = tasks[tl.id];
    //                         if (tl.filter === 'Completed') {
    //                             tasksForTodolist = tasks[tl.id].filter((t) => {
    //                                 return t.isDone === true
    //                             })
    //                         }
    //                         if (tl.filter === 'Active') {
    //                             tasksForTodolist = tasks[tl.id].filter((t) => {
    //                                 return t.isDone === false
    //                             })
    //                         }
    //
    //                         return <Grid item>
    //                             <Paper style={{paddingLeft: '20px'}}>
    //                                 <Todolist
    //                                     key={tl.id}
    //                                     id={tl.id}
    //                                     title={tl.title}
    //                                     tasks={tasksForTodolist}
    //                                     removeTask={removeTask}
    //                                     changeFilter={changeFilter}
    //                                     addTask={addTask}
    //                                     changeTaskStatus={changeTaskStatus}
    //                                     changeTaskTitle={changeTaskTitle}
    //                                     filter={tl.filter}
    //                                     removeTodolist={removeTodolist}
    //                                     changeTodolistTitle={changeTodolistTitle}
    //                                 />
    //                             </Paper>
    //                         </Grid>
    //                     })
    //                 }


                    // {/*<Todolist title={'What to learn'}*/}
                    // {/*          tasks={tasksForTodolist}*/}
                    // {/*          removeTask={removeTask}*/}
                    // {/*          changeFilter={changeFilter}*/}
                    // {/*          addTask={addTask}*/}
                    // {/*          changeTaskStatus={changeTaskStatus}*/}
                    // {/*          filter={filter}*/}
                    // {/*/>*/}


//
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
//
// export default App;
