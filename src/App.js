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
  constructor(props) {
    super(props);
    this.state = {
        contacts: [],
        listAlerts: []
    };
  }

  fetchContacts() {
    //scope this to component
    let appComponent = this;
    //get all contacts and set state on success
    axios.get('http://localhost:3004/contacts')
    .then(function (response) {
      appComponent.setState({
          contacts: response.data
      });
    })
    .catch(function (error) {
      appComponent.setState({
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

  filterContact(searchTerm) {
    //scope this to component
    let appComponent = this;
    axios.get('http://localhost:3004/contacts?name_like=' + searchTerm)
    .then(function (response) {
      appComponent.setState({
          contacts: response.data
      });
    })
    .catch(function (error) {
      appComponent.setState({
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
