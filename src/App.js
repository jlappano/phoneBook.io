import React, { Component } from 'react';
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import './normalize.css';
import './skeleton.css';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        contacts: []
    };
  }

  fetchContacts() {
    let appComponent = this;
    axios.get('http://localhost:3004/contacts')
    .then(function (response) {
      appComponent.setState({
          contacts: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  postContact(name, number, context) {
    let appComponent = this;
    let id = appComponent.state.contacts.length + 1
    axios.post('http://localhost:3004/contacts', {
      id: id,
      name: name,
      number: number,
      context: context
    })
    .then(function (response) {
      appComponent.fetchContacts.call(appComponent);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  filterContact(searchTerm) {
    axios.get('http://localhost:3004/contacts?=' + searchTerm)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    this.fetchContacts.call(this);
  }

  render() {
    return (
      <div className="container">
        <section className="header twelve columns">
          <h2>PhoneBook.io</h2>
        </section>
        <ContactList contacts={this.state.contacts}/>
        <ContactForm postContact={this.postContact.bind(this)}/>
      </div>
    );
  }
}

export default App;
