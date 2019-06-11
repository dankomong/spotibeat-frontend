import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import HomeContainer from './components/HomeContainer';
import Navbar from './components/Navbar';
import TrackContainer from './components/TrackContainer'

// Getting the code from the query params
const queryString = require('query-string');
let parsed = null;

class App extends Component {

  componentDidMount() {
    console.log("code: ", this.parsedCode())
    const accessToken = localStorage.getItem("token")
    console.log("token: ", accessToken)
    if (accessToken){
      fetch('http://localhost:3001/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_token: accessToken
        })
      }).then(res => res.json()).then(parsedRes => {
        this.props.setCurrentUser(parsedRes.user)
      })
    } else if(this.parsedCode().code){
      fetch('http://localhost:3001/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          code: this.parsedCode().code
        })
      }).then(res => res.json()).then(parsedRes => {
        console.log('ACCESS TOKEN', parsedRes)
        localStorage.setItem("token", parsedRes.token)
        this.props.setCurrentUser(parsedRes.user)
      })
    }

  }

  parsedCode = () => {
    return queryString.parse(this.props.location.search);
  }

  render() {
    console.log('CURRENT USER', this.props.currentUser)
    return (
      <div className="App">
          {this.props.currentUser ?
            <div>
              <Navbar/>
                <Switch>
                  <Route exact path="/home" render={(routerProps) => <HomeContainer {...routerProps} />} />
                  <Route exact path="/playlists" render={(routerProps) => <div>Playlists</div>} />
                  <Route exact path="/library" render={(routerProps) => <div>Library</div>} />
                  <Route exact path="/tracks" render={(routerProps) => <TrackContainer {...routerProps} />} />
                </Switch>
            </div> :
            <Route exact path="/login" render={(routerProps) => <Login {...routerProps}/>}/>
          }
      </div>
    )
  }

} // end of class

function mapStateToProps(state) {
  return {currentUser: state.currentUser}
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
  }}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
