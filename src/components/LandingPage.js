import React, { Component } from 'react';
import { Container, Header, Grid, Divider, Icon } from 'semantic-ui-react';
import NavHeaderBar from './NavHeaderBar';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <NavHeaderBar path='Start'/>
                <Divider hidden/>
                <Grid.Row>
                    <Container>
                        <Header size='huge' textAlign='center' icon as={Link} to="home">
                            <Icon name='play' />
                            Start using Efficiency
                        </Header>
                    </Container>
                </Grid.Row>
            </div>
        );
    }
}

export default LandingPage