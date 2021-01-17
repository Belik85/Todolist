import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./state/store";
import {tasksReducer} from "./state/tasks-reducer";
import {todoListsReducer} from "./state/todolists-reducer";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todoListID1", title: "What to learn", filter: "all"},
        {id: "todoListID2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todoListID1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todoListID2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (

    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>
)