import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { keys, map, each } from 'lodash';

const FIELDS = {
  email: {
    label: 'Email:',
    type: 'email',
    errorTxt: 'Please enter an email'
  },
  password: {
    label: 'Password:',
    type: 'password',
    errorTxt: 'Please enter an password'
  },
  passwordConfirm: {
    label: 'Confirm Password:',
    type: 'password',
    errorTxt: 'Please confirm your password'
  }
};

class Signup extends Component {

  handleFormSubmit(formProps) {
    // call action creator to sign up user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Opps!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  renderFields(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <fieldset key={fieldConfig.label} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger': ''}`}>
        <label>{fieldConfig.label}</label>
        <input {...fieldHelper} type={fieldConfig.type} className='form-control' />
        <small className='error'>{fieldHelper.touched ? fieldHelper.error : ''}</small>
      </fieldset>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
     <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      {map(FIELDS, this.renderFields.bind(this))}
      {this.renderAlert()}
      <button className='btn btn-primary' action='submit'>Sign Up!</button>
     </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  each(FIELDS, (obj, field) => {
    if (!formProps[field]) {
      errors[field] = obj.errorTxt
    }
  });

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match'
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  form: 'signup',
  fields: keys(FIELDS),
  validate
}, mapStateToProps, actions)(Signup);