import React, { Component } from 'react';
import { Divider, Grid } from 'semantic-ui-react'
import HeaderBar from '../containers/HeaderBar';
import TodosList from '../containers/TodosList';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <HeaderBar/>
                <Divider hidden/>
                <Grid.Row>
                    <TodosList/>
                </Grid.Row>
            </div>
        );
    }
}

