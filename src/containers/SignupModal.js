import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import SignupForm from '../components/SignupForm';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';

class SignupModal extends Component {

    render() {
            const openModal = isLoaded(this.props.auth) ? isEmpty(this.props.auth) : false;
            return (
                <Modal size='large' open={openModal}>
                    <Modal.Header>Sign Up</Modal.Header>
                    <Modal.Content>
                        <SignupForm onSubmit={this.props.emailSignup} onSubmitFail={this.props.onSubmitFail}/>
                    </Modal.Content>
                </Modal>
        );
    }
}

SignupModal.propTypes = {
    isAuthed: PropTypes.bool,
    emailSignup: PropTypes.func,
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
        }
    }),
    connect(({ firebase, firebase: { auth } }) => ({
        auth: auth,
    }))
)(SignupModal)