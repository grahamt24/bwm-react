import React from "react";
import {connect} from "react-redux";
import {MapWithGeocode} from "../../map/GoogleMap";
import * as actions from "../../../actions"

class RentalMap extends React.Component{

    constructor() {
        super();
        this.reloadMapFinish = this.reloadMapFinish.bind(this);
    }


    reloadMapFinish(){
        this.props.dispatch(actions.reloadMapFinish());
    }

    render(){
        const {location, map: {isReloading}} = this.props;

        return (
            <MapWithGeocode
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSVzq-pFeyGePh2RBD-i8qGjQvecm1GBA&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
                mapLoaded={this.reloadMapFinish}
                isReloading={isReloading}
            />
        )
    }
}

function mapStateToProps(state){
    return {
        map: state.map
    }
}

export default connect(mapStateToProps)(RentalMap)