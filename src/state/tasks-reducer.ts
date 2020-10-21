import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";

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

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType;


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
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

        case  'CHANGE-STATUS-TASK': {
            let todoListTasks = state[action.todoListID]
            let task = todoListTasks.find(t => t.id === action.taskID);
            if (task) {
                task.isDone = action.isDone;
            }
            return {...state,[action.todoListID]: todoListTasks }
        }
        default:
            throw new Error("I don't understand this type")

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

