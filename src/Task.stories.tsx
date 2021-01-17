import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import AddItemForm, {AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";



export default {
    title: 'Todolists/Task',
    component: Task,
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const onChangeHandler = action("Change status clicked")
const changeTaskTitle = action("Change task title clicked")
const removeTask = action("Delete task clicked")

const baseArg = {
    onChangeHandler: onChangeHandler,
    changeTaskTitle: changeTaskTitle,
    removeTask: removeTask
}


export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    ...baseArg,
    task: {id: '1', isDone: true, title: 'HTML'},
    todoListID: '1'
};

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    ...baseArg,
    task: {id: '2', isDone: false, title: 'JS'},
    todoListID: '2'
};
