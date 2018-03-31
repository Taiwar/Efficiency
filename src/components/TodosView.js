import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { isLoaded } from 'react-redux-firebase';
import { Container, Divider, Header } from 'semantic-ui-react';
import { map, isEmpty } from 'lodash';
import TodosList from '../containers/TodosList';

class TodosView extends Component {
    render() {
        const { list } = this.props;
        const todos = list ? list.items : {};
        const projects = list ? list.projects : {};

        let firstList = true;
        const projectBlocks= !isLoaded()
            ? 'Loading'
            : () => {
                return  map(projects, (value, key) => {
                    let projectTodos = {};
                    for (let todoId in todos) {
                        if (!todos.hasOwnProperty(todoId) || todos[todoId].project !== key) continue;
                        projectTodos[todoId] = todos[todoId];
                    }
                    if (isEmpty(projectTodos)) {
                        return ""
                    }
                    const block = (
                            <div key={key}>
                                {firstList ? "" : <Divider hidden/>}
                                <Header as='h2'>{key}</Header>
                                <TodosList todos={projectTodos}/>
                            </div>
                    );
                    firstList = false;
                    return block
                });
            };

        return (
            <Container>
                {projectBlocks()}
            </Container>
        )
    }
}

TodosView.propTypes = {
    list: PropTypes.object,
};

export default compose()(TodosView)