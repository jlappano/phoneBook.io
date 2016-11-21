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

    clearAlerts() {
        this.setState({
            alerts: []
        });
    }

    postContact(name, number, context) {
        //scope this to component
        let formComponent = this;
        //id is required by json server for new contact
        let id = formComponent.props.contactLength + 1
        axios.post('http://localhost:3004/contacts', {
          id: id,
          name: name,
          number: number,
          context: context
        })
        .then(function (response) {
          formComponent.setState({
            alerts: [{
                "type": "success",
                "text": "Created new contact for " + response.data.name
            }]
          });
          formComponent.props.fetchContacts();
        })
        .catch(function (error) {
          formComponent.setState({
            alerts: [{
              "type": "failed",
              "text": error.message
            }]
          });
        });
    }

    populateDialCode(e) {
        let index = e.nativeEvent.target.selectedIndex;
        let dialCode = e.nativeEvent.target[index].dataset.code;
        this.refs.phone.value = dialCode;
    }

    validateInputs() {
        let valid = true
        if(this.refs.name.value === null || this.refs.name.value === ""){
            this.refs.name.className += " required";
            valid = false;
        }
        if(this.refs.phone.value === null || this.refs.phone.value === ""){
            this.refs.phone.className += " required";
            valid = false;
        }
        if(this.refs.context.value === null || this.refs.context.value === ""){
            this.refs.context.className += " required";
            valid = false;
        }

        return valid;
    }

    submit(e) {
        e.preventDefault();
        if(this.validateInputs()){
            this.postContact(
                this.refs.name.value,
                this.refs.phone.value,
                this.refs.context.value
            )
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
        this.props.countryCodes.forEach(function (countryObject, i) {
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
                        <div className="four columns">
                            <label>Name</label>
                            <input className="u-full-width" ref="name" type="text" id="nameInput"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="four columns">
                            <label>Country</label>
                            <select defaultValue={defaultCountry} onChange={this.populateDialCode.bind(this)} className="u-full-width" ref="country" id="countryInput">
                            {optionsArray}
                            </select>
                        </div>
                        <div className="four columns">
                            <label>Phone</label>
                            <input className="u-full-width" ref="phone" type="text" id="phoneInput" defaultValue={defaultDialCode}/>
                        </div>
                        <div className="four columns">
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