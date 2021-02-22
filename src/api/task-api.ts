import axios from "axios";
import {BaseResponseType, todoListAPI} from "../api/todolist-api";

const settings = {
    baseURL:"https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': 'fbadfa7a-bd2f-4639-8596-3562161f400d'
    }
}


const instance = axios.create({
        ...settings
    }
)

type CreateTaskType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
}

export const taskAPI = {

    updateTask(todoListID: string, taskID: string, title: string) {
        return instance.put<BaseResponseType>(`/todo-lists/${todoListID}/tasks/${taskID}`, {title})

    },

    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    },

    createTask(todoListID: string, taskTitle: string) {
        return instance.post<BaseResponseType>(`todo-lists/${todoListID}/tasks`)
    },

    getTasks() {
        return instance.get<Array<TodoListType>>(`todo-lists/${todoListID}/tasks`)
    },


}