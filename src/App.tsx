import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {TaskType} from './Todolist'

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: v1(), title: "What to learn", filter: "all"},
        {id: v1(), title: "What to learn", filter: "all"}

    ])

    function removeTask(taskID: string) {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    function addTask(title: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks([newTask,...tasks])
    }

    // function changeFilter(value: FilterValuesType) {
    //     setFilter(value);
    // }

function changeFilter(value: FilterValuesType, todoListID: string){
    let todoList = todoLists.find(tl => tl.id === todoListID)
if(todoList){
    todoList.filter = value
    setTodoLists([...todoLists])

}

    }

    function changeStatus(taskID: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }


return (
    <div className="App">
        {
            todoLists.map(tl => {
                let tasksForTodolist = tasks;

                if (tl.filter === "active") {
                    tasksForTodolist = tasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })
        }


     </div>
  );

}

export default App;
