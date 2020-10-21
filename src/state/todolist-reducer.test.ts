import {AddTodoListAC, ChangeFilterAC, ChangeTitleAC, RemoveTodoListAC, todolistReducer} from './todolist-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

test('correct todolist should be removed', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, RemoveTodoListAC(todoListID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID2);
});

test('correct todolist should be added', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE' as const,
    //     id: todolistId2,
    //     title: newTodolistTitle
    // };

    const endState = todolistReducer(startState, ChangeTitleAC(todoListID2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER' as const,
    //     id: todolistId2,
    //     filter: newFilter
    // };

    const endState = todolistReducer(startState, ChangeFilterAC(todoListID2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



