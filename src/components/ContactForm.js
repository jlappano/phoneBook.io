import React, { PropTypes }  from 'react';
//On Post, the Contact table should preform another GET request to refresh the new list of contacts

const propTypes = {
    countryCodes: PropTypes.array,
    postContact: PropTypes.func,
    messages: PropTypes.array
};

const defaultProps = {
    countryCodes: [],
    postContact: function(){},
    messages: []
};

class ContactForm extends React.Component {

    render() {

        let messagesArray = [];
        this.props.messages.forEach(function (messageObject, i) {
            let htmlMessage = ""
            if(messageObject.type == 'success'){
                htmlMessage = <div key={i} className="msg success-msg">
                  <i className="fa fa-check"></i>
                  <span className="msg-content">{messageObject.text}</span>
                </div>
            } else {
                htmlMessage = <div key={i} className="msg error-msg">
                  <i className="fa fa-exclamation-triangle"></i>
                  <span className="msg-content">{messageObject.text}</span>
                </div>
            }
            messagesArray.push(
                htmlMessage
            );
        });

        let optionsArray = [];
        this.props.countryCodes.forEach(function (countryObject, i) {
            optionsArray.push(
                <option key={i} data-code={countryObject.dial_code} value={countryObject.name}>{countryObject.name}</option>
             );
        });

        return (
            <div>
                <div className="row">
                    {messagesArray}
                </div>
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
                            <select onChange={this.populateDialCode.bind(this)} className="u-full-width" ref="country" id="countryInput">
                            {optionsArray}
                            </select>
                        </div>
                        <div className="four columns">
                            <label>Phone</label>
                            <input className="u-full-width" ref="phone" type="text" id="phoneInput"/>
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

    populateDialCode(e) {
        let index = e.nativeEvent.target.selectedIndex;
        let dialCode = e.nativeEvent.target[index].dataset.code;
        console.log(dialCode);
        this.refs.phone.value = dialCode;
    }

    submit(e) {
        e.preventDefault();
        this.props.postContact(
            this.refs.name.value,
            this.refs.phone.value,
            this.refs.context.value
        )
    }
}

export default ContactForm