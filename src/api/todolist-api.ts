import axios from "axios";


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

export type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
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

    getTodoList() {
        return instance.get<Array<TodoListType>>(`todo-lists`)
    },

    createTodoList(title: string) {
        return instance.post<BaseResponseType<{item: TodoListType}>>(`todo-lists/${title}`)
    },

    updateTodoList(todoListID: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todoListID}`, {title})

    },

    deleteTodoList(todoListID: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todoListID}`)
    },

    getTasks(todoListID: string) {
        return instance.get<Array<GetTaskResponse>>(`todo-lists/${todoListID}/tasks`);
    },


    createTask(todoListID: string, taskTitle: string) {
        return instance.post<BaseResponseType<TaskType>>(`todo-lists/${todoListID}/tasks`);
    },



    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
    },

    updateTask(todoListID: string, taskID: string, title: string) {
        return instance.put<Array<TaskType>>(`/todo-lists/${todoListID}/tasks/${taskID}`, {title})

    }

}
