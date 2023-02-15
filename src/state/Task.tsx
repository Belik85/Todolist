import React, {ChangeEvent} from 'react';
import {TaskType} from "../Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@material-ui/icons";


type TaskPropsType = {
    task: TaskType,
    onRemoveHandler: (id: string) => void,
    onChangeStatusHandler: (id: string, e: ChangeEvent<HTMLInputElement>) => void,
    onChangeTitleHandler: (id: string, newValue: string) => void

}

const Task = (props: TaskPropsType) => {

    return (
        <div  className={props.task.isDone ? "is-done" : ""}>
            {/*<input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>*/}

            <Checkbox
                checked={props.task.isDone}
                onChange={(e) => props.onChangeStatusHandler(props.task.id, e)}
                color='primary'
            />


            {/*<span>{t.title}</span>*/}

            <EditableSpan title={props.task.title} onChange={(newValue) => props.onChangeTitleHandler(props.task.id, newValue)}/>
            {/*<EditableSpan title={t.title} editMode={true}/>*/}

            {/*<button onClick={onRemoveHandler}>X*/}
            {/*</button>*/}

            <IconButton onClick={() => props.onRemoveHandler(props.task.id)}>
                <Delete/>
            </IconButton>
        </div>
    );
};

export default Task;