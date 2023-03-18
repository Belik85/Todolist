import {resolveAny} from "dns";
import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: string,
    title: string
}


export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: string,
    filter: FilterValuesType
}


type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


// export let todolistId1 = v1();
// export let todolistId2 = v1();

const initialState: Array<TodolistType> = [
        // {id: todolistId1, title: "What to learn", filter: "Completed"},
        // {id: todolistId2, title: "What to Buy", filter: "Active"},
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.todolistId !== action.todolistId)
        }

        case 'ADD-TODOLIST': {
            return [{
                todolistId: action.todolistId,
                title: action.title,
                filter: "All",
            }, ...state ]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.todolistId === action.todolistId);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.todolistId === action.todolistId);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }

        default:
            // throw new Error('I dont understand this')
            return state
    }
}

export const removeTodolistAC = (todolistId: string ): RemoveTodolistActionType => {
 return {type: 'REMOVE-TODOLIST', todolistId: todolistId}
}

export const addTodolistAC = (title: string ): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const changeTodolistTileAC = (todolistId: string, title: string ): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId: todolistId, title: title}
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType ): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId: todolistId, filter}
}