import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React from "react";

type TaskPropsType = {


}


export const Task = React.memo(() => {
    return (
        <li className={t.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                onChange={onChangeHandler}
                checked={t.isDone}
            />
            <EditableSpan value={t.title} changeValue={ changeTaskTitle }/>
            <IconButton onClick={ removeTask }>
                <Delete/>
            </IconButton>
        </li>)



})

