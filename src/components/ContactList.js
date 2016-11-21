import React, { PropTypes } from 'react';
import ContactTable from './ContactTable';
import Alerts from './Alerts';

export default class ContactList extends React.Component {

    render() {
        return (
            <div className="contact-list">
                <Alerts alerts={this.props.alerts} clearAlerts={this.props.clearAlerts.bind(this)}/>
                <div className="row">
                    <h4>Contact List</h4>
                </div>
                <ContactTable contacts={this.props.contacts}/>
            </div>
        );
    }
}

ContactList.propTypes = {
    contacts: PropTypes.array,
    alerts: PropTypes.array,
    clearAlerts: PropTypes.func
};

ContactList.defaultProps = {
    contacts: [],
    alerts: [],
    clearAlerts: function(){}
};