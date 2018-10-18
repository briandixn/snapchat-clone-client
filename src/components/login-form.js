import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import "./login-form.css";
import {Link, Redirect} from 'react-router-dom';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {

        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }


        //____________________________________________
          if (this.props.loggedIn) {
              return <Redirect to="/dashboard" />;
              console.log("loggedin");
          }
          //____________________________________________

        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <label className="login-labels" htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    validate={[required, nonEmpty]}
                />
                <label className="login-labels" htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    validate={[required, nonEmpty]}
                />
                <button className="logbutton" disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>

                  <button className="dashlink">  <Link className="homelink" to="/">Home</Link></button>

            </form>
        );
    }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default reduxForm({
    form: 'login',

    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
