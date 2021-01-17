import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import AddItemForm, {AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import EditableSpan, {EditableSpanPropsType} from "./EditableSpan";



export default {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    argTypes: {
        backgroundColor: {control: 'color'},
        changeValue: {
            description: "EditableSpan clicked",
        },
        value: {
            defaultValue: "Belik"
        }
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    changeValue: action("EditableSpan clicked"),
};

