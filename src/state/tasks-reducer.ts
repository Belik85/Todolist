import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}



export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string,
    taskId: string,
    isDone: boolean
}


export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    taskId: string,
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType| ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType;



const initialState: TasksStateType =
    {
        // [todolistId1]: [
        //     {id: v1(), title: 'React', isDone: true},
        //     {id: v1(), title: 'HTML', isDone: false},
        //     {id: v1(), title: 'JS', isDone: true},
        //     {id: v1(), title: 'CSS', isDone: false},
        //     {id: v1(), title: 'Docker', isDone: true},
        //     {id: v1(), title: 'PHP', isDone: false}
        // ],
        // [todolistId2]: [
        //     {id: v1(), title: 'Milk', isDone: true},
        //     {id: v1(), title: 'Beer', isDone: false}
        // ]
    }




export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId )
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy
        }

        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: '4', title: action.title, isDone: false}
            const newTasks = [newTask,...tasks];
            stateCopy[action.todolistId] = newTasks
            return stateCopy
            return {...state}
        }

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if(task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if(task) {
                task.title = action.title
            }
            return stateCopy
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state}

            stateCopy[action.todolistId] = [];

            return stateCopy
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            // throw new Error('I dont understand this')
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}

export const changeTaskStatusAC = (taksId: string, todolistId: string, isDone: boolean): ChangeTaskStatusActionType  => {
    return { type: 'CHANGE-TASK-STATUS', taskId: taksId, todolistId: todolistId, isDone: isDone }
}

export const changeTaskTitleAC = (taksId: string, todolistId: string, title: string): ChangeTaskTitleActionType  => {
    return { type: 'CHANGE-TASK-TITLE', taskId: taksId, todolistId: todolistId, title: title }
}
