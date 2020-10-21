import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
//eslint-disable-next-line
import { Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}


function AddItemForm(props: AddItemFormPropsType) {

    const addItem = props.addItem;

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError( null);
        setTitle(e.currentTarget.value);
    };

    const onAddTaskClick = () => {
        if (title.trim()) {
            addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }




    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.key === 'Enter') { onAddTaskClick()}
    }

    return (
           <div>
               {/*<input value={title}*/}
               {/*       onChange={onChangeHandler}*/}
               {/*       onKeyPress={onKeyPressHandler}*/}
               {/*       className={error ? "error" : ""}*/}
               {/*/>*/}
               <TextField
                   variant={"outlined"}
                   value={title}
                   error={!!error}
                   label={"Title"}
                   helperText={error}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}

               />

               {/*<button onClick={ onAddTaskClick }>+</button>*/}
               {/*<Button onClick={ onAddTaskClick } variant={"contained"} color={"primary"}>+</Button>*/}
               <IconButton onClick={ onAddTaskClick } color={"primary"}>
                   <AddBox/>

               </IconButton>

               {/*{error && <div className="error-message">{error}</div>}*/}
           </div>
       )

};

export default AddItemForm;