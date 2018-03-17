import React, { Component } from 'react';
import { Menu, Input, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class HeaderBar extends Component {
    handleKeyDown(e) {
        if (e.key === "Enter") {
            this.props.handleSubmit(e.target.value);
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

HeaderBar.propTypes = {
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    submitting: PropTypes.bool
};

export default HeaderBar;