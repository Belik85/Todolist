import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {ServerTodoListType} from "../api/todolist-api";

type ActionType = GetTodolistsActionType
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTitleActionType
    | ChangeFilterActionType

export type TodolistDomainType = ServerTodoListType & {
    filter: FilterValuesType
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string

}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    newTodolist: ServerTodoListType

}

type ChangeTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

let initialState: Array<TodolistDomainType> = []


export const todoListsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'GET-TODOS':
            return action.todos.map((tl: ServerTodoListType) => {
                return {...tl, filter: 'all'}
            })


        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case  'ADD-TODOLIST':
            const newTodoList: TodolistDomainType = {
               ...action.newTodolist,
                filter: 'all'
            }
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            const nextState = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl;
            })
            return nextState;

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl;
            })


        default:
            return state
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListID}
}

export const AddTodoListAC = (newTodolist: ServerTodoListType): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', newTodolist}
}

export const ChangeTitleAC = (todoListID: string, title: string): ChangeTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListID, title: title}
}

export const ChangeFilterAC = (todoListID: string, filter: FilterValuesType): ChangeFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoListID, filter: filter}
}

export const getTodolistAC = (todos: Array<ServerTodoListType>): GetTodolistsActionType => {
    return {
        type: "GET-TODOS",
        todos
    }
}

export type GetTodolistsActionType = {
    type: "GET-TODOS",
    todos: Array<ServerTodoListType>
}