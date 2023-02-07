import {resolveAny} from "dns";
import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";

// type ActionType = {
//     type: string,
//     [key: string]: any,
// }

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    id: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}


export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}


type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "Completed"},
        {id: todolistId2, title: "What to Buy", filter: "Active"},
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [{
                id: action.id,
                title: action.title,
                filter: "All",
            }, ...state ]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
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

export const removeTodolistAC = (id: string ): RemoveTodolistActionType => {
 return {type: 'REMOVE-TODOLIST', id: id}
}

export const addTodolistAC = (title: string ): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, id: v1()}
}

export const changeTodolistTileAC = (id: string, title: string ): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType ): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter}
}