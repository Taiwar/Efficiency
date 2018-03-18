import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Menu, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ROOT_PATH, SETTINGS_PATH } from '../constants';

class HeaderBar extends Component {
    handleKeyDown(e) {
        if (e.key === "Enter") {
            this.props.handleSubmit(e.target.value);
        }
    }

    render() {
        return (
            <Menu attached='top' inverted>
                <Menu.Item header as={Link} to={ROOT_PATH}>
                    <h3>Efficiency</h3>
                </Menu.Item>
                <Menu.Item>
                    <Input
                        icon='add circle'
                        placeholder='Add...'
                        onKeyPress={(e) => this.handleKeyDown(e)}
                    />
                </Menu.Item>
                <Menu.Item position='right' as={Link} to={SETTINGS_PATH}>
                    <Icon name='settings'/>
                </Menu.Item>
            </Menu>
        );
    }
}

HeaderBar.propTypes = {
    handleSubmit: PropTypes.func
};

export default HeaderBar;