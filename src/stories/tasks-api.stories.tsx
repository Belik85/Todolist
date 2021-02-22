import React, {useEffect, useState} from 'react'
import {todoListAPI} from "../api/todolist-api";



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