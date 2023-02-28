import React, {useCallback} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./state/Task";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void,
    changeFilter: (value: FilterValuesType, todolistId: string) => void,
    removeTask: (taskId: string, todolistId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void,

    filter: FilterValuesType,
    removeTodolist: (id: string) => void,
    changeTodolistTitle: (id: string, newTitle: string) => void
}


const Todolist = React.memo(function (props: PropsType) {

    const addItemTask = useCallback((title: string) => {
        props.addTask(title, props.id)
        // props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    },[props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('All', props.id), [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('Active', props.id)
    }, [props.changeFilter, props.id])

    const onComplitedClickHandler = useCallback(() => {
        props.changeFilter('Completed', props.id)
    }, [props.changeFilter, props.id])



    let tasksForTodolist = props.tasks;

    if (props.filter === 'Active') {
        tasksForTodolist = props.tasks.filter((t) => {
            return t.isDone === false
        })
    }

    if (props.filter === 'Completed') {
        tasksForTodolist = props.tasks.filter((t) => {
            return t.isDone === true
        })
    }


    return <div>
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItemTask}/>
            <div>

                {props.tasks.map(t => <Task
                        key={t.id}
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.id}

                    />

                )}


            </div>
        </div>
        <div style={{paddingTop: '10px'}}>

            <Button variant={props.filter === "All" ? "contained" : "text"} onClick={onAllClickHandler} color={'default'}>All</Button>

            <Button color={"primary"} variant={props.filter === "Active" ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>

            <Button color={"secondary"} variant={props.filter === "Completed" ? "contained" : "text"}
                    onClick={onComplitedClickHandler}>Completed
            </Button>

        </div>
    </div>

})


export default Todolist;