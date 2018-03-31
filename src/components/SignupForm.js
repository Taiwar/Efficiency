import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { SIGNUP_FORM_NAME } from '../util/constants';
import { renderField, validateSignup } from '../util/forms';
import Reactotron from 'reactotron-react-js';

class SignupForm extends Component {
    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        console.log(this.props);
        Reactotron.log(this.props);
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Field required>
                    <label>Username</label>
                    <Field name='username' component={renderField} placeholder='Username' type='text'/>
                </Form.Field>
                <Form.Field required>
                    <label>Email</label>
                    <Field name='email' component={renderField} placeholder='Email' type='email'/>
                </Form.Field>
                <Form.Field required={true}>
                    <label>Password</label>
                    <Field name='password' component={renderField} placeholder='Password' type='password'/>
                </Form.Field>
                <Button color='red' type='submit' disabled={pristine === true || submitting === true}>
                    <Icon name='user'/>Sign Up
                </Button>
            </Form>
        );
    }
}

SignupForm.propTypes = {
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: SIGNUP_FORM_NAME,
    validate: validateSignup
})(SignupForm)