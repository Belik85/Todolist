import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistType} from "../AppWithRedux";
import thunkMiddleware from "redux-thunk";




const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})



// type AppRootState = {
//     todolists: Array<TodolistType>
//     tasks: TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;