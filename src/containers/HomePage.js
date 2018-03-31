import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, populate } from 'react-redux-firebase';
import { withHandlers } from 'recompose';
import { Divider, Grid } from 'semantic-ui-react';
import TodoHeaderBar from '../components/TodoHeaderBar';
import { formulateTodo } from '../actions/todosActions';
import AuthModal from './AuthModal';
import TodosView from '../components/TodosView';

const HomePage = ({ list, auth, addNew }) => (
    <div>
        <TodoHeaderBar handleSubmit={addNew} />
        <Divider hidden/>
        <Grid.Row>
            <TodosView list={list}/>
        </Grid.Row>
        <AuthModal/>
    </div>
);

HomePage.propTypes = {
    list: PropTypes.object,
    addNew: PropTypes.func,
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
        addNew: props => todoData => {
            const todo = formulateTodo(todoData);
            props.firebase.push(`/lists/${props.auth.uid}/items/`, {
                ...formulateTodo(todo),
                owner: props.auth.uid
            });
            props.firebase.uniqueSet(`/lists/${props.auth.uid}/projects/${todo.project}`, true);
        }
    })
)(HomePage)