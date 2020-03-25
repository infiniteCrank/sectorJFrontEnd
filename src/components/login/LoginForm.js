import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import authClient from '../auth/Auth';


class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            userName: '',
            password: '',
        };
    }

    updateUserName(value) {
        this.setState({
            userName: value,
        });
    }

    updatePassword(value) {
        this.setState({
            password: value,
        });
    }

    async submit() {
        this.setState({
            disabled: true,
        });
        const loginInfo = {
            username: this.state.userName,
            password: this.state.password
        }
        authClient.signIn(loginInfo);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-primary">
                            <div className="card-header">Login</div>
                            <div className="card-body text-left">
                                <div className="form-group">
                                    <label htmlFor="userName">User Name:</label>
                                    <input
                                        disabled={this.state.disabled}
                                        type="text"
                                        onBlur={(e) => {this.updateUserName(e.target.value)}}
                                        className="form-control"
                                        placeholder="Enter Your User Name Here."
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        disabled={this.state.disabled}
                                        type="password"
                                        onBlur={(e) => {this.updatePassword(e.target.value)}}
                                        className="form-control"
                                        placeholder=""
                                    />
                                </div>
                                <button
                                    disabled={this.state.disabled}
                                    className="btn btn-primary"
                                    onClick={() => {this.submit()}}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginForm);