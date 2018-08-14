import authService from "../services/auth-service";
import axiosService from "../services/axios-service";

import {FETCH_RENTAL_BY_ID_SUCCESS,
        FETCH_RENTAL_BY_ID_INIT,
        FETCH_RENTALS_SUCCESS,
        FETCH_RENTALS_FAIL,
        FETCH_RENTALS_INIT,
        LOGIN_SUCCESS,
        LOGIN_FAILURE,
        LOGOUT} from "./types";

// RENTALS ACTIONS -------------------------------

const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit = () => {
    return {
        type: FETCH_RENTAL_BY_ID_INIT
    }
};

const fetchRentalByIdSuccess = (rental) => {
    return {
        type: FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
};

const fetchRentalsSuccess = (rentals) => {
  return {
      type: FETCH_RENTALS_SUCCESS,
      rentals
  }
};

const fetchRentalsInit = () => {
    return {
        type: FETCH_RENTALS_INIT
    }
};

const fetchRentalsFail = (errors) => {
    return {
        type: FETCH_RENTALS_FAIL,
        errors
    }
};

export const fetchRentals = (city) => {
    let url = "";
    if(city){
        url = `/rentals?city=${city}`;
    }
    else{
        url = "/rentals";
    }
    return function(dispatch){
        dispatch(fetchRentalsInit());

        axiosInstance.get(url)
            .then(res =>  res.data)
            .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
            .catch(({response}) => {
                dispatch(fetchRentalsFail(response.data.errors))
            });
    };

};

export const fetchRentalById = (rentalId) => {
    return function(dispatch){
        dispatch(fetchRentalByIdInit());

        axiosInstance.get(`/rentals/${rentalId}`)
            .then(res => res.data)
            .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
    }
};



// AUTH ACTIONS -------------------------------

const loginSuccess = () => {
    const username = authService.getUsername();
    return {
        type: LOGIN_SUCCESS,
        username
    }
};

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
};

export const register = (userData) => {
    return axiosInstance.post("/users/register", userData).then(
        (res) => {
            return res.data;
        },
        (err) => {
            return Promise.reject(err.response.data.errors);
        }
    );
};

export const checkAuthState = () => {
    return dispatch => {
        if(authService.isAuthenticated()){
            dispatch(loginSuccess());
        }
    }
};

export const login = (userData) => {
    return dispatch => {
        return axiosInstance.post("/users/auth", userData).then(
            (res) => {
                return res.data
            }
        ).then(
            (token) => {
                authService.saveToken(token);
                dispatch(loginSuccess());
            }
        ).catch(
            (error) => {
                dispatch(loginFailure(error.response.data.errors));
        });
    }
};

export const logout = () => {
    authService.invalidateUser();

    return {
        type: LOGOUT
    }
};

export const createBooking = (booking) => {
    return axiosInstance.post("/bookings", booking)
        .then( (res) => {
            return res.data;
        })
        .catch(({response}) =>{
            return Promise.reject(response.data.errors);
        })
};


export const createRental = (rentalData) => {
    return axiosInstance.post("/rentals", rentalData).then(
        (res) => {
            return res.data;
        },
        (err) => {
            return Promise.reject(err.response.data.errors);
        }
    );
};