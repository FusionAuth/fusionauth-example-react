import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Greeting from './components/Greeting.js';
import LogInOut from './components/LogInOut.js';
import Response from './components/Response.js';
import UserData from './components/UserData.js';

const config = require('../../config');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {} // this is the body from /user
    };
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:${config.serverPort}/user`, {
      credentials: 'include' // fetch won't send cookies unless you set credentials
    })
      .then(response => response.json())
      .then(response => this.setState(
        {
          body: response
        })
      );
  }

  handleTextInput(event) {
    // update this.state.body.registration.data.userData
    let body = this.state.body;
    body.registration.data = {userData: event.target.value};
    this.setState(
      {
        body: body
      });

    // save the change in FusionAuth
    fetch(`http://localhost:${config.serverPort}/set-user-data`,
          {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                userData: event.target.value
              })
          });
  }

  render() {
    return (
      <div id='App'>
        <header>
          <h1>FusionAuth Example: React</h1>
          <Greeting body={this.state.body}/>
          <LogInOut body={this.state.body} uri={`http://localhost:${config.serverPort}`}/>
        </header>
        <main>
          <UserData body={this.state.body} handleTextInput={this.handleTextInput}/>
          <Response body={this.state.body}/>
        </main>
        <footer>
          <a href='https://fusionauth.io/docs/v1/tech/tutorials/'>Learn how this app works.</a>
          <a href='https://twitter.com/fusionauth'>Tweet your questions at us.</a>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#Container'));
