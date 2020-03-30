var jwtDecode = require('jwt-decode');
class Auth {
    constructor() {
        this.getProfile = this.getProfile.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    getProfile() {
        var idToken = this.getIdToken();
        if(idToken !== null){
            var decoded = jwtDecode(idToken);
            return decoded;
        }else{
            return "No Profile Found. Please Login.";
        }

    }

    getIdToken() {
        return window.sessionStorage.getItem("infiniteCrankProfile");
    }

    isAuthenticated() {
        if(this.getIdToken() !== null){
            var profile = this.getProfile();
            var expiresAt = profile.exp * 1000;
            return new Date().getTime() < expiresAt;
        }else{
            return false;
        }

    }

    signIn(loginFeedBack) {
        if(loginFeedBack.success===true){
            window.sessionStorage.setItem("infiniteCrankProfile",loginFeedBack.token);
        }
    }

    signOut() {
        window.sessionStorage.clear();
    }
}

const authClient = new Auth();

export default authClient;