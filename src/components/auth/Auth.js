var jwtDecode = require('jwt-decode');
class Auth {
    constructor() {
        this.getProfile = this.getProfile.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    getProfile() {
        return this.profile;
    }

    getIdToken() {
        return this.idToken;
    }

    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }

    signIn(loginFeedBack) {
        this.idToken = loginFeedBack.token;
        var decoded = jwtDecode(loginFeedBack.token);
        this.profile = decoded;
        // set the time that the id token will expire at
        this.expiresAt = decoded.exp * 1000;
    }

    signOut() {
        // clear id token, profile, and expiration
        this.idToken = null;
        this.profile = null;
        this.expiresAt = null;
    }
}

const authClient = new Auth();

export default authClient;