import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import HomeContainer from './components/HomeContainer';
import Navbar from './components/Navbar';
import TrackContainer from './components/TrackContainer'
import LibraryContainer from './components/LibraryContainer'
import ProfileContainer from './components/ProfileContainer'
import ReviewsContainer from './components/ReviewsContainer'

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

    // fetch to get genres and artists
    fetch('http://localhost:3001/api/v1//get-genres-and-artists').then(res => res.json())
      .then(parsedRes => {
        this.props.setGenres(parsedRes.genres)
        this.props.setArtists(parsedRes.artists)
      })

  }

  parsedCode = () => {
    return queryString.parse(this.props.location.search);
  }

  render() {
    console.log('CURRENT USER', this.props.currentUser)
    console.log('revieww', this.props.reviews);
    return (
      <div className="App">
          {this.props.currentUser ?
            <div>
              <Navbar path={this.props.location.pathname}/>
                <Switch>
                  <Route exact path="/home" render={(routerProps) => <HomeContainer {...routerProps} />} />
                  <Route exact path="/profile" render={(routerProps) => <ProfileContainer {...routerProps} />} />
                  <Route exact path="/library" render={(routerProps) => <LibraryContainer {...routerProps} />} />
                  <Route exact path="/tracks" render={(routerProps) => <TrackContainer {...routerProps} />} />
                  <Route exact path="/reviews" render={(routerProps) => <ReviewsContainer {...routerProps} />} />
                </Switch>
            </div> :
            <Route exact path="/login" render={(routerProps) => <Login {...routerProps}/>}/>
          }
      </div>
    )
  }

} // end of class

function mapStateToProps(state) {
  return {currentUser: state.currentUser, reviews: state.reviews}
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    },
    setGenres: (genres) => {
      dispatch({type: "SET_GENRES", payload: genres})
    },
    setArtists: (artists) => {
      dispatch({type: "SET_ARTISTS", payload: artists})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
