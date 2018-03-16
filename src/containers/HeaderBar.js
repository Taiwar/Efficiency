import React, { Component } from 'react';
import { Menu, Input, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { addTodo } from '../actions/todosActions';
import { Link } from 'react-router-dom';

class HeaderBar extends Component {
    handleKeyDown(e) {
        if (e.key === "Enter") {
            this.props.onAddClick(e.target.value);
        }
    }

    render() {
        return (
            <Menu attached='top' inverted>
                <Menu.Item header as={Link} to="">
                    <h3>Efficiency</h3>
                </Menu.Item>
                <Menu.Item>
                    <Input
                        icon='add circle'
                        placeholder='Add...'
                        onKeyPress={(e) => this.handleKeyDown(e)}
                    />
                </Menu.Item>
                <Menu.Item position='right' as={Link} to='settings'>
                    <Icon name='settings'/>
                </Menu.Item>
            </Menu>
        );
    }
}

export default connect(
    (store) => {
        return {
            inputValue: store.todos.inputValue,
            outputDir: store.settings.outputDir
        };
    },
    (dispatch) => {
        return {
            onAddClick: (title) => {
                dispatch(addTodo(title, "", ""));
            },
        }
    })(HeaderBar)