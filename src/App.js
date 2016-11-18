import React, { Component } from 'react';
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import './normalize.css';
import './skeleton.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <section className="header twelve columns">
          <h2>PhoneBook.io</h2>
        </section>
        <ContactList/>
        <ContactForm/>
      </div>
    );
  }
}

export default App;
