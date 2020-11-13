import {AddTodoListAC, ChangeFilterAC, ChangeTitleAC, RemoveTodoListAC, todoListsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';


let todoListID1: string;
let todoListID2: string;
let startState: Array<TodoListType>

beforeEach(() => {
    todoListID1 = v1();
    todoListID2 = v1();
    startState = [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE' as const,
    //     id: todolistId2,
    //     title: newTodolistTitle
    // };newTodolistTitle

    const endState = todoListsReducer(startState, ChangeTitleAC(todoListID2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER' as const,
    //     id: todolistId2,
    //     filter: newFilter
    // };

    const endState = todoListsReducer(startState, ChangeFilterAC(todoListID2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});













