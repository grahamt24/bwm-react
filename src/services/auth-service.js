import *  as jwt from "jsonwebtoken";
import * as moment from "moment";

class AuthService{

    storageKey = "auth_token";

    getToken(){
        return localStorage.getItem(this.storageKey)
    }

    decode(token){
        return jwt.decode(token);
    }

    invalidateUser(){
        localStorage.removeItem(this.storageKey);
    }

    saveToken(token){
        localStorage.setItem(this.storageKey, token);
    }

    getExpiration(token){
        return moment.unix(this.decode(token).exp);
    }

    getUsername(){
        return this.decode(this.getToken()).username;
    }

    isValid(token){
        return moment().isBefore(this.getExpiration(token));
    }

    isAuthenticated(){
        const token = this.getToken();

        return token && this.isValid(token);
    }
}

export default new AuthService();