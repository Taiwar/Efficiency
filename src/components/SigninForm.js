import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { SIGNIN_FORM_NAME } from '../util/constants';

class SigninForm extends Component {
    render() {
        const {handleSubmit, pristine, submitting} = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Field required>
                    <label>Email</label>
                    <Field name='email' component='input' placeholder='Email' type='email'/>
                </Form.Field>
                <Form.Field required={true}>
                    <label>Password</label>
                    <Field name='password' component='input' placeholder='Password' type='password'/>
                </Form.Field>
                <Button color='red' type='submit' disabled={pristine === true || submitting === true}>
                    <Icon name='user'/>Sign In
                </Button>
            </Form>
        );
    }
}

SigninForm.propTypes = {
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: SIGNIN_FORM_NAME
})(SigninForm)