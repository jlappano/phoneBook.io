import React, { PropTypes } from 'react';
import ContactTable from './ContactTable';

const propTypes = {
    contacts: PropTypes.array,
    messages: PropTypes.array
};

const defaultProps = {
    contacts: [],
    messages: []
};



export default class ContactList extends React.Component {
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


    return (
        <div className="contact-list">
        <div className="row">
            {messagesArray}
            <h4>Contact List</h4>
        </div>
        <ContactTable contacts={this.props.contacts}/>
        </div>
    );
  }
}