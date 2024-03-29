import {resolveAny} from "dns";
import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistsAPI} from "../api/settings-api";


// export type RemoveTodolistsActionType = {}

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


type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTileAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>


// type ActionsTypes = |
//    RemoveTodolistsActionType
//     | AddTodolistActionType
//     | ChangeTodolistTitleActionType
//     | ChangeTodolistFilterActionType
//     | SetTodolistsActionType


// export let todolistId1 = v1();
// export let todolistId2 = v1();


export type FilterValuesType = 'All' | 'Active' | 'Completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


const initialState: Array<TodolistDomainType> = [
    // {id: todolistId1, title: "What to learn", filter: "Completed"},
    // {id: todolistId2, title: "What to Buy", filter: "Active"},
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.todolistId !== action.id)
        }

        case 'ADD-TODOLIST': {

            const newTodolist: TodolistType = {
                ...action.todolist,
                filter: "All"
            }
            return [newTodolist, ...state]
        }


        // case 'ADD-TODOLIST': {
        //     return [{
        //         todolistId: action.todolistId,
        //         title: action.title,
        //         filter: "All",
        //     }, ...state]
        // }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.todolistId === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.todolistId === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }

        case 'SET-TODOLISTS' : {
            return action.todolists.map(tl => ({
                ...tl,
                filter: "All"

            }))
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


export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)


// export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
//     return {type: 'CHANGE-TODOLIST-FILTER', todolistId: todolistId, filter}
// }


export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)


// export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
//     return {type: 'SET-TODOLISTS', todolists}
// }


export const fetchTodolitstsThunk = (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then ((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}