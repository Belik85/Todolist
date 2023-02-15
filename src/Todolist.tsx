import React, {useState, KeyboardEvent, useCallback} from 'react';
import {FilterValuesType, TasksStateType} from "./AppWithRedux";
import {ChangeEvent} from "react";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import Task from "./state/Task";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}

type PropsType = {
    id: string,
    title: string,
    changeFilter: (value: FilterValuesType, todolistId: string) => void,
    filter: FilterValuesType,
    removeTodolist: (id: string) => void,
    changeTodolistTitle: (id: string, newTitle: string) => void

    // tasks: Array<TaskType>
    // tasks: TaskType[],
    // removeTask: (id: string, todolistId: string) => void,
    // removeTask: Function,
    // addTask: (title: string, todolistId: string) => void,
    // changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
}


const Todolist = React.memo(function (props: PropsType) {

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])


    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action)
    }

    //
    // const removeTask = (id: string, todolistId: string) => {
    //     const action = removeTaskAC(id, todolistId);
    //     dispatch(action)
    // }


    const addItemTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
        // props.addTask(title, props.id)
    }, [])

    // const addTask = (title: string, todolistId: string) => {
    //     dispatch(addTaskAC(title, todolistId))
    //
    // const action = addTaskAC(title, todolistId);
    //     // disptachToTasksReducer(action)
    // }


    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(id, todolistId, isDone);
        dispatch(action)
    }


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


    let tasksForTodolist = tasks;

    if (props.filter === 'Completed') {
        tasksForTodolist = tasks.filter((t) => {
            return t.isDone === true
        })
    }
    if (props.filter === 'Active') {
        tasksForTodolist = tasks.filter((t) => {
            return t.isDone === false
        })
    }


    // let allTodolistTasks = tasks;
    // let tasksForTodolist = allTodolistTasks;
    //
    // if (props.filter === 'Completed') {
    //     tasksForTodolist = allTodolistTasks.filter((t) => {
    //         return t.isDone === true
    //     })
    // }
    // if (props.filter === 'Active') {
    //     tasksForTodolist = allTodolistTasks.filter((t) => {
    //         return t.isDone === false
    //     })
    // }


    const onRemoveHandler = useCallback(function (id: string) {
        dispatch(removeTaskAC(id, props.id))
        // props.removeTask(t.id, props.id)
    }, [])

    // const onRemoveHandler = () => {
    //     dispatch(removeTaskAC(t.id, props.id));
    //     // props.removeTask(t.id, props.id)
    // }

    const onChangeStatusHandler = useCallback((id: string, e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(id, props.id, newIsDoneValue));
        // props.changeTaskStatus(t.id, newIsDoneValue, props.id)
        // props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
    }, [])


    const onChangeTitleHandler = useCallback((id: string, newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, props.id));
        // props.changeTaskTitle(t.id, newValue, props.id)
    }, [])

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

                {tasksForTodolist.map((t: TaskType) => {
                    // {props.tasks.map((t: TaskType) => {


                    // перенесли на верхний уровень при этом создав компонент Tasks и отрисовав его здесь

                    // const onRemoveHandler = useCallback(function () {
                    //     dispatch(removeTaskAC(t.id, props.id))
                    //     // props.removeTask(t.id, props.id)
                    // }, [])

                    // const onRemoveHandler = () => {
                    //     dispatch(removeTaskAC(t.id, props.id));
                    //     // props.removeTask(t.id, props.id)
                    // }

                    // перенесли на верхний уровень при этом создав компонент Tasks и отрисовав его здесь

                    // const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
                    //     let newIsDoneValue = e.currentTarget.checked;
                    //     dispatch(changeTaskStatusAC(t.id, props.id, newIsDoneValue));

                    //     // props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                    //     // props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    // }, [])

                    // перенесли на верхний уровень при этом создав компонент Tasks и отрисовав его здесь

                    // const onChangeTitleHandler = useCallback((newValue: string) => {
                    //     dispatch(changeTaskTitleAC(t.id, newValue, props.id));
                    //     // props.changeTaskTitle(t.id, newValue, props.id)
                    // }, [])


                    return <Task
                        key={t.id}
                        task={t}
                        onRemoveHandler={onRemoveHandler}
                        onChangeStatusHandler={onChangeStatusHandler}
                        onChangeTitleHandler={onChangeTitleHandler}
                    />


                   // return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                   //      {/*<input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>*/}
                   //
                   //      <Checkbox
                   //          checked={t.isDone}
                   //          onChange={onChangeStatusHandler}
                   //          color='primary'
                   //      />
                   //
                   //
                   //      {/*<span>{t.title}</span>*/}
                   //
                   //      <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                   //      {/*<EditableSpan title={t.title} editMode={true}/>*/}
                   //
                   //      {/*<button onClick={onRemoveHandler}>X*/}
                   //      {/*</button>*/}
                   //
                   //      <IconButton onClick={onRemoveHandler}>
                   //          <Delete/>
                   //      </IconButton>
                   //  </div>
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


            <Button variant={props.filter === "All" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>

            {/*<button onClick={() => {*/}
            {/*    props.changeFilter('All')*/}
            {/*}}>All*/}
            {/*</button>*/}

            {/*<Button color={"primary"} className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active*/}
            {/*</Button>*/}

            <Button color={"primary"} variant={props.filter === "Active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
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

})


export default Todolist;