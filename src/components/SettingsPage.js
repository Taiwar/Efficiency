import React, { Component } from 'react';
import { Container, Header, Menu, Grid, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class SettingsPage extends Component {
    render() {
        return (
            <div>
                <Menu attached='top' inverted>
                    <Menu.Item header as={Link} to="">
                        <h3>Efficiency</h3>
                    </Menu.Item>
                    <Menu.Item header>
                        <h4>Settings</h4>
                    </Menu.Item>
                </Menu>
                <Divider hidden/>
                <Grid.Row>
                    <Container>
                        <Header>Settings</Header>
                    </Container>
                </Grid.Row>
            </div>
        );
    }
}