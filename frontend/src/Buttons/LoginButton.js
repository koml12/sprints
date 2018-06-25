/**
 * @author mok3112
 * Created: 3/28/18
 */

import React, { Component } from "react";
import {
    LoginForm
} from "../Forms/index";

/**
 * Component that handles the login process for a user.
 * When clicked, it mounts a Form component that can take a user's
 * 'username' and 'password' info and log them into the system.
 */
class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        };

        this._onClick = this._onClick.bind(this);
        this.shouldShowLoginForm = this.shouldShowLoginForm.bind(this);
    }

    _onClick() {
        this.setState({ clicked: true });
    }

    shouldShowLoginForm() {
        if (this.state.clicked) {
            let btns = document.getElementsByClassName("login-button");
            console.log(btns);
            btns[0].style.visibility = "hidden";
            return (
                <LoginForm />
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <span>
                    <a className="login-button" onClick={this._onClick}>Log In</a>
                </span>
                <span>
                    {this.shouldShowLoginForm()}
                </span>
            </div>
        )
    }
}

export default LoginButton;
