import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string,
    onChange: (newValue: string) => void
}


// export type EditableSpanPropsType = {
//     title: string,
//     editMode: boolean,
// }

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [changedTitle, setChangedTitle] = useState(props.title)
    // let [changedTitle, setChangedTitle] = useState('')

    const activatedMode = () => {
        setEditMode(true)
        setChangedTitle(props.title)
    }

    const deactivatedMode = () => {
        setEditMode(false)
        props.onChange(changedTitle)
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setChangedTitle(e.currentTarget.value)


    // return editMode ? <input value={changedTitle} onChange={changeTitleHandler} onBlur={deactivatedMode} autoFocus={true}/> :
    //     <span onDoubleClick={activatedMode}>{props.title}</span>

    return editMode ?

        <TextField value={changedTitle} onChange={changeTitleHandler} onBlur={deactivatedMode} autoFocus={true}/> :

        // <input value={props.title} onBlur={deactivatedMode} autoFocus={true}/> :
        <span onDoubleClick={activatedMode}>{props.title}</span>
}