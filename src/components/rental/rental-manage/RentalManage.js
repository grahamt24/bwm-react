import React from "react";
import {Link} from "react-router-dom";
import {RentalManageCard} from "./RentalManageCard";
import {RentalManageModal} from "./RentalManageModal";
import { ToastContainer, toast } from "react-toastify";

import * as actions from "../../../actions/index";

export class RentalManage extends React.Component {

    constructor() {
        super();

        this.state = {
            userRentals: [],
            errors: [],
            isFetching: false
        };
        this.renderRentalCards = this.renderRentalCards.bind(this);
        this.deleteRental = this.deleteRental.bind(this);
    }

    componentWillMount(){
        this.setState({
            isFetching: true
        });
        actions.getUserRentals().then(
            (userRentals) => {
                this.setState({
                    userRentals,
                    isFetching: false
                })
            },
            (errors) => {
                this.setState({
                    errors,
                    isFetching: false
                })
            }
        );
    }

    renderRentalCards(){
        return this.state.userRentals.map((rental, index) => {
            return (
                <RentalManageCard modal={<RentalManageModal bookings={rental.bookings}/>}
                                  deleteRentalCb={this.deleteRental}
                                  key={index}
                                  rentalIndex={index}
                                  rental={rental}/>
            )
        })
    }

    deleteRental(rentalId, rentalIndex){
        actions.deleteUserRental(rentalId).then(
            () => {
                this.deleteRentalFromList(rentalIndex);
            },
            (errors) => {
                toast.error(errors[0].detail);
            }
        )
    }

    deleteRentalFromList(rentalIndex){
        const userRentals = this.state.userRentals.slice();

        userRentals.splice(rentalIndex, 1);

        this.setState({
            userRentals
        })
    }



    render(){
        const {userRentals, isFetching} = this.state;
        return (
            <div>
                <section id="userRentals">
                    <ToastContainer />
                    <h1 className="page-title">My Rentals</h1>
                    <div className="row">
                        {this.renderRentalCards()}
                    </div>
                    {!isFetching && userRentals.length === 0 &&
                        <div className="alert alert-warning">
                            You don"t have any rentals currently created. If you want advertised your property
                            please follow this link.
                            <Link style={{"marginLeft": "10px"}} className="btn btn-bwm" to="/rentals/new">Register
                                Rental</Link>
                        </div>
                    }
                </section>
            </div>
        )
    }
}