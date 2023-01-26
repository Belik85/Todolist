import React, {useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";
import {ChangeEvent} from "react";
import addItemForm from "./AddItemForm";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}

type PropsType = {
    id: string,
    title: string,
    // tasks: Array<TaskType>
    tasks: TaskType[],
    removeTask: (id: string, todolistId: string) => void,
    // removeTask: Function,
    changeFilter: (value: FilterValuesType, todolistId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    filter: FilterValuesType,
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (todolistId: string, newTitle: string) => void

}


const Todolist = (props: PropsType) => {

    // const [newTaskTitle, setNewTaskTitle] = useState('');
    // const [error, setError] = useState<string | null>(null)

    // const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if (e.ctrlKey && e.charCode === 13) {
    //         props.addTask(newTaskTitle, props.id)
    //         setNewTaskTitle('')
    //     }
    // }

    // const addTask = () => {
    //     if (newTaskTitle.trim() !== '') {
    //         props.addTask(newTaskTitle.trim(), props.id)
    //         setNewTaskTitle('')
    //     } else {
    //         setError('Title is Requiared')
    //     }
    //
    // }

    const onAllClickHandler = () => props.changeFilter('All', props.id)

    // const onAllClickHandler = () => {
    //     props.changeFilter('All')
    // }

    const onActiveClickHandler = () => {
        props.changeFilter('Active', props.id)
    }

    const onComplitedClickHandler = () => {
        props.changeFilter('Completed', props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }


    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addItemTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                {/*{props.title}*/}
                {/*<button onClick={removeTodolist}>X</button>*/}
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItemTask}/>
            {/*<AddItemForm id={props.id} addItem={props.addTask}/>*/}
            {/*<div>*/}
            {/*    <input value={newTaskTitle}*/}
            {/*           onChange={onNewTitleChangeHandler}*/}

            {/*// onChange={(e) => {*/}
            {/*//     setNewTaskTitle(e.currentTarget.value);*/}
            {/*// }}*/}

            {/*onKeyPress={onKeyPressHandler}*/}

            {/*// onKeyPress={ (e) => {*/}
            {/*//     if(e.ctrlKey && e.charCode === 13) {*/}
            {/*//         props.addTask(newTaskTitle)*/}
            {/*//         setNewTaskTitle('')*/}
            {/*//     }*/}
            {/*// }}*/}
            {/*//    className={error ? 'error' : ""}*/}
            {/*/>*/}
            {/*// <button onClick={addTask}>+</button>*/}

            {/*<button onClick={() => {*/}
            {/*    props.addTask(newTaskTitle)*/}
            {/*    setNewTaskTitle('')*/}
            {/*}}>+*/}
            {/*</button>*/}
            {/*    {error && <div className='error-message'>{error}</div>}*/}
            {/*</div>*/}

            <div>
                {props.tasks.map((t: TaskType) => {

                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }

                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }


                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>*/}

                        <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>


                        {/*<span>{t.title}</span>*/}

                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        {/*<EditableSpan title={t.title} editMode={true}/>*/}

                        {/*<button onClick={onRemoveHandler}>X*/}
                        {/*</button>*/}

                        <IconButton onClick={onRemoveHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })}

                {/*{props.tasks.map((t: TaskType) => {*/}
                {/*    return <li key={t.id}>*/}
                {/*        <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>*/}
                {/*        <button onClick={() => {*/}
                {/*            props.removeTask(t.id)*/}
                {/*        }}>X*/}
                {/*        </button>*/}
                {/*    </li>*/}
                {/*})}*/}

                {/*<li>*/}
                {/*    <input type="checkbox" checked={props.tasks[1].isDone} /> <span>{props.tasks[1].title}</span>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span>*/}
                {/*</li>*/}
            </div>
        </div>
        <div>
            {/*<button onClick={props.changeFilter('All')}>All</button>*/}
            {/*<button onClick={props.changeFilter('Active')}>Active</button>*/}
            {/*<button onClick={props.changeFilter('Completed')}>Completed</button>*/}

            {/*<button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>*/}

            {/*<Button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllClickHandler}>All</Button>*/}


            <Button variant={props.filter === "All" ? "contained" : "text"}  onClick={onAllClickHandler}>All</Button>

            {/*<button onClick={() => {*/}
            {/*    props.changeFilter('All')*/}
            {/*}}>All*/}
            {/*</button>*/}

            {/*<Button color={"primary"} className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active*/}
            {/*</Button>*/}

            <Button color={"primary"} variant={props.filter === "Active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active
            </Button>

            {/*<button className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active*/}
            {/*</button>*/}

            {/*<button onClick={() => {*/}
            {/*    props.changeFilter('Active')*/}
            {/*}}>Active*/}
            {/*</button>*/}

            {/*<Button color={"secondary"} className={props.filter === "Completed" ? "active-filter" : ""}*/}
            {/*        onClick={onComplitedClickHandler}>Completed*/}
            {/*</Button>*/}

            <Button color={"secondary"} variant={props.filter === "Completed" ? "contained" : "text"}
                    onClick={onComplitedClickHandler}>Completed
            </Button>

            {/*<button className={props.filter === "Completed" ? "active-filter" : ""}*/}
            {/*        onClick={onComplitedClickHandler}>Completed*/}
            {/*</button>*/}

            {/*<button onClick={() => {*/}
            {/*    props.changeFilter('Completed')*/}
            {/*}}>Completed*/}
            {/*</button>*/}

        </div>
    </div>

}


export default Todolist;