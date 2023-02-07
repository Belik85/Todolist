import {FilterValuesType, TasksStateType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    id: string
}



export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string,
    id: string,
    isDone: boolean,
}


export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    id: string,
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType| ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType;



const initialState: TasksStateType =
    {
        [todolistId1]: [
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'Docker', isDone: true},
            {id: v1(), title: 'PHP', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Beer', isDone: false}
        ]
    }




export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.id )
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
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)

            //при таком условии через раз не срабатывает
            // const task = tasks.find(t => t.id === action.id)
            // if(task) {
            //     task.isDone = action.isDone
            // }
            return stateCopy
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(t => t.id === action.id)
            if(task) {
                task.title = action.title
            }
            return stateCopy
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state}

            stateCopy[action.id] = [];

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

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, id: id}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}

export const changeTaskStatusAC = (id: string, todolistId: string, isDone: boolean): ChangeTaskStatusActionType  => {
    return { type: 'CHANGE-TASK-STATUS',id: id, todolistId: todolistId, isDone: isDone }
}

export const changeTaskTitleAC = (id: string, todolistId: string, title: string): ChangeTaskTitleActionType  => {
    return { type: 'CHANGE-TASK-TITLE', id: id, todolistId: todolistId, title: title }
}
