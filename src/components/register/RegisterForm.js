import React from "react";
import { Field, reduxForm } from "redux-form";

import {BwmInput} from "../shared/form/BwmInput";
import {BwmResError} from "../shared/form/BwmResError";


const RegisterForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
    return (
        <form onSubmit={handleSubmit(submitCb)}>
            <Field
                name="username"
                type="text"
                label="Username"
                className="form-control"
                component={BwmInput}
            />
            <Field
                name="email"
                type="email"
                label="Email"
                className="form-control"
                component={BwmInput}
            />
            <Field
                name="password"
                type="password"
                label="Password"
                className="form-control"
                component={BwmInput}
            />
            <Field
                name="passwordConfirmation"
                type="password"
                label="Password Confirmation"
                className="form-control"
                component={BwmInput}
            />
            <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
                Submit
            </button>
            <BwmResError errors={errors}/>
        </form>
    )
};

const validate = values => {
    const errors = {};

    if(values.username && values.username.length < 4){
        errors.username = "Username must be at least 4 characters long."
    }

    if(!values.email){
        errors.email = "A valid email address is required to register."
    }

    if(values.passwordConfirmation !== values.password){
        errors.password = "Passwords must be the same!";
    }

    if(!values.passwordConfirmation){
        errors.passwordConfirmation = "Please enter password confirmation."
    }

    return errors
};

export default reduxForm({
    form: "registerForm",
    validate
})(RegisterForm)
