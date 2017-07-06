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
    this.props.signinUser({email, password}, () => {
      this.props.history.push('/feature');
    });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return(
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
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error
  };
};

export default reduxForm({
  form: 'signin'
})(
  connect(mapStateToProps, actions)(Signin)
);