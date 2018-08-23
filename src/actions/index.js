import authService from "../services/auth-service";
import axiosService from "../services/axios-service";

import {
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTALS_SUCCESS,
    FETCH_RENTALS_FAIL,
    FETCH_RENTALS_INIT,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    FETCH_USER_BOOKINGS_INIT,
    FETCH_USER_BOOKINGS_SUCCESS,
    FETCH_USER_BOOKINGS_FAIL,
    UPDATE_RENTAL_FAIL,
    UPDATE_RENTAL_SUCCESS,
    RESET_RENTAL_ERRORS,
    RELOAD_MAP,
    RELOAD_MAP_FINISH
} from "./types";

const axiosInstance = axiosService.getInstance();

export const verifyRentalOwner = (rentalId) => {
    return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
};

export const reloadMap = () => {
    return {
        type: RELOAD_MAP
    }
};


export const reloadMapFinish = () => {
    return {
        type: RELOAD_MAP_FINISH
    }
};

// RENTALS ACTIONS -------------------------------

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

export const resetRentalErrors = () => {
    return {
        type: RESET_RENTAL_ERRORS
    }
};

const updateRentalSuccess = (updatedRental) => {
    return {
        type: UPDATE_RENTAL_SUCCESS,
        rental: updatedRental
    }
};

const updateRentalFail = (errors) => {
    return {
        type: UPDATE_RENTAL_FAIL,
        errors
    }
};

export const updateRental = (id, rentalData) => dispatch => {
    return axiosInstance.patch(`/rentals/${id}`, rentalData)
        .then(res => {
            return res.data
        })
        .then(updatedRental => {
            dispatch(updateRentalSuccess(updatedRental));
            if(rentalData.city || rentalData.street){
                dispatch(reloadMap());
            }
        })
        .catch(({response}) => {
            dispatch(updateRentalFail(response.data.errors))
        });
};



// USER BOOKING ACTIONS -------------------------------

const fetchUserBookingsInit = () => {
    return {
        type: FETCH_USER_BOOKINGS_INIT
    }
};

const fetchUserBookingsSuccess = (bookings) => {
    return {
        type: FETCH_USER_BOOKINGS_SUCCESS,
        bookings
    }
};

const fetchUserBookingsFail = (errors) => {
    return {
        type: FETCH_USER_BOOKINGS_FAIL,
        errors
    }
};


export const fetchUserBookings = () => {
    return dispatch => {
        dispatch(fetchUserBookingsInit());

        return axiosInstance.get("/bookings/manage").then(
        (res) => {
            return res.data;
        })
        .then(
            (bookings) => {
                dispatch(fetchUserBookingsSuccess(bookings));
            })
        .catch(
            (error) => {
                dispatch(fetchUserBookingsFail(error.response.data.error))
            });
    }
};

// USER RENTAL ACTIONS -------------------------------

export const getUserRentals = () => {
    return axiosInstance.get("/rentals/manage").then(
    (res) => {
        return res.data;
    })
    .catch(
        (error) => {
            return Promise.reject(error.response.data.errors)
    });
};


export const deleteUserRental = (rentalId) => {
    return axiosInstance.delete(`/rentals/${rentalId}`).then(
        (res) => {
            return res.data;
        })
        .catch(
            (error) => {
                return Promise.reject(error.response.data.errors);
            }
        );
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

