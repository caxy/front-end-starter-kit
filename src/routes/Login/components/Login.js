import React from 'react';
import { Field, reduxForm } from 'redux-form';

const Login = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <Field name="username" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <Field name="password" component="input" type="password" />
    </div>
    <button type="submit">Log In</button>
  </form>
);

Login.propTypes = {
  // handleSubmit: React.PropTypes.func.isRequired
};

// Decorate the form component with redux-form.
export default reduxForm({
  form: 'login'
})(Login);
