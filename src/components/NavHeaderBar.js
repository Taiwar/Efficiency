import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavHeaderBar extends Component {
    render() {
        return (
            <Menu attached='top' inverted>
                <Menu.Item header as={Link} to="">
                    <h3>Efficiency</h3>
                </Menu.Item>
                <Menu.Item header>
                    <h4>{this.props.path}</h4>
                </Menu.Item>
            </Menu>
        );
    }
}

NavHeaderBar.propTypes = {
    auth: PropTypes.object,
    path: PropTypes.string
};

export default NavHeaderBar;