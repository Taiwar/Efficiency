import React, { Component } from 'react';
import { Container, List, Segment } from 'semantic-ui-react';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import PropTypes from 'prop-types'
import Reactotron from 'reactotron-react-js'
import { isLoaded, withFirebase } from 'react-redux-firebase';
import { map } from 'lodash';
import TodoItem from '../components/TodoItem';

class TodosList extends Component {
    render() {
        const { todos, toggleDone, deleteTodo } = this.props;

        const todoElements = !isLoaded()
            ? 'Loading'
            : () => {
                return  map(todos, (todo, id) => (
                    <TodoItem
                        key={id}
                        id={id}
                        todo={todo}
                        onCompleteClick={toggleDone}
                        onDeleteClick={deleteTodo}
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
    firebase: PropTypes.object
};

export default compose(
    withFirebase,
    withHandlers({
        toggleDone: props => (todo, id) => {
            const { firebase, auth } = props;
            /*if (!auth || !auth.uid) {
                return Reactotron.log('You must be Logged in to toggleDone')
            }*/
            return firebase.set(`todos/${id}/isDone`, !todo.isDone)
        },
        deleteTodo: props => (todo, id) =>  {
            const { todos, auth, firebase } = props;
            /* if (!auth || !auth.uid || todos[id].owner !== auth.uid) {
                return Reactotron.log('You must own todo to edit')
            }*/
            return firebase.remove(`todos/${id}`).catch(err => {
                // TODO: Have error caught by epic
                Reactotron.error('Error removing todo: ', err);
                return Promise.reject(err)
            })
        }
    })
)(TodosList)