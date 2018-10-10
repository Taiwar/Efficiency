import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Menu, Input, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { ROOT_PATH, SETTINGS_PATH } from '../util/constants';
import { matchDate, matchPriority, matchProject } from '../util/userInput';

class TodoHeaderBar extends Component {
    constructor() {
        super();
        this.state = {
            todo: {},
        }
    }

    handleChange(e) {
        const field = e.target;
        const value = field.value;
        const priority = matchPriority(value, field);
        const project = matchProject(value, field);
        matchDate(value, field);
        this.setState({
            todo: {
                ...this.state.todo,
                priority: !priority ? this.state.todo.priority : priority,
                project: !project ? this.state.todo.project : project
            }
        });
    }

    handleKeyDown(e) {
        if (e.key === "Enter") {
            const todo = {...this.state.todo, title: e.target.value};
            this.props.handleSubmit(todo);
            e.target.value = "";
            this.setState({
                todo: {}
            })
        }
    }

    handlePropDelete(key) {
        const todo = this.state.todo;
        delete todo[key];
        this.setState({
            todo: todo
        })
    }

    render() {
        const colors = {1: 'red', 2: 'orange', 3: 'yellow', 4: 'grey'};
        const labelContent = (value, key) => {
            if (key === 'project') {
                return (
                    <span>
                        <Icon name='tag' />
                        {value}
                    </span>
                )
            } else if (key === 'priority') {
                return (
                    <Icon color={colors[value]} name='flag' />
                )
            }
        };
        return (
            <div>
                <Menu attached='top' inverted>
                    <Menu.Item header as={Link} to={ROOT_PATH}>
                        <h3>Efficiency</h3>
                    </Menu.Item>
                    <Menu.Item>
                        <Input
                            icon='add circle'
                            placeholder='Add...'
                            onChange={(e) => this.handleChange(e)}
                            onKeyPress={(e) => this.handleKeyDown(e)}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        {
                            map(this.state.todo, (value, key) =>
                                {
                                    if (!value) {
                                        return;
                                    }
                                    return (
                                        <Label key={key} size='large'>
                                            {labelContent(value, key)}
                                            <Icon name='close'
                                                  onClick={() => this.handlePropDelete(key)}
                                                  link={true}
                                            />
                                        </Label>
                                    )
                                }
                            )
                        }
                    </Menu.Item>
                    <Menu.Item position='right' as={Link} to={SETTINGS_PATH}>
                        <Icon name='settings'/>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

TodoHeaderBar.propTypes = {
    handleSubmit: PropTypes.func
};

export default TodoHeaderBar;