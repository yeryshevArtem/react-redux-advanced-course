import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  renderField(field) {
    const {meta: {error, touched}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <fieldset className="form-group">
          <label>{field.label}</label>
          <input {...field.input} className="form-control"/>
          <div className="text-help">
            {touched ? error : ''}
          </div>
        </fieldset>
      </div>
    );
  }
  handleFormSubmit(values) {
    const {email, password} = values;
    this.props.signupUser({email, password});
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label="Email: "
          name="email"
          component={this.renderField}
        />
        <Field
          label="Password: "
          name="password"
          component={this.renderField}
        />
        <Field
          label="Password Confirm: "
          name="passwordConfirm"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error
  };
};

function validate(formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Enter email!';
  }
  if (!formProps.password) {
    errors.password = 'Enter a password!';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Enter a password confirmation!';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password must match!';
  }
  console.log(formProps);

  return errors;
}

export default reduxForm({
  form: 'signup',
  validate
})(
  connect(mapStateToProps, actions)(Signup)
);