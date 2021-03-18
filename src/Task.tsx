import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {removeTaskAC} from "./state/tasks-reducer";

export type TaskPropsType = {
    //taskID
    //todolistID
    todoListID:string;
    task: TaskType;
    onChangeHandler: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
    removeTask: (taskID: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, onChangeHandler, changeTaskTitle, removeTask, todoListID}) => {
    const  dispatch = useDispatch()

    const remove = () => dispatch(removeTaskAC(task.id, todoListID))
    const changeTitle = (title: string) => {
       changeTaskTitle(task.id, title )
    }

    return (
        <li className={task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(task.id, e.currentTarget.checked)}
                checked={task.isDone}
            />
            <EditableSpan value={task.title} changeValue={changeTitle}/>
            <IconButton onClick={remove}>
                {/*<IconButton onClick={() => removeTask(task.id)}>*/}
                <Delete/>
            </IconButton>
        </li>)


})

