import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import "./landing-page.css"
import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
///make the div fill up the page
    return (
        <div className="home">

            <div className="snaplogo"><h3>SnapChater</h3></div>

            <ul className="logs">
              <li className="loginlink">  <Link className="link" to="/login">LOG IN</Link></li>
              <li className="registerlink">  <Link className="link" to="/register">SIGN UP</Link></li>
            </ul>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
