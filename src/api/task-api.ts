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

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}





export const taskAPI = {

    updateTask(todoListID: string, taskID: string, title: string) {
        return instance.put<Array<TaskType>>(`/todo-lists/${todoListID}/tasks/${taskID}`, {title})

    },

    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    },

    createTask(todoListID: string, taskTitle: string) {
        return instance.post<BaseResponseType>(`todo-lists/${todoListID}/tasks`)
    },

    getTasks(todoListID: string) {
        return instance.get<Array<TaskType>>(`todo-lists/${todoListID}/tasks`)
    },


}