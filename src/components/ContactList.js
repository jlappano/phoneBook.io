import React, { PropTypes } from 'react';
import ContactTable from './ContactTable';

export default class ContactList extends React.Component {
  render() {
    return (
        <div className="contact-list">
        <h4>Contact List</h4>
        <button className="button-primary">View Contacts</button>
        <ContactTable/>
        </div>
    );
  }
}