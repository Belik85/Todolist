import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "../Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TodolistType} from "../AppWithRedux";


type TaskPropsType = {
    task: TaskType,
    todolistId: string,
    removeTask: (taskId: string, todolistId: string) => void,
    changeTaskStatus: (taksId: string,  isDone: boolean, todolistId: string) => void,
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void

}

export const Task = React.memo((props: TaskPropsType) => {

    const removeTask = () => props.removeTask(props.task.id, props.todolistId)

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
    }

    const onChangeTaskTitle = useCallback((newValue: string) => {
            props.changeTaskTitle(props.task.id, newValue, props.todolistId)
        }, [
            props.task.id, props.changeTaskTitle, props.todolistId
        ]
    )

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            {/*<input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>*/}

            <Checkbox
                checked={props.task.isDone}
                onChange={changeTaskStatus}
                color='primary'
            />

            <EditableSpan value={props.task.title}
                          onChange={onChangeTaskTitle}/>

            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
});

export default Task;