import React from 'react';
import Reactotron from 'reactotron-react-js'
import { compose } from 'redux';
import PropTypes from 'prop-types'
import { firebaseConnect, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { Divider, Grid } from 'semantic-ui-react'
import HeaderBar from '../components/HeaderBar';
import TodosList from './TodosList';
import { formulateTodo } from '../actions/todosActions';

const HomePage = ({ todos, auth, addNew }) => (
    <div>
        <HeaderBar handleSubmit={addNew} />
        <Divider hidden/>
        <Grid.Row>
            <TodosList todos={todos} uid={auth.uid} />
        </Grid.Row>
    </div>
);

HomePage.propTypes = {
    todos: PropTypes.oneOfType([
        PropTypes.object, // object if using firebase.data
        PropTypes.array // array if using firebase.ordered
    ]),
    addNew: PropTypes.func.isRequired,
    uid: PropTypes.string,
    username: PropTypes.string
};

export default compose(
    firebaseConnect([
        {
            path: 'todos',
            queryParams: ['orderByKey']
        }
    ]),
    connect(({ firebase, firebase: { auth } }) => ({
        auth: auth,
        todos: populate(firebase, 'todos', {})
    })),
    withHandlers({
        addNew: props => newTodo => {
            props.firebase.push('todos', {
                ...formulateTodo(newTodo),
                owner: props.auth.uid || 'Anonymous'
            })
        }
    })
)(HomePage)