import React, { Component } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import './normalize.css';
import './skeleton.css';
import './App.css';
import axios from 'axios';
import { CountryCodes } from './data/CountryCodes';

class App extends Component {

  //set initial state as empty contact array
  //listAlerts will be populated by ajax and sent to contact list
  constructor(props) {
    super(props);
    this.state = {
        contacts: [],
        listAlerts: []
    };
  }

  //get request for contacts
  fetchContacts() {
    //get all contacts and set state on success
    axios.get('http://localhost:3004/contacts?_sort=name')
    .then((response) => {
      this.setState({
          contacts: response.data
      });
    })
    //create error alert
    .catch((error) => {
      this.setState({
          listAlerts: [{
            "type": "failed",
            "text": error.message
          }]
      });
    });
  }

  clearAlerts() {
    this.setState({
        listAlerts: []
    });
  }

  //query contact names for LIKE searchterm
  filterContact(searchTerm) {
    axios.get('http://localhost:3004/contacts?name_like=' + searchTerm)
    .then((response) => {
      this.setState({
          contacts: response.data
      });
    })
    //create error alert
    .catch((error) => {
      this.setState({
          listAlerts: [{
            "type": "failed",
            "text": error.message
          }]
      });
    });
  }

  //will be executed when the component is added to the DOM for the first time. 
  //This method is only executed once during the component’s life.
  componentDidMount() {
    this.fetchContacts.call(this);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <section className="header twelve columns">
            <h2>PhoneBook.io</h2>
          </section>
        </div>
        <ContactForm 
          fetchContacts={this.fetchContacts.bind(this)} 
          countryCodes={CountryCodes}
          contactLength={this.state.contacts.length}
        />
        <hr/>
        <ContactList
         alerts={this.state.listAlerts} 
         contacts={this.state.contacts}
         clearAlerts={this.clearAlerts.bind(this)}
         filterContact={this.filterContact.bind(this)}
        />
      </div>
    );
  }
}

export default App;
