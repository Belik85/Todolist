import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodoListActionType} from "./todolists-reducer";
import {RemoveTodoListActionType} from "./todolists-reducer"

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskID: string;
    todoListID: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string

}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS-TASK'
    taskID: string
    isDone: boolean
    todoListID: string

}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE-TASK'
    taskID: string
    title: string
    todoListID: string

}

let initialState: TasksStateType = {
    ['todoListID1']: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: true},
        {id: v1(), title: "Rest API", isDone: true},
        {id: v1(), title: "GraphQL", isDone: true},
    ],
    ['todoListID2']: [
        {id: v1(), title: "Books", isDone: true},
        {id: v1(), title: "Butter", isDone: true},
        {id: v1(), title: "Onion", isDone: true},
        {id: v1(), title: "Beer", isDone: true},
        {id: v1(), title: "Fish", isDone: true},
    ]
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType;


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todoListID] = copyState[action.todoListID].filter(t => t.id != action.taskID);
            //{...state, [action.todoListID]: state[action.todoListID].filter(t => t.id != action.taskID)}
            return copyState
        }

        case  'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todoListID]: [task, ...state[action.todoListID]]}
        }

        // case  'CHANGE-STATUS-TASK': {
        //     let todoListTasks = state[action.todoListID]
        //     let task = todoListTasks.find(t => t.id === action.taskID);
        //     if (task) {
        //         task.isDone = action.isDone;
        //     }
        //     return {...state, [action.todoListID]: todoListTasks}
        // }

        case  'CHANGE-STATUS-TASK': {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskID) return task
                    else return {...task, isDone: action.isDone}
                })
            }
        }

        case  'CHANGE-TITLE-TASK': {
            let todoListTasks = state[action.todoListID]
            let task = todoListTasks.find(t => t.id === action.taskID);
            if (task) {
                task.title = action.title;
            }
            return {...state, [action.todoListID]: todoListTasks}
        }
        case  'ADD-TODOLIST': {
            let id = v1()
            return {...state, [action.todoListID]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state

    }
}


export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: taskID, todoListID: todoListID}
}

export const addTasksAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListID}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS-TASK', taskID, isDone, todoListID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE-TASK', taskID, title, todoListID}
}


