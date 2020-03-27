import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import authClient from '../auth/Auth';
import axios from 'axios';


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
        const loginFeedBack = (await axios.post('http://3.217.206.40:3000/login/',{
            email: this.state.userName,
            password: this.state.password,
          })).data;
        authClient.signIn(loginFeedBack);
        if(loginFeedBack.success===true){
            this.props.history.push('/');
        }
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