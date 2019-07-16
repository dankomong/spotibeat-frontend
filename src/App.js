import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react'
import Login from './components/Login';
import HomeContainer from './components/HomeContainer';
import Navbar from './components/Navbar';
import TrackContainer from './components/TrackContainer'
import LibraryContainer from './components/LibraryContainer'
import ProfileContainer from './components/ProfileContainer'
import ReviewsContainer from './components/ReviewsContainer'
import GenreContainer from './components/GenreContainer'

// Getting the code from the query params
const queryString = require('query-string');
let parsed = null;

class App extends Component {

  state = {
    loading: true,
    // playing: false
  }

  // playerCheckInterval = null;

  // checkForPlayer = () => {
  //   const token = localStorage.getItem("token")
  //   if (window.Spotify !== null) {
  //     clearInterval(this.playerCheckInterval);
  //     this.player = new window.Spotify.Player({
  //       name: "Danko's Spotify Player",
  //       getOAuthToken: cb => { cb(token); },
  //     });
  //     this.createEventHandlers();
  //
  //     // finally, connect!
  //     this.player.connect();
  //   }
  // }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error("initialization_error", e); });
    this.player.on('authentication_error', e => {
      console.error("authentication_error", e);

    });
    this.player.on('account_error', e => { console.error("account_error", e); });
    this.player.on('playback_error', e => { console.error("playback error", e); });

    // Playback status updates
    this.player.on('player_state_changed', state => { console.log(state); });

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      this.setState({ deviceId: device_id });
    });
  }


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

        // Spotify SDK
        // this.checkForPlayer()
        // this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
        //

        this.props.setCurrentUser(parsedRes.user)
      })

      // fetch to get tracks, recent tracks, genres, and artists
      fetch('http://localhost:3001/api/v1//get-tracks-genres-and-artists').then(res => res.json())
        .then(parsedRes => {
          this.setState({
            loading: false
          })
          this.props.setTracks(parsedRes.tracks)
          this.props.setRecentlyPlayedTracks(parsedRes.recent_tracks)
          this.props.setGenres(parsedRes.genres)
          this.props.setArtists(parsedRes.artists)
        })

      // // fetch to get Tracks
      // fetch('http://localhost:3001/api/v1/all-track-features').then(res => res.json())
      //    .then(parsedRes => {
      //      console.log('RES',parsedRes)
      //
      //
      //    })


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

        // Spotify SDK
        // this.checkForPlayer()
        // this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
        //

        this.props.setCurrentUser(parsedRes.user)
      })
    }



  }

  parsedCode = () => {
    return queryString.parse(this.props.location.search);
  }

  onPrevClick() {
    this.player.previousTrack();
  }

  onPlayClick() {
    this.player.togglePlay();
  }

  onNextClick() {
    this.player.nextTrack();
  }

  render() {
    // console.log('APP')
    console.log('genres from app.js', this.props.genres);
    return (
      <div className="App">
          {this.props.currentUser ?
            <div>
              <Navbar path={this.props.location.pathname} history={this.props.history}/>
                <Switch>
                  {this.state.loading ?
                    <Dimmer active>
                    <Loader content='Loading' />
                  </Dimmer> : <Route exact path="/home" render={(routerProps) => <HomeContainer {...routerProps} />} />}
                  <Route exact path="/profile" render={(routerProps) => <ProfileContainer {...routerProps} />} />
                  <Route exact path="/artists" render={(routerProps) => <LibraryContainer {...routerProps} />} />
                  <Route exact path="/tracks" render={(routerProps) => <TrackContainer {...routerProps} />} />
                  <Route exact path="/reviews" render={(routerProps) => <ReviewsContainer {...routerProps} />} />
                  <Route exact path="/genres" render={(routerProps) => <GenreContainer {...routerProps} />} />
                </Switch>
            </div> :
            <Route exact path="/login" render={(routerProps) => <Login {...routerProps}/>}/>
          }
          {this.props.url === "" && this.props.currentUser ? null : <div className="player-container">
            <iframe src={this.props.url.split("/track/").join("/embed/track/")} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>}


      </div>
    )
  }

} // end of class

function mapStateToProps(state) {
  return {currentUser: state.currentUser, reviews: state.reviews, artists: state.artists, url: state.currentTrackURL, genres: state.genres}
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
    },
    setTracks: (tracks) => {
      dispatch({type: "SET_TRACKS", payload: tracks})
    },
    setRecentlyPlayedTracks: (tracks) => {
      dispatch({type: "SET_RECENTLY_PLAYED_TRACKS", payload: tracks})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
