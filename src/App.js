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
        messages: []
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
    //TODO diplay error
    .catch(function (error) {
      appComponent.setState({
          messages: [{
            "type": "failed",
            "text": error.message
          }]
      });
    });
  }


  postContact(name, number, context) {
    //scope this to component
    let appComponent = this;
    //id is required by json server for new contact
    let id = appComponent.state.contacts.length + 1
    axios.post('http://localhost:3004/contacts', {
      id: id,
      name: name,
      number: number,
      context: context
    })
    .then(function (response) {
      console.log(response);
      appComponent.setState({
        messages: [{
          "type": "success",
          "text": "Created new contact for " + response.data.name
        }]
      });
      appComponent.fetchContacts.call(appComponent);
    })
    .catch(function (error) {
      appComponent.setState({
        messages: [{
          "type": "failed",
          "text": error.message
        }]
      });
    });
  }

  filterContact(searchTerm) {
    //scope this to component
    let appComponent = this;
    axios.get('http://localhost:3004/contacts?=' + searchTerm)
    .then(function (response) {
      console.log(response);
      appComponent.fetchContacts.call(appComponent);
    })
    .catch(function (error) {
      console.log(error);
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
        <ContactList messages={this.state.messages} contacts={this.state.contacts}/>
        <ContactForm messages={this.state.messages} postContact={this.postContact.bind(this)} countryCodes={CountryCodes}/>
      </div>
    );
  }
}

export default App;
