import React, { PropTypes } from 'react';

export default class ContactForm extends React.Component {
  render() {
    return (
        <div>
            <h4>Contact Form</h4>
            <form>
            <div className="row">
                <div className="four columns">
                    <label>Name</label>
                    <input className="u-full-width" type="text" id="nameInput"/>
                </div>
                <div className="four columns">
                    <label>Phone</label>
                    <input className="u-full-width" type="text" placeholder="555-555-5555" id="phoneInput"/>
                </div>
                <div className="four columns">
                    <label>Context</label>
                    <input className="u-full-width" type="text" placeholder="Home" id="contextInput"/>
                </div>
            </div>
            <input className="button-primary" type="submit" value="Submit"/>
            </form>
        </div>
    );
  }
}