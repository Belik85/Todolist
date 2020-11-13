import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodoListActionType | AddTodoListActionType
    | ChangeTitleActionType | ChangeFilterActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string

}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
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

let initialState: Array<TodoListType> = [
    {id: 'todoListID1', title: "What to learn", filter: "all"},
    {id: 'todoListID2', title: "What to buy", filter: "all"}

]


export const todoListsReducer = (state= initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case  'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListID,
                title: action.title,
                filter: "all"
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
    return { type: 'REMOVE-TODOLIST', id: todoListID }
}

export const AddTodoListAC = (title: string) :AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: title, todoListID: v1() }
}

export const ChangeTitleAC = (todoListID: string, title: string) :ChangeTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todoListID, title: title }
}

export const ChangeFilterAC = (todoListID: string, filter: FilterValuesType) :ChangeFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todoListID, filter: filter }
}