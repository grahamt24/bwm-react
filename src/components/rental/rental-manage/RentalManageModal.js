import React from "react";
import Modal from "react-responsive-modal";
import {formatDate} from "../../../helpers";

export class RentalManageModal extends React.Component{

    constructor(){
        super();

        this.state = {
            open: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    renderBookings(bookings){
        return bookings.map((booking, index) => {
            return (
                <React.Fragment key={index}>
                    <p><span>Date:</span> {formatDate(booking.startAt)} - {formatDate(booking.endAt)}</p>
                    <p><span>Guests:</span> {booking.guests}</p>
                    <p><span>Total Price:</span> ${booking.totalPrice}</p>
                    { index + 1 !== bookings.length &&
                        <hr />
                    }
                </React.Fragment>
            )
        })
    }

    openModal(){
        this.setState({
            open: true
        })
    }

    closeModal(){
        this.setState({
            open: false
        })
    }

    render(){
        const {bookings} = this.props;
        return(
            <React.Fragment>
                <button type="button" onClick={this.openModal} className="btn btn-bwm">Bookings</button>
                <Modal open={this.state.open} onClose={this.closeModal} little classNames={{ modal: "rental-booking-modal" }}>
                    <h4 className="modal-title title">Made Bookings</h4>
                    <div className="modal-body bookings-inner-container">
                        {this.renderBookings(bookings)}
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={this.closeModal} className="btn btn-bwm">Cancel</button>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }

}