import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
         <Route exact path="/login" render={() => <Login />} />
         <Route path="/success" render={() => <div>Success!</div>} />
         <Route path="/user" render={() => <div></div>} />
      </div>
    )
  }

}

export default App;
