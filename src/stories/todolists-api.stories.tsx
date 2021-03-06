import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todoListAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = todoListAPI.getTodoList()
        promise.then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'NEW TODO'
        const promise = todoListAPI.createTodoList(title)
        promise.then((response) => {
            setState(response.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '312f4a92-da23-40b4-99aa-e202f3deffff'
        const promise = todoListAPI.deleteTodoList(todoListID)
        promise.then((response) => {
            setState(response.data)
        })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '7b0a8cad-ee4e-4270-8380-b392beb7a52f'
        const title = 'ANGULAR'
        const promise = todoListAPI.updateTodoList(todoListID, title)
        promise.then((response) => {
            setState(response.data)
        })
    }, [])

//     return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '7b0a8cad-ee4e-4270-8380-b392beb7a52f';
        const promise = todoListAPI.getTasks(todoListID)
        promise.then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '7b0a8cad-ee4e-4270-8380-b392beb7a52f';
        const taskID = '7b0a8cad-ee4e-4270-8380-b392beb7a52f';
        const promise = todoListAPI.deleteTask(todoListID, taskID)
        promise.then((response) => {
            setState(response.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todoListID, setTodoListID] = useState<string>('')
    useEffect(() => {
        const title = 'NEW TASK'
        const promise = todoListAPI.createTask(todoListID, taskTitle)
        promise.then((response) => {
            setState(response.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

