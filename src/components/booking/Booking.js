import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { ToastContainer, toast } from 'react-toastify';
import {BookingModal} from "./BookingModal";
import {getRangeOfDates} from "../../helpers";

import * as moment from "moment";
import * as actions from "../../actions";

export class Booking extends React.Component {

    INITIAL_BOOKING_STATE = {
        startAt: "",
        endAt: "",
        guests: "",
        rental: {}
    };

    constructor(){
        super();

        this.bookedOutDates = [];
        this.dateRef= React.createRef();
        this.state = {
            proposedBooking: this.INITIAL_BOOKING_STATE,
            modal: {
                open: false
            },
            errors: []
        };

        this.checkInvalidDates = this.checkInvalidDates.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.cancelConfirmation = this.cancelConfirmation.bind(this);
        this.reserveRental = this.reserveRental.bind(this);
    }

    componentWillMount(){
        this.getBookedOutDates();
    }

    getBookedOutDates(){
        const {bookings} = this.props.rental;

        if(bookings && bookings.length > 0){
            bookings.forEach(booking => {
                const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
                this.bookedOutDates.push(...dateRange);
            })
        }
    }

    checkInvalidDates(date){
        return this.bookedOutDates.includes(date.format("MM/DD/Y")) || date.diff(moment(), "days") < 0
    }

    handleApply(event, picker){
        const startAt = picker.startDate.format("MM/DD/Y");
        const endAt = picker.endDate.format("MM/DD/Y");

        this.dateRef.current.value = `${startAt} to ${endAt}`;

        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                startAt,
                endAt
            }
        });
    }

    selectGuests(event){
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                guests: parseInt(event.target.value, 10)
            }
        })
    }

    confirmProposedData(){
        const {startAt, endAt} = this.state.proposedBooking;
        const days = getRangeOfDates(startAt, endAt).length-1;
        const {rental} = this.props;

        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                days,
                totalPrice: days * rental.dailyRate,
                rental
            },
            modal: {
                open: true
            }
        })
    }

    cancelConfirmation(){
        this.setState({
            modal: {
                open: false
            }
        })
    }

    addNewBookedOutDates(booking){
        const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
    }

    resetForm(){
        this.dateRef.current.value = "";

        this.setState({
            proposedBooking: this.INITIAL_BOOKING_STATE
        });
    }

    reserveRental(){
        actions.createBooking(this.state.proposedBooking).then(
            (booking) => {
                this.addNewBookedOutDates(booking);
                this.cancelConfirmation();
                this.resetForm();
                toast.success("Booking has been successfully created!");
            },
            (errors) => {
                this.setState({
                    errors
                });
            }
        )
    }

    render() {
        const { rental } = this.props;
        const {startAt, endAt, guests} = this.state.proposedBooking;

        return (
            <div className="booking">
                <ToastContainer />
                <h3 className="booking-price">${rental.dailyRate} <span className="booking-per-night">per night</span></h3>
                <hr></hr>
                <div className="form-group">
                    <label htmlFor="dates">Dates</label>
                    <DateRangePicker onApply={this.handleApply}
                                     isInvalidDate={this.checkInvalidDates}
                                     opens="left"
                                     containerStyles={{display: "block"}}>
                        <input ref={this.dateRef}
                               id="dates"
                               type="text"
                               className="form-control">
                        </input>
                    </DateRangePicker>
                </div>
                <div className="form-group">
                    <label htmlFor="guests">Guests</label>
                    <input onChange={(event) => {this.selectGuests(event)}}
                           value={guests}
                           type="number"
                           className="form-control"
                           id="guests"
                           aria-describedby="guests"
                           placeholder="">
                    </input>
                </div>
                <button disabled={!startAt || !endAt || !guests}
                        onClick={() => this.confirmProposedData()}
                        className="btn btn-bwm btn-confirm btn-block">Reserve place now</button>
                <hr></hr>
                <p className="booking-note-title">People are interested into this house</p>
                <p className="booking-note-text">
                    More than 500 people checked this rental in last month.
                </p>
                <BookingModal open={this.state.modal.open}
                              closeModal={this.cancelConfirmation}
                              confirmModal={this.reserveRental}
                              errors={this.state.errors}
                              booking={this.state.proposedBooking} />
            </div>
        )
    }
}
