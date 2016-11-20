import React, { PropTypes }  from 'react';
//On Post, the Contact table should preform another GET request to refresh the new list of contacts

const propTypes = {
    countryCodes: PropTypes.array,
    postContact: PropTypes.func
};

const defaultProps = {
    countryCodes: [],
    postContact: function(){}
};


class ContactForm extends React.Component {

    render() {

        let optionsArray = [];
        this.props.countryCodes.forEach(function (countryObject, i) {
            optionsArray.push(
                <option key={i} data-code={countryObject.dial_code} value={countryObject.name}>{countryObject.name}</option>
             );
        });

        return (
            <div>
                <h4>New Contact</h4>
                <form>
                <div className="row">
                    <div className="four columns">
                        <label>Name</label>
                        <input className="u-full-width" ref="name" type="text" id="nameInput"/>
                    </div>
                    <div className="two columns">
                        <label>Country</label>
                        <select onChange={this.populateDialCode.bind(this)} className="u-full-width" ref="country" id="countryInput">
                        {optionsArray}
                        </select>
                    </div>
                    <div className="two columns">
                        <label>Phone</label>
                        <input className="u-full-width" ref="phone" type="text" id="phoneInput"/>
                    </div>
                    <div className="two columns">
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