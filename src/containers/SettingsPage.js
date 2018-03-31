import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { withFirebase } from 'react-redux-firebase';
import { Container, Header, Grid, Divider, Icon, Button } from 'semantic-ui-react';
import NavHeaderBar from '../components/NavHeaderBar';
import AuthModal from './AuthModal';

class SettingsPage extends Component {
    handleLogout() {
        console.log(this.props.auth);
        this.props.firebase.logout();
        this.props.history.push('');
    }

    render() {
        return (
            <div>
                <NavHeaderBar path='Settings'/>
                <Divider hidden/>
                <Grid.Row>
                    <Container>
                        <Header as='h2' textAlign='center' icon>
                            <Icon name='settings' />
                            Account Settings
                        </Header>
                        <Button floated='right' color='red' onClick={() => this.handleLogout()}>
                            Log out
                        </Button>
                    </Container>
                </Grid.Row>
                <AuthModal/>
            </div>
        );
    }
}

export default compose(
    withFirebase,
    withRouter
)(SettingsPage)