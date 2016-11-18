import React, { PropTypes } from 'react';

export default class ContactTable extends React.Component {
  render() {
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
                <tr>
                  <td>Dave Gamache</td>
                  <td>203-751-5747</td>
                  <td>Cell</td>
                </tr>
              </tbody>
            </table>
        </div>
    );
  }
}