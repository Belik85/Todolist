import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TaskType} from "../Todolist";


export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6dc45d45-8ab0-415a-b3f8-cefa67a44397'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings,
})


export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}


export type CreateResponseTodolistType = {
    resultCode: number,
    messages: Array<string>,
    data: {
        item: TodolistType
    }
}


export type DeleteUpdateTodolistResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}


export type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D
}

// export type ResponseType<D> = {
//     resultCode: number,
//     messages: Array<string>,
//     data: D
// }


export type TaskResponseType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,


}


export type GetTasksResponse = {
    error: string | null,
    totalCount: number,
    items: TaskResponseType[]

}

export type UpdateTaskModelType = {
    title: string,
    description: string,
    status: number,
    priority: number,
    startDate: string,
    deadLine:  string,
}

export const todolistsAPI = {
    // getTodolists() {
    //     const promise = axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    //     return promise;
    // },

    getTodolists() {
        const promise = instance.get<TodolistType[]>('todo-lists')
        return promise;
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})

    },

    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)

    },

    // deleteTodolist(id: string) {
    //     return  instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
    //
    // },

    updateTodolist(id: string, title: string) {
        let promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
        return promise
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)

    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}