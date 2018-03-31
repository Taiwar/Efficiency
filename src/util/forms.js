import React from 'react';

export const validateSignup = values => {
    console.log("Validating", values);
    const errors = {};
    if (!values.username) {
        errors.username = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.age = 'Required'
    }
    console.log("errors", errors);
    return errors
};

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <span>{error}</span>))}
        </div>
    </div>
);