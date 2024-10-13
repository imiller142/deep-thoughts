import { jwtDecode } from "jwt-decode";

class AuthService {

    //retrieve token data
    getProfile() {
        return jwtDecode(this.getToken());
    }

    //check if still logged in
    loggedIn() {
        //check if token is still valid
        const token = this.getToken();
        //use type coersion to check if token is NOT undefined and the token is NOT expired
        return !!token &&  !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try{
            const decoded = jwtDecode(token);
            return (decoded.exp < Date.now() / 1000) 
        } catch(err) {
            return false;
        }
    }

    //retrieve token from localStorage
    getToken() {
        return localStorage.getItem("id_token");
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken)

        window.location.assign('/')
    }

    logout() {
        localStorage.removeItem('id_token');

        window.location.assign('/')
    }

}

export default new AuthService();