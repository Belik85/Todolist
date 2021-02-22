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

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

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

    return <div> {JSON.stringify(state)}</div>
}
