import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import authClient from '../auth/Auth';


class LogOut extends Component {
    constructor(props) {
        super(props);
        var profile = authClient.getProfile();
        authClient.signOut();
        this.state = {
            userName: profile.name,
            userID:profile.id,
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Thank you {this.state.userName}, please come and visit again soon.</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LogOut);