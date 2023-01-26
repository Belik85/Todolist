import {v1} from "uuid";
import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";
import {useState} from "react";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be deleted from todolist', () => {


    const startState: TasksStateType= {
        'todolistId1': [
            {id: '1', title: 'React', isDone: true},
            {id: '2', title: 'HTML', isDone: false},
            {id: '3', title: 'JS', isDone: true},

        ],
        'todolistId2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Beer', isDone: false},
            {id: '3', title: 'CSS', isDone: false},

        ]
    }


  const action = removeTaskAC('2','todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();

    // expect(endState['todolistId2'][0].id).toBe(1);
    // expect(endState['todolistId2'][1].id).toBe(3);
})

test('correct task should be added in todolist', () => {


    const startState: TasksStateType= {
        'todolistId1': [
            {id: '1', title: 'React', isDone: true},
            {id: '2', title: 'HTML', isDone: false},
            {id: '3', title: 'JS', isDone: true},

        ],
        'todolistId2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Beer', isDone: false},
            {id: '3', title: 'CSS', isDone: false},

        ]
    }


    const action = addTaskAC('sex','todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('sex');
    expect(endState['todolistId2'][0].isDone).toBe(false);

    // expect(endState['todolistId2'][0].id).toBe(1);
    // expect(endState['todolistId2'][1].id).toBe(3);
})




test('status of spiecified task should be changed', () => {


    const startState: TasksStateType= {
        'todolistId1': [
            {id: '1', title: 'React', isDone: true},
            {id: '2', title: 'HTML', isDone: true},
            {id: '3', title: 'JS', isDone: true},

        ],
        'todolistId2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Beer', isDone: true},
            {id: '3', title: 'CSS', isDone: false},

        ]
    }


    const action = changeTaskStatusAC('2','todolistId2', false );

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false);
    expect(endState['todolistId1'][1].isDone).toBe(true);


})

test('title of spiecified task should be changed', () => {


    const startState: TasksStateType= {
        'todolistId1': [
            {id: '1', title: 'React', isDone: true},
            {id: '2', title: 'HTML', isDone: false},
            {id: '3', title: 'JS', isDone: true},

        ],
        'todolistId2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Beer', isDone: false},
            {id: '3', title: 'CSS', isDone: false},

        ]
    }


    const action = changeTaskTitleAC('2','todolistId2', 'Milkiway' );

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Milkiway');
    expect(endState['todolistId1'][1].title).toBe('HTML');


})



test('new property with new arrayshould be added when new todolist added', () => {


    const startState: TasksStateType= {
        'todolistId1': [
            {id: '1', title: 'React', isDone: true},
            {id: '2', title: 'HTML', isDone: false},
            {id: '3', title: 'JS', isDone: true},

        ],
        'todolistId2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Beer', isDone: false},
            {id: '3', title: 'CSS', isDone: false},

        ]
    }


    const action = addTodolistAC('title no matter' );

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if(!newKey) {
        throw Error('new key shoul be added')
    }



    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);


})


test('property with todolistId should be deleted', () => {


    const startState: TasksStateType= {
        'todolistId1': [
            {id: '1', title: 'React', isDone: true},
            {id: '2', title: 'HTML', isDone: false},
            {id: '3', title: 'JS', isDone: true},

        ],
        'todolistId2': [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Beer', isDone: false},
            {id: '3', title: 'CSS', isDone: false},

        ]
    }


    const action = removeTodolistAC('todolistId2');

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();


})


