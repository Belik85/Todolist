import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

function AddItemForm() {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError( null);
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.key === 'Enter') { addTask()}}

    return (
           <div>
               <input value={title}
                      onChange={onChangeHandler}
                      onKeyPress={onKeyPressHandler}
                      className={error ? "error" : ""}
               />
               <button onClick={addTask}>+</button>
               {error && <div className="error-message">{error}</div>}
           </div>
       )

};

export default AddItemForm