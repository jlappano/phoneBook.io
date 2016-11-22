import React, { PropTypes } from 'react';
import ContactTable from './ContactTable';
import Alerts from './Alerts';

export default class ContactList extends React.Component {

    submit(e) {
        e.preventDefault();
        this.props.filterContact(this.refs.filter.value);
    }

    render() {
        return (
            <div className="contact-list">
                <Alerts alerts={this.props.alerts} clearAlerts={this.props.clearAlerts.bind(this)}/>
                <div className="row">
                    <h4>Contact List</h4>
                </div>
                <div className="row">
                        <input className="" ref="filter" type="search" placeholder="Filter By Name" id="filterInput"/>
                        <a onClick={this.submit.bind(this)} className="button button-primary search-button" href="#"><i className="fa fa-search"></i></a>
                </div>
                <ContactTable contacts={this.props.contacts}/>
            </div>
        );
    }
}

ContactList.propTypes = {
    contacts: PropTypes.array,
    alerts: PropTypes.array,
    clearAlerts: PropTypes.func,
    filterContact: PropTypes.func
};

ContactList.defaultProps = {
    contacts: [],
    alerts: [],
    clearAlerts: function(){},
    filterContact: function(){}
};