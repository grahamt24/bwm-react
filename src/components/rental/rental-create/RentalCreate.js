import React from "react";
import RentalCreateForm from "./RentalCreateForm";
import {Redirect} from "react-router-dom";

import * as actions from "../../../actions";

export class RentalCreate extends React.Component{

    constructor(){
        super();

        this.rentalCategories = ["Apartment", "House", "Condo"];
        this.state = {
            errors: [],
            redirect: false
        };

        this.createRental = this.createRental.bind(this);
    }

    createRental(rentalData){
        actions.createRental(rentalData).then(
            (createdRental) => {
                this.setState({
                    redirect: true
                });
            },
            (errors) => {
                this.setState({
                    errors
                });
            });
    }

    render(){
        const {errors,redirect} = this.state;

        if(redirect){
            return <Redirect to={{pathname: "/rentals"}} />
        }

        return(
            <section id="newRental">
                <div className="bwm-form">
                    <div className="row">
                        <div className="col-md-5">
                            <h1 className="page-title">Create Rental</h1>
                            <RentalCreateForm submitCb={this.createRental} options={this.rentalCategories} errors={errors} />
                        </div>
                        <div className="col-md-6 ml-auto">
                            <div className="image-container">
                                <h2 className="catchphrase">Hundreds of awesome places only a few clicks away.</h2>
                                <img src={process.env.PUBLIC_URL + "/img/create-rental.jpg"} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

