import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {inspect} from "util";
import styles from "./App"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType} from "./AppWithRedux";
import {addTasksAC} from "./state/tasks-reducer";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: string
    title: string
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export const Todolist: React.FC<PropsType> = React.memo((props: PropsType) => {
    console.log("Todolist called")

    let tasksTodolist = useSelector<AppRootStateType, Array<TaskType>>( state => state.tasks[props.id])
    let dispatch = useDispatch()
    let tasksForTodolist = tasksTodolist;

    if (props.filter === "active") {
        tasksForTodolist = tasksTodolist.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksTodolist.filter(t => t.isDone === true);
    }

    // let allTodolistTasks = [];
    //
    // if (props.filter === "active") {
    //     allTodolistTasks = tasksForTodolist.filter(t => t.isDone === false);
    // }
    // if (props.filter === "completed") {
    //     allTodolistTasks = tasksForTodolist.filter(t => t.isDone === true);
    // }

    const addTask = useCallback((title: string) => {
        dispatch(addTasksAC(title, props.id))
    }, [props.id])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.changeTodoListTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), []);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), []);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), []);

    // const removeTask = () => {
    //     props.removeTask(t.id, props.id)
    // }

    const removeTask = useCallback((taskID: string) => {
        debugger
        props.removeTask(taskID, props.id)
    }, [props.removeTask, props.id])

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
    // }

    const onChangeHandler = useCallback((taskID: string, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone, props.id);
    }, [props.changeTaskStatus, props.id])

    // const changeTaskTitle = (value: string) => {
    //     props.changeTaskTitle(t.id, value, props.id)
    // };

    const changeTaskTitle = useCallback((taskID: string, title: string) => {
        props.changeTaskTitle(taskID, title, props.id)
    }, [props.changeTaskTitle, props.id]);

    const elementsTasks = tasksForTodolist.map(t => {
        return (
            <Task
               key = {t.id}
               task={t}
               onChangeHandler={onChangeHandler}
               changeTaskTitle={changeTaskTitle}
               removeTask={removeTask}
               todoListID={props.id}
            />
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
                {elementsTasks}
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
            {/*// @ts-ignore*/}
            {/*<EditableSpan value={props.title} changeValue={ changeTaskTitle }/>*!/*/}
            {/*<li key={t.id} className={t.isDone ? "is-done" : ""}>*/}
            {/*    <Checkbox*/}
            {/*        color={"primary"}*/}
            {/*        onChange={onChangeHandler}*/}
            {/*        checked={t.isDone}*/}
            {/*    />*/}

            {/*    /!*<input type="checkbox"*!/*/}
            {/*    /!*       onChange={onChangeHandler}*!/*/}
            {/*    /!*       checked={t.isDone}/>*!/*/}
            {/*    <EditableSpan value={t.title} changeValue={ changeTaskTitle }/>*/}
            {/*    <IconButton onClick={ removeTask }>*/}
            {/*        <Delete/>*/}
            {/*    </IconButton>*/}

            {/*    /!*<button onClick={removeTask}>X</button>*!/*/}
            {/*</li>   */}

        </div>
    )
})
