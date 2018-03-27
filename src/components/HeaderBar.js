import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Menu, Input, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ROOT_PATH, SETTINGS_PATH } from '../constants';
import { map } from 'lodash';

class HeaderBar extends Component {
    constructor() {
        super();
        this.state = {
            todo: {},
        }
    }

    handleChange(e) {
        const value = e.target.value;

        const projectRegEx = new RegExp('#([^\ ]+)');
        const projectMatch = projectRegEx.exec(value);
        if (projectMatch) {
            if (value.slice(-1) === " ") {
                const project = projectMatch[1];
                e.target.value = value.slice(0, -(project.length+2));
                this.setState({
                    todo: {...this.state.todo, project: project}
                })
            }
        }

        const priorityRegEx = new RegExp('!([^\ ]{1})');
        const priorityMatch = priorityRegEx.exec(value);
        if (priorityMatch) {
            if (value.slice(-1) === " " && 0 < parseInt(priorityMatch[1]) < 5) {
                const priority = parseInt(priorityMatch[1]);
                e.target.value = value.slice(0, -3);
                this.setState({
                    todo: {...this.state.todo, priority: priority}
                })
            }
        }
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
        console.log("handling prop:", key);
        delete todo[key];
        console.log("todo:", todo);
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

HeaderBar.propTypes = {
    handleSubmit: PropTypes.func
};

export default HeaderBar;