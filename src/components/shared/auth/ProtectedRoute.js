import React from "react";
import {Route, Redirect} from "react-router-dom";
import authService from "../../../services/auth-service";

export function ProtectedRoute(props){

    const {component: Component, ...rest} = props;

    return(
        <Route {...rest} render={(props) => {
            if(authService.isAuthenticated()){
                return <Component {...props} {...rest} />
            }
            return <Redirect to={{pathname: "/login"}}/>
        }} />
    )
}