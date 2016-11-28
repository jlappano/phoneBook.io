import React, { PropTypes }  from 'react';
import axios from 'axios';
import Alerts from './Alerts';

let defaultDialCode = "+1";
let defaultCountry = "United States";

export default class ContactForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alerts: []
        };
    }

    //clear alerts and trigger re render
    clearAlerts() {
        this.setState({
            alerts: []
        });
    }

    //POST request, create success alert and trigger get all request on success
    //create error message on error
    postContact(name, number, context) {
        //id is required by json server for new contact
        let id = this.props.contactLength + 1
        axios.post('http://localhost:3004/contacts', {
          id: id,
          name: name,
          number: number,
          context: context
        })
        .then((response) => {
          this.setState({
            alerts: [{
                "type": "success",
                "text": "Created new contact for " + response.data.name
            }]
          });
          this.props.fetchContacts();
        })
        .catch((error) => {
          this.setState({
            alerts: [{
              "type": "failed",
              "text": error.message
            }]
          });
        });
    }

    //populate phone input with call prefix based on chosen country
    populateDialCode(e) {
        let index = e.nativeEvent.target.selectedIndex;
        let dialCode = e.nativeEvent.target[index].dataset.code;
        this.refs.phone.value = dialCode;
    }

    //reset any error classes on inputs, revert to default values
    resetInputs() {
        this.toggleInputError(this.refs.name, true);
        this.toggleInputError(this.refs.phone, true);
        this.toggleInputError(this.refs.context, true);

        this.refs.name.value = "";
        this.refs.country.value = defaultCountry;
        this.refs.phone.value = defaultDialCode;
        this.refs.context.value = "";
    }

    //remove or add required class to outline inputs in red
    toggleInputError(element, isValid) {
        if(isValid){
            element.classList.remove("required");
        } else {
            element.classList.add("required");
        }
    }

    //validate that all fields are not empty
    validateInputs() {
        let valid = true
        if(this.refs.name.value === null || this.refs.name.value === ""){
            this.toggleInputError(this.refs.name, false);
            valid = false;
        } else {
            this.toggleInputError(this.refs.name, true);
        }
        if(this.refs.phone.value === null || this.refs.phone.value === ""){
            this.toggleInputError(this.refs.phone, false);
            valid = false;
        } else {
            this.toggleInputError(this.refs.phone, true);
        }
        if(this.refs.context.value === null || this.refs.context.value === ""){
            this.toggleInputError(this.refs.context, false);
            valid = false;
        } else {
            this.toggleInputError(this.refs.context, true);
        }

        return valid;
    }

    //prevent form from submitting, 
    //check validity of inputs
    //strip extra characters from phone input
    //make POST request, reset form on success
    //create error alert on error 
    submit(e) {
        e.preventDefault();
        if(this.validateInputs()){
            //remove everything not a number or a + character
            let formattedPhone = this.refs.phone.value.replace(/[^+0-9]/g, '');
            this.postContact(
                this.refs.name.value,
                formattedPhone,
                this.refs.context.value
            )
            this.resetInputs();
        } else {
            this.setState({
                alerts: [{
                    "type" : "failed",
                    "text" : "Invalid form fields"
                }]
            });
        }
    }

    render() {
        let optionsArray = [];
        this.props.countryCodes.forEach((countryObject, i) => {
            optionsArray.push(
                <option key={i} data-code={countryObject.dial_code} value={countryObject.name}>{countryObject.name}</option>
             );
        });

        return (
            <div>
                <Alerts alerts={this.state.alerts} clearAlerts={this.clearAlerts.bind(this)}/>
                <h4>New Contact</h4>
                <form>
                    <div className="row">
                        <div className="three columns">
                            <label>Name</label>
                            <input className="u-full-width" ref="name" type="text" id="nameInput"/>
                        </div>
                        <div className="three columns">
                            <label>Country</label>
                            <select defaultValue={defaultCountry} onChange={this.populateDialCode.bind(this)} className="u-full-width" ref="country" id="countryInput">
                            {optionsArray}
                            </select>
                        </div>
                        <div className="three columns">
                            <label>Phone</label>
                            <input className="u-full-width" ref="phone" type="text" id="phoneInput" defaultValue={defaultDialCode}/>
                        </div>
                        <div className="three columns">
                            <label>Context</label>
                            <input className="u-full-width" ref="context" type="text" placeholder="Home" id="contextInput"/>
                        </div>
                    </div>
                    <input onClick={this.submit.bind(this)} className="button-primary" type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

ContactForm.propTypes = {
    countryCodes: PropTypes.array,
    fetchContacts: PropTypes.func,
    contactLength: PropTypes.number
};

ContactForm.defaultProps = {
    countryCodes: [],
    fetchContacts: function(){},
    contactLength: 0
};