import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {TaskType} from './Todolist'
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

let styles = {padding: "15px"}


function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}

    ])

    let[tasks, setTasks] = useState<TasksStateType>({
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

        let todoListTasks = tasks[todoListID]
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }


    function removeTask(taskID: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeFilter(value: FilterValuesType, todoListID: string){
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if(todoList){
            todoList.filter = value
            setTodoLists([...todoLists])

        }

    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
     setTodoLists( [...todoLists, newTodoList])
     setTasks( {
         ...tasks,
         [newTodoListID]: []

     })
    }

    function changeTaskTitle (taskID: string, title: string, todoListID: string){
        debugger
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(task => task.id === taskID)
        if(task){
            task.title = title
            setTasks({...tasks})
        }
    }

 function changeTodoListTitle(todoListID: string, title: string) {
     const todoList = todoLists.find(tl => tl.id === todoListID )
     if(todoList){
         todoList.title = title
         setTodoLists([...todoLists])

     }

 }

    return (
    <div className="App">
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start"  color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6" >
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
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                             changeFilter={changeFilter}
                             addTask={addTask}
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

export default App;
