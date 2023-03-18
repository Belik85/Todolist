import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "../Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TodolistType} from "../AppWithRedux";


 export type TestType = {taskId: string, newTitle: string, todolistId: string}

type TaskPropsType = {
    task: TaskType,
    todolistId: string,
    removeTask: (taskId: string, todolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    changeTaskTitle: ({taskId, newTitle, todolistId}: TestType) => void

}

export const Task = React.memo((props: TaskPropsType) => {

    const {
        task,
        todolistId,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
    } = props

    // const removeTask = () => props.removeTask(props.task.taskId, props.todolistId)
    //
    // const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    //     let newIsDoneValue = e.currentTarget.checked;
    //     props.changeTaskStatus(props.task.taskId, newIsDoneValue, props.todolistId)
    // }


    const changeTitle = (newTitle: string) => {
        // console.log('new title', newTitle)
        return changeTaskTitle(  {taskId : task.taskId, newTitle, todolistId})
    }

    //
    // const changeTitle = (newTitle: string) => {
    //     return props.changeTaskTitle(props.task.taskId, newTitle, props.todolistId)
    // }

    // const onChangeTaskTitle = useCallback((newTitle: string) => {
    //         props.changeTaskTitle(props.task.taskId, newTitle, props.todolistId)
    //     }, [
    //         props.task.taskId, props.changeTaskTitle, props.todolistId
    //     ]
    // )

    return (
        <div key={props.task.taskId} className={props.task.isDone ? "is-done" : ""}>
            {/*<input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>*/}

            <Checkbox
                checked={props.task.isDone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {changeTaskStatus(task.taskId, e.currentTarget.checked, todolistId)}}
                color='primary'
            />

            <EditableSpan value={props.task.title}
                          onChange={changeTitle}
            />

            <IconButton onClick={() => {removeTask(task.taskId, todolistId)}}>
                <Delete/>
            </IconButton>
        </div>
    );
});

export default Task;