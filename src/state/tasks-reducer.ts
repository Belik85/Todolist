import {TasksStateType} from "../AppWithRedux";

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
    isDone: boolean,
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

        }

        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t );

            return ({...state});

            // const stateCopy = {...state};
            // const tasks = stateCopy[action.todolistId]
            // stateCopy[action.todolistId] = tasks.map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)
            //
            //
            //
            // stateCopy[action.todolistId] = [...tasks]
            // return ({...stateCopy})
        }


        case 'CHANGE-TASK-TITLE': {

            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t );

            return ({...state});



            // const stateCopy = {...state};
            // const tasks = stateCopy[action.todolistId]
            // const task = tasks.find(t => t.id === action.id)
            // if(task) {
            //     task.title = action.title
            // }
            // stateCopy[action.todolistId] = [...tasks]
            // return ({...stateCopy})
            // return stateCopy
        }

        case "ADD-TODOLIST": {
           return {
               ...state,
               [action.id]: []
           }


            // const stateCopy = {...state}
            //
            // stateCopy[action.id] = [];
            //
            // return stateCopy
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
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string ): ChangeTaskStatusActionType  => {
    return { type: 'CHANGE-TASK-STATUS',taskId: taskId, isDone: isDone, todolistId: todolistId  }
}

export const changeTaskTitleAC = (taskId: string, todolistId: string, newValue: string): ChangeTaskTitleActionType  => {
    return { type: 'CHANGE-TASK-TITLE', taskId: taskId, todolistId: todolistId, title: newValue }
}
