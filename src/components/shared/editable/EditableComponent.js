import React from "react";

export class EditableComponent extends React.Component{

    constructor(){
        super();

        this.state = {
            isActive: false,
            value: "",
            originValue: ""
        }
    }

    componentDidMount(){
        const {entity, entityField} = this.props;
        const value = entity[entityField];

        this.setState({
            value,
            originValue: value
        });
    }

    componentDidUpdate(){
        const {errors, entityField, entity, resetRentalErrors} = this.props;

        if(errors && errors.length > 0 && errors[0].title === entityField){
            this.setState({
                value: entity[entityField],
                originValue: entity[entityField],
                isActive: false
            });
            resetRentalErrors();
        }
    }

    disableEdit(){
        this.setState({
            isActive: false
        })
    }

    enableEdit(){
        this.setState({
            isActive: true
        })
    }

    update(){
        const {value, originValue} = this.state;
        const {updateEntity,entityField} = this.props;

        if(value !== originValue){
            updateEntity({
                [entityField]: value
            });
            this.setState({
                isActive: false,
                originValue: value
            })
        }
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

}