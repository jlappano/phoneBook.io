import React, { PropTypes } from 'react';
import ContactTable from './ContactTable';

const propTypes = {
    contacts: PropTypes.array
};

const defaultProps = {
    contacts: [],
};

export default class ContactList extends React.Component {
  render() {
    return (
        <div className="contact-list">
        <h4>Contact List</h4>
        <ContactTable contacts={this.props.contacts}/>
        </div>
    );
  }
}