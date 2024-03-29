import {
    addTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

import {TasksStateType, TodolistType} from "../AppWithRedux";
import {tasksReducer} from "./tasks-reducer";


test('ids should be equals', () => {

    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC('new todolist');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistState[0].todolistId;





    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);

})


