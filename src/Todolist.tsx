import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {inspect} from "util";
import styles from "./App"


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export function Todolist(props: PropsType) {


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }


    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);


    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
        }

        const changeTaskTitle = (value: string) => {
            debugger
            props.changeTaskTitle(t.id, value, props.id)
        }
        return (
        <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                onChange={onChangeHandler}
                checked={t.isDone}
            />

            {/*<input type="checkbox"*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       checked={t.isDone}/>*/}
            <EditableSpan value={t.title} changeValue={ changeTaskTitle }/>
            <IconButton onClick={ removeTask }>
               <Delete/>
            </IconButton>

            {/*<button onClick={removeTask}>X</button>*/}
        </li>
        )
    })


    return (

        <div>
            <h3>
                <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={()=>{props.removeTodoList(props.id)}}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={() => {props.removeTodoList(props.id)}}>X</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    size={"small"}
                    color={props.filter === 'all' ? "primary" : "default"}
                    variant={"contained"}
                    // className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    style={{margin: "0 5px"}}
                    size={"small"}
                    color={props.filter === 'active' ? "primary" : "default"}
                    variant={"contained"}
                    // className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={"small"}
                    color={props.filter === 'completed' ? "primary" : "default"}
                    variant={"contained"}
                    // className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}
