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
import SignupModal from './AuthModal';

const HomePage = ({ list, auth, addNew }) => (
    <div>
        <HeaderBar handleSubmit={addNew} />
        <Divider hidden/>
        <Grid.Row>
            <TodosList list={list} uid={auth.uid} />
        </Grid.Row>
        <SignupModal/>
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
    connect(({ firebase, firebase: { auth } }) => ({
        auth: auth,
    })),
    firebaseConnect((props) => ([
        {
            path: `/lists/${props.auth.uid}`,
            queryParams: ['orderByKey']
        }
    ])),
    connect(({ firebase, firebase: { auth } }) => ({
        list: populate(firebase, `/lists/${auth.uid}`, {})
    })),
    withHandlers({
        addNew: props => newTodo => {
            props.firebase.push(`/lists/${props.auth.uid}`, {
                ...formulateTodo(newTodo),
                owner: props.auth.uid
            })
        }
    })
)(HomePage)