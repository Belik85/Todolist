import axios from "axios";
import {GetTaskResponse, TaskType} from "./task-api";

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


type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}


export type BaseResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    fieldsErrors: Array<string>,
    data: D
}



// type ResponseDeleteType = {
//     resultCode: number
//     messages: Array<string>,
//     fieldsErrors: Array<string>,
//     data: {}
// }


// type ResponseCreateType = {
//     resultCode: number
//     messages: Array<string>,
//     fieldsErrors: Array<string>,
//     data: {
//         item: TodoListType
//         }
//     }
//
// type ResponseUpdateType = {
//     date: {}
//     fieldsErrors: Array<string>,
//     messages: Array<string>,
//     resultCode: number
// }



export const todoListAPI = {

    updateTodoList(todoListID: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todoListID}`, {title})

    },

    deleteTodoList(todoListID: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todoListID}`)
    },

    createTodoList(title: string) {
        return instance.post<BaseResponseType<{item: TodoListType}>>(`todo-lists/${title}`)
    },

    getTodoList() {
        return instance.get<Array<TodoListType>>(`todo-lists`)
    },


    createTask(todoListID: string, taskTitle: string) {
        return instance.post<BaseResponseType<TaskType>>(`todo-lists/${todoListID}/tasks`);
    },

    getTasks(todoListID: string) {
        return instance.get<Array<GetTaskResponse>>(`todo-lists/${todoListID}/tasks`);
    },

    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    },






}
