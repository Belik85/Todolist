import {resolveAny} from "dns";
import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";


// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST',
//     title: string,
//     todolistId: string
// }
//
// export type ChangeTodolistTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE',
//     todolistId: string,
//     title: string
// }
//
// export type ChangeTodolistFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER',
//     todolistId: string,
//     filter: FilterValuesType
// }
//
// export type SetTodolistsActionType = {
//     type: 'SET-TODOLISTS',
//     todolists: Array<TodolistType>
// }


type ActionsTypes =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTileAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>


// type ActionsTypes = |
//     ReturnType<typeof removeTodolistAC>
//     | AddTodolistActionType
//     | ChangeTodolistTitleActionType
//     | ChangeTodolistFilterActionType


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
            }, ...state]
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


// type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id}) as const

// export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId: todolistId}) as const

// export const removeTodolistAC = (todolistId: string) => {
//     return {type: 'REMOVE-TODOLIST', todolistId: todolistId} as const
// }

// export type RemoveTodolistActionType =  {
//     type: 'REMOVE-TODOLIST',
//     todolistId: string
// }
//
// export const removeTodolistAC = (todolistId: string ): RemoveTodolistActionType => {
//     return {type: 'REMOVE-TODOLIST', todolistId: todolistId}
// }

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)

// export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title: title, todolistId: v1()}) as const


export const changeTodolistTileAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)

// export const changeTodolistTileAC = (todolistId: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', todolistId: todolistId, title: title}) as const


export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId: todolistId, filter}
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists}
}