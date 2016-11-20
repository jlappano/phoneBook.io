import React, { PropTypes } from 'react';

const propTypes = {
    postContact: PropTypes.func
};

const defaultProps = {
    postContact: function(){}
};

//On Post, the Contact table should preform another GET request to refresh the new list of contacts


export default class ContactForm extends React.Component {

    render() {
        return (
            <div>
                <h4>New Contact</h4>
                <form>
                <div className="row">
                    <div className="four columns">
                        <label>Name</label>
                        <input className="u-full-width" ref="name" type="text" id="nameInput"/>
                    </div>
                    <div className="four columns">
                        <label>Phone</label>
                        <input className="u-full-width" ref="phone" type="text" placeholder="555-555-5555" id="phoneInput"/>
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

    submit(e) {
        console.log(this);
        e.preventDefault();
        this.props.postContact(
            this.refs.name.value,
            this.refs.phone.value,
            this.refs.context.value
        )
    }
}