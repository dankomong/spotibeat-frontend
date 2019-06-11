import React, { Component } from 'react'
import StackGrid from "react-stack-grid";
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import '../assets/Track.css'

import Track from './Track'

class TrackContainer extends Component {

  state = {
    recentlyPlayedClicked: false
  }

  renderAllTracks = () => {
    return this.props.tracks.map(track => {
      return <Track key={track.id} img_url={track.album.image_url_medium} {...track} />
    })
  }

  renderRecentlyPlayedTracks = () => {
    return this.props.recentlyPlayedTracks.items.map(item => {
      return <Track key={item.track.id} img_url={item.track.album.images[1].url} artists={item.track.artists} name={item.track.name} />
    })
  }

  handleRecentlyPlayedClicked = () => {
    this.setState({
      recentlyPlayedClicked: true
    })
  }

  handleAllTracks = () => {
    this.setState({
      recentlyPlayedClicked: false
    })
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/tracks').then(res => res.json())
      .then(parsedRes => {
        console.log('wtf is this', parsedRes)
        this.props.setTracks(parsedRes)
      })
    if (this.props.recentlyPlayedTracks.length === 0) {
      console.log('hit')
      fetch('http://localhost:3001/api/v1/tracks/recently-played').then(res => res.json())
        .then(parsedRes => {
          this.props.setRecentlyPlayedTracks(parsedRes)
        })
    }
  }

  render() {
    console.log('FUCK', this.props.recentlyPlayedTracks)
    return (
      <div id="track-container">
        <div>
          <Button color='black' onClick={this.handleAllTracks}>
            All Tracks
          </Button>
          <Button color='black' onClick={this.handleRecentlyPlayedClicked}>
            Recently Played
          </Button>
        </div>
        {this.state.recentlyPlayedClicked ?
          <StackGrid columnWidth={300}>
            {this.renderRecentlyPlayedTracks()}
          </StackGrid>  :
          <StackGrid columnWidth={300}>
            {this.renderAllTracks()}
          </StackGrid>}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {tracks: state.tracks, recentlyPlayedTracks: state.recentlyPlayedTracks}
}

function mapDispatchToProps(dispatch) {
  return {
    setTracks: (tracks) => {
      dispatch({type: "SET_TRACKS", payload: tracks})
    },
    setRecentlyPlayedTracks: (tracks) => {
      dispatch({type: "SET_RECENTLY_PLAYED_TRACKS", payload: tracks})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer)
