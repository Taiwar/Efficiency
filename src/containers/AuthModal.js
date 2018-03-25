import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';

class AuthModal extends Component {
    constructor() {
        super();
        this.state = {
            showLogin: false
        }
    }

    toggleModal() {
        this.setState({
            showLogin: !this.state.showLogin
        })
    }

    render() {
            let openModal = isLoaded(this.props.auth) ? isEmpty(this.props.auth) : false;
            return (
                <div>
                    <Modal size='large' open={openModal && !this.state.showLogin}>
                        <Modal.Header>Sign Up</Modal.Header>
                        <Modal.Content>
                            <SignupForm onSubmit={this.props.emailSignup} onSubmitFail={this.props.onSubmitFail}/>
                            <hr/>
                            <Button onClick={() => this.toggleModal()}>
                                Already have an account?
                            </Button>
                        </Modal.Content>
                    </Modal>
                    <Modal size='large' open={this.state.showLogin}>
                        <Modal.Header>Sign In</Modal.Header>
                        <Modal.Content>
                            <SigninForm onSubmit={this.props.emailSignin} onSubmitFail={this.props.onSubmitFail}/>
                            <hr/>
                            <Button onClick={() => this.toggleModal()}>
                                Need an account?
                            </Button>
                        </Modal.Content>
                    </Modal>
                </div>
        );
    }
}

AuthModal.propTypes = {
    auth: PropTypes.object,
    emailSignup: PropTypes.func,
    emailSignin: PropTypes.func,
    onSubmitFail: PropTypes.func,
};

export default compose(
    withFirebase,
    withHandlers({
        onSubmitFail: (formErrs, dispatch, err) =>
            console.error(formErrs ? 'Form Invalid' : err.message || 'Error'),
        emailSignup: ({ firebase }) => creds => {
            firebase
                .createUser(creds, {
                    email: creds.email,
                    username: creds.username
                })
                .catch(err => console.error(err.message));
        },
        emailSignin: ({ firebase }) => creds => {
            firebase
                .login(creds)
                .catch(err => console.log(err.message))
        }
    }),
    connect(({ firebase, firebase: { auth } }) => ({
        auth: auth,
    }))
)(AuthModal)