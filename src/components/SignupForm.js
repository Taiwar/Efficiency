import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { SIGNUP_FORM_NAME } from '../constants';

class SignupForm extends Component {
    render() {
        const {handleSubmit, pristine, submitting} = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Field required>
                    <label>Username</label>
                    <Field name='username' component='input' placeholder='Username' type='text'/>
                </Form.Field>
                <Form.Field required>
                    <label>Email</label>
                    <Field name='email' component='input' placeholder='Email' type='text'/>
                </Form.Field>
                <Form.Field required={true}>
                    <label>Password</label>
                    <Field name='password' component='input' placeholder='Password' type='password'/>
                </Form.Field>
                <Button color='red' type='submit' disabled={pristine === true || submitting === true}>
                    <Icon name='user'/>Sign Up
                </Button>
            </Form>
        );
    }
}

SignupForm.propTypes = {
    pristine: PropTypes.bool.isRequired, // added by redux-form
    submitting: PropTypes.bool.isRequired, // added by redux-form
    handleSubmit: PropTypes.func.isRequired // added by redux-form
};

export default reduxForm({
    form: SIGNUP_FORM_NAME
})(SignupForm)