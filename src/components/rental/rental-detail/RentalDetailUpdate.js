import React from "react";
import {RentalAssets} from "./RentalAssets";
import {EditableInput} from "../../shared/editable/EditableInput";
import {EditableText} from "../../shared/editable/EditableText";
import {EditableSelect} from "../../shared/editable/EditableSelect";
import { toast } from "react-toastify";
import {toUpperCase} from "../../../helpers";

import * as actions from "../../../actions";

export class RentalDetailUpdate extends React.Component {

    constructor(){
        super();

        this.updateRental = this.updateRental.bind(this);
        this.resetRentalErrors = this.resetRentalErrors.bind(this);
    }

    updateRental(rentalData){
        const {rental: {_id}} = this.props;
        this.props.dispatch(actions.updateRental(_id, rentalData))
    }

    resetRentalErrors(){
        this.props.dispatch(actions.resetRentalErrors());
    }

    render() {
        const {rental, errors} = this.props;

        if(errors && errors.length > 0){
            toast.error(`Could not update rental. ${errors[0].detail}`);
        }

        return (
            <div className="rental">
                <label className={` rental-label rental-type ${rental.category}`}>Shared?</label>
                <EditableSelect entity={rental}
                                entityField={"shared"}
                                updateEntity={this.updateRental}
                                options={[true, false]}
                                errors={errors}
                                containerStyle={{"display": "inline-block"}}
                                resetRentalErrors={this.resetRentalErrors}
                                className={`rental-type ${rental.category}`} />

                <EditableSelect entity={rental}
                                entityField={"category"}
                                updateEntity={this.updateRental}
                                errors={errors}
                                options={["apartment", "house", "condo"]}
                                resetRentalErrors={this.resetRentalErrors}
                                className={`rental-type ${rental.category}`} />

                <div className="rental-owner">
                    <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
                    <span>{rental.user && rental.user.username}</span>
                </div>
                <EditableInput entity={rental}
                               entityField={"title"}
                               updateEntity={this.updateRental}
                               errors={errors}
                               resetRentalErrors={this.resetRentalErrors}
                               className={"rental-title"} />

                <EditableInput entity={rental}
                               entityField={"city"}
                               updateEntity={this.updateRental}
                               errors={errors}
                               formatPipe={[toUpperCase]}
                               resetRentalErrors={this.resetRentalErrors}
                               className={"rental-city"} />

                <EditableInput entity={rental}
                               entityField={"street"}
                               updateEntity={this.updateRental}
                               errors={errors}
                               resetRentalErrors={this.resetRentalErrors}
                               className={"rental-street"} />
                <div className="rental-room-info">
                    <span><i className="fa fa-building" />
                        <EditableInput entity={rental}
                                       entityField={"bedrooms"}
                                       updateEntity={this.updateRental}
                                       errors={errors}
                                       containerStyle={{"display": "inline-block"}}
                                       resetRentalErrors={this.resetRentalErrors}
                                       className={"rental-bedrooms"} />
                        bedrooms</span>
                    <span><i className="fa fa-user" /> {rental.bedrooms + 4} guests</span>
                    <span><i className="fa fa-bed" /> {rental.bedrooms + 2} beds</span>
                </div>
                <EditableText entity={rental}
                              entityField={"description"}
                              updateEntity={this.updateRental}
                              errors={errors}
                              containerStyle={{"display": "inline-block"}}
                              resetRentalErrors={this.resetRentalErrors}
                              className={"rental-description"}
                              rows={6}
                              cols={50} />
                <hr></hr>
                <RentalAssets/>
            </div>
        )

    }
}