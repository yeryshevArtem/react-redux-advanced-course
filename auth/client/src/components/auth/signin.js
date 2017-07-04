import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  renderField(field) {
    return (
      <fieldset className="form-group">
        <label>{field.label}</label>
        <input {...field.input} className="form-control"/>
      </fieldset>
    );
  }
  handleFormSubmit(values) {
    const {email, password} = values;
    this.props.signinUser({email, password});
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
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin'
})(
  connect(null, actions)(Signin)
);