import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTileAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../AppWithRedux";



let todolistId1: string
let todolistId2: string

let startState: Array<TodolistDomainType> = []


beforeEach(() =>{
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {todolistId: todolistId1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
        {todolistId: todolistId2, title: 'What to buy', filter: 'All', addedDate: '', order: 0}
    ]

})

test('correct todolist should be removed', () => {

    // const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].todolistId).toBe(todolistId2);

})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist';

    // const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('All');
    expect(endState[0].todolistId).toBeDefined();
})

test('correct todolist should be change its name', () => {

    let newTodolistTitle = 'New Todolist';

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


test('correct filter of todolist should be changed ', () => {

    let newFilter: FilterValuesType = 'Completed';

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




test('todolists should be set to the state ', () => {

  const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2);

})

