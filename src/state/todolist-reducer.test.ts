import {
    addTodolistAC, changeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    changeTodolistTileAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../AppWithRedux";


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    // const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    let newTodolistTitle = 'New Todolist';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    // const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('All');
    expect(endState[0].id).toBeDefined();
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    let newTodolistTitle = 'New Todolist';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action = changeTodolistTileAC(todolistId2, newTodolistTitle)


    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE' as const,
    //     id: todolistId2,
    //     title: newTodolistTitle
    // }


    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
})

test('correct filter should be in todolist ', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    let newFilter: FilterValuesType = 'Completed';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action =  changeTodolistFilterAC(todolistId2, newFilter)


    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER' as const,
    //         id: todolistId2,
    //         filter: newFilter
    // }



    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
})

