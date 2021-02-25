import React, {useEffect, useState} from 'react'
import {todoListAPI} from "../api/todolist-api";
import {taskAPI} from "../api/task-api";

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '7b0a8cad-ee4e-4270-8380-b392beb7a52f';
        const promise = todoListAPI.getTasks(todoListID)
        promise.then((response) => {
            setState(response.data)
        })

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

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

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

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

        // const promise = axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title: 'React'}, {
        //     withCredentials: true,
        //     headers: {
        //        'API-KEY': 'fbadfa7a-bd2f-4639-8596-3562161f400d'
        //     }
        // })
        // promise.then((res) => {
        //     setState(res.data.data.item)
        // })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}