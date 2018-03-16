import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeTodo, toggleTodo } from '../actions/todosActions';
import { Container, List, Segment } from 'semantic-ui-react';

class TodosList extends Component {
    render() {
        const { todos, onRemoveClick, onCheckClick } = this.props;

        const correctIcon = (todo) => {
            if (!todo.isChecked) {
                return (
                    <List.Icon
                        name='circle outline'
                        onClick={() => onCheckClick(todo.id)}
                        link={true}
                    />
                )
            } else {
                return (
                    <List.Icon
                        name='check circle outline'
                        onClick={() => onCheckClick(todo.id)}
                        link={true}
                    />
                )
            }

        };

        const todoElements = () => {
            return todos.map((todo) => {
                return (
                    <List.Item key={todo.id}>
                        <List.Content floated='right'>
                            <List.Icon
                                name='close'
                                onClick={() => onRemoveClick(todo.id)}
                                link={true}
                            />
                        </List.Content>
                        {correctIcon(todo)}
                        <List.Content>
                            <List.Header>{todo.title}</List.Header>
                        </List.Content>
                    </List.Item>
                );
            });
        };

        return (
            <Container>
                <Segment color='red'>
                    <List size='huge' relaxed divided>
                        {todoElements()}
                    </List>
                </Segment>
            </Container>
        )
    }
}

export default connect(
    (store) => {
        return {
            todos: store.todos.todos,
        };
    },
    (dispatch) => {
        return {
            onRemoveClick: (id) => {
                dispatch(removeTodo(id));
            },
            onCheckClick: (id) => {
                dispatch(toggleTodo(id));
            }
        }
    })(TodosList)