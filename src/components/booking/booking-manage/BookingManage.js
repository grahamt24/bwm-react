import React from "react";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import * as actions from "../../../actions/index";
import {BookingCard} from "./BookingCard";

class BookingManage extends React.Component {

    componentWillMount(){
        this.props.dispatch(actions.fetchUserBookings());
    }

    renderBookings(bookings){
        return bookings.map((booking, index) => {
            return (
                <BookingCard key={index} booking={booking}/>
            )
        })
    }

    render(){
        console.log(this.props);
        const {isFetching, bookings} = this.props;
        return (
            <section id="userBookings">
                <h1 className="page-title">My Bookings</h1>
                <div className="row">
                    {this.renderBookings(bookings)}
                </div>
                { bookings.length === 0 && !isFetching &&
                    <div className="alert alert-warning">
                        You have no bookings created go to rentals section and book your place today.
                        <Link style={{"marginLeft": "10px"}} className="btn btn-bwm" to="/rentals">Available
                            Rental</Link>
                    </div>
                }
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
        isFetching: state.booking.isFetching,
        bookings: state.booking.data
    }
}
export default connect(mapStateToProps)(BookingManage)