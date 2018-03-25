import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Container, List, Segment } from 'semantic-ui-react';
import { withHandlers } from 'recompose';
import Reactotron from 'reactotron-react-js'
import { isLoaded, withFirebase } from 'react-redux-firebase';
import { map } from 'lodash';
import TodoItem from '../components/TodoItem';

class TodosList extends Component {
    render() {
        const { list, toggleDone, deleteTodo, editTodo } = this.props;

        const todoElements = !isLoaded()
            ? 'Loading'
            : () => {
                return  map(list, (todo, id) => (
                    <TodoItem
                        key={id}
                        id={id}
                        todo={todo}
                        onCompleteClick={toggleDone}
                        onDeleteClick={deleteTodo}
                        onEditTodo={editTodo}
                    />
                ));
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

TodosList.propTypes = {
    todos: PropTypes.object,
    toggleDone: PropTypes.func,
    deleteTodo: PropTypes.func,
    editTodo: PropTypes.func
};

export default compose(
    withFirebase,
    connect(({ firebase, firebase: { auth } }) => ({
        auth: auth,
    })),
    withHandlers({
        toggleDone: props => (todo, id) => {
            const { firebase, auth } = props;
            return firebase.set(`/lists/${auth.uid}/${id}/isDone`, !todo.isDone)
        },
        deleteTodo: props => (todo, id) =>  {
            const { auth, firebase } = props;
            return firebase.remove(`/lists/${auth.uid}/${id}`).catch(err => {
                Reactotron.error('Error removing todo: ', err);
                return Promise.reject(err)
            })
        },
        editTodo: props => (todo, id, title) => {
            const { firebase, auth } = props;
            return firebase.set(`/lists/${auth.uid}/${id}/title`, title)
        },
    })
)(TodosList)