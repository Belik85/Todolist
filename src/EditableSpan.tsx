import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    value: string,
    onChange: (newValue: string) => void
}

export  const EditableSpan = React.memo(function(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [changedTitle, setChangedTitle] = useState(props.value)

    const activatedMode = () => {
        setEditMode(true)
        setChangedTitle(props.value)
    }

    const deactivatedMode = () => {
        setEditMode(false)
        props.onChange(changedTitle)
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setChangedTitle(e.currentTarget.value)

    return editMode ?

        <TextField value={changedTitle} onChange={changeTitleHandler} onBlur={deactivatedMode} autoFocus={true}/> :
        <span onDoubleClick={activatedMode}>{props.value}</span>
})