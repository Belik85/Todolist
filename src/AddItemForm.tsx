import Button from "@material-ui/core/Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type addItemFormPropsType = {
    addItem: (title: string) => void,

    // addItem: (title: string, todolistId: string) => void,
    // id: string
}

function AddItemForm(props: addItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       // условие для оптимизации рендеринга
        if (error !== null) {
           setError(null)
       }
        // setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addItem(newTaskTitle)
            // props.addItem(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            // props.addItem(newTaskTitle.trim(), props.id)
            setNewTaskTitle('')
        } else {
            setError('Title is Requiared')
        }

    }

    return <div>
        {/*<input value={newTaskTitle}*/}
        {/*       onChange={onNewTitleChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? 'error' : ""}*/}
        {/*/>*/}


        <TextField value={newTaskTitle}
                   variant={"outlined"}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
            // className={error ? 'error' : ""}


                   label={'Type something'}
                   error={!!error}
                   helperText={error}

        />
        {/*<Button onClick={addTask} variant={"contained"} color={"primary"}>+</Button>*/}

        <IconButton onClick={addTask} color={"primary"}>
            <ControlPoint/>
        </IconButton>

        {/*{error && <div className='error-message'>{error}</div>}*/}


        {/*<button onClick={addTask}>+</button>*/}

    </div>
}

export default AddItemForm