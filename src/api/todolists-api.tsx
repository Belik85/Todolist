import React, {useEffect, useState} from 'react';
import axios from "axios";
import {settings, todolistsAPI} from './settings-api'

export default {
    title: 'API',
}


export const GETTODOLISTS = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        // let promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'Yoyo'}, settings)
        todolistsAPI.createTodolist('bla bla')
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '6ef200c7-eb06-476f-9b93-65eeeb50af16';
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                debugger;
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '1b4dc3ac-8c4b-452e-b66e-e52081148d6c'
        todolistsAPI.updateTodolist(todolistId, 'alalalla')
            .then((res) => {
                debugger;
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    // useEffect(() => {
    //     const todolistId = '6ef200c7-eb06-476f-9b93-65eeeb50af16';
    //     todolistsAPI.getTasks(todolistId)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    //
    // }, [])

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }


    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}

export const deleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')


    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }


    // useEffect(() => {
    //     const todolistId = '6ef200c7-eb06-476f-9b93-65eeeb50af16';
    //     const taskId = '3bf34d23-bf37-463b-94c8-aa7232f8cbc2';
    //     todolistsAPI.deleteTask(todolistId, taskId)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    //
    // }, [])


    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId((e.currentTarget.value))
            }}/>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}

export const createTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')


    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)

            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {
                setTaskTitle((e.currentTarget.value))
            }}/>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>Create task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadLine, setDeadline] = useState<string>('')

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')


    const createTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadLine: 'null',
            description: description,
            priority: priority,
            startDate: 'null',
            status: status,
            title: title,


        })

            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId((e.currentTarget.value))}}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId((e.currentTarget.value))}}/>
            <input placeholder={'Task title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <input placeholder={'Description'} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
            <input placeholder={'status'} value={status} type = 'number' onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
            <input placeholder={'priority'} value={priority} type  = 'number' onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
            <button onClick={createTask}>Update task</button>
        </div>
    </div>
}