import React, { PropTypes } from 'react';

const propTypes = {
    contacts: PropTypes.array
};

const defaultProps = {
    contacts: [],
};

export default class ContactTable extends React.Component {
  render() {
    let contactArray = [];
    this.props.contacts.forEach(function (contact, i) {
        contactArray.push(
        <tr key={i}>
          <td>{contact.name}</td>
          <td>{contact.number}</td>
          <td>{contact.context}</td>
        </tr>);
    }.bind(this));


    return (
        <div className="contact-table">
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Context</th>
                </tr>
              </thead>
              <tbody>
                {contactArray}
              </tbody>
            </table>
        </div>
    );
  }
}