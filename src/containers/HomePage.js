import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { firebaseConnect, populate } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { Divider, Grid } from 'semantic-ui-react';
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
        PropTypes.object,
        PropTypes.array
    ]),
    addNew: PropTypes.func.isRequired,
    auth: PropTypes.object,
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