import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Label, List, Icon } from 'semantic-ui-react';

class TodoItem extends Component {
    constructor() {
        super();
        this.state = {
            beingEdited: false,
            title: ""
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            title: this.props.todo.title
        })
    }

    toggleEdit() {
        this.setState({
            ...this.state,
            beingEdited: !this.state.beingEdited
        })
    }

    toggleInput(e) {
        this.setState({
            ...this.state,
            title: e.target.value
        })
    }

    handleOnBlur(todo, id) {
        this.props.onEditTodo(todo, id, this.state.title);
        this.setState({
            ...this.state,
            beingEdited: false
        })
    }

    handleKeyDown(todo, id, e) {
        if (e.key === "Enter") {
            this.props.onEditTodo(todo, id, this.state.title);
            this.setState({
                ...this.state,
                beingEdited: false
            })
        }
    }

    render() {
        const colors = {1: 'red', 2: 'orange', 3: 'yellow', 4: 'grey'};
        const { todo, id, onCompleteClick, onDeleteClick } = this.props;
        return (
            <List.Item className={todo.isDone ? 'greyedOut' : ''}>
                <List.Content floated='right'>
                    <Label>
                        <Icon name='inbox' />
                        {todo.project}
                    </Label>
                    <List.Icon
                        name='close'
                        onClick={() => onDeleteClick(todo, id)}
                        link={true}
                    />
                </List.Content>
                {
                    todo.isDone
                        ? <List.Icon
                            name='check circle outline'
                            onClick={() => onCompleteClick(todo, id)}
                            link={true}
                        />
                        : <List.Icon
                            name='circle outline'
                            color={colors[todo.priority]}
                            onClick={() => onCompleteClick(todo, id)}
                            link={true}
                        />
                }
                <List.Content>
                    {
                        this.state.beingEdited
                            ? <Input size='mini'
                                     value={this.state.title}
                                     ref={(component) => {
                                         if (component) {
                                             component.focus()
                                         }
                                     }}
                                     onChange={(e) => this.toggleInput(e)}
                                     onBlur={() => this.handleOnBlur(todo, id)}
                                     onKeyPress={(e) => this.handleKeyDown(todo, id, e)}
                            />
                            : <List.Header onClick={() => this.toggleEdit()}>{todo.title}</List.Header>
                    }
                </List.Content>
            </List.Item>
        )
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object,
    id: PropTypes.string,
    onCompleteClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onEditTodo: PropTypes.func
};

export default TodoItem;