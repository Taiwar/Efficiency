import React from 'react';
import { List } from 'semantic-ui-react';

const TodoItem = ({ todo, id, onCompleteClick, onDeleteClick }) => (
    <List.Item className={todo.isDone ? 'greyedOut' : ''}>
        <List.Content floated='right'>
            <List.Icon
                name='close'
                onClick={() => onDeleteClick(todo, id)}
                link={true}
            />
        </List.Content>
        {
            todo.isDone
                ? <List.Icon
                    name='check circle outline'
                    onClick={() => onCompleteClick(todo, id)}
                    link={true}
                />
                : <List.Icon
                    name='circle outline'
                    onClick={() => onCompleteClick(todo, id)}
                    link={true}
                />
        }
        <List.Content>
            <List.Header>{todo.title}</List.Header>
        </List.Content>
    </List.Item>
);

export default TodoItem;