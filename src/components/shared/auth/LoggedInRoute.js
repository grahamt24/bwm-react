import React from "react";
import {Route, Redirect} from "react-router-dom";
import authService from "../../../services/auth-service";

export function LoggedInRoute(props){

    const {component: Component, ...rest} = props;

    return(
        <Route {...rest} render={(props) => {
            if(authService.isAuthenticated()){
                return <Redirect to={{pathname: "/rentals"}}/>
            }
            return <Component {...props} {...rest}/>
        }} />
    )
}