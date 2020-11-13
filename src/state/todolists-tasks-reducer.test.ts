import {TasksStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC, todoListsReducer,} from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(idFromTodoLists);
     expect(idFromTasks).toBe(action.todoListID);
     expect(idFromTodoLists).toBe(action.todoListID);
});


