import React, { PropTypes } from 'react';

export default class ContactTable extends React.Component {
  render() {

    let contactArray = [];

    //render contacts for table
    //contacts populated in App.js
    this.props.contacts.forEach((contact, i) => {
        contactArray.push(
        <tr key={i}>
          <td>{contact.name}</td>
          <td>{contact.number}</td>
          <td>{contact.context}</td>
        </tr>);
    });

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

ContactTable.propTypes = {
  contacts: PropTypes.array
};

ContactTable.defaultProps = {
  contacts: []
};