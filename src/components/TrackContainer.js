import React, { Component, Fragment } from 'react'
import StackGrid from "react-stack-grid";
import { connect } from 'react-redux'
import { Button, Dimmer, Loader } from 'semantic-ui-react'
import '../assets/Track.css'

import Track from './Track'

class TrackContainer extends Component {

  state = {
    loading: true,
    active: "All Tracks"
  }

  renderAllTracks = () => {
    return this.props.tracks.map(track => {

      return <Track key={track.id} img_url={track.album.image_url_medium} {...track} />
    })
  }

  renderRecentlyPlayedTracks = () => {
    return this.props.recentlyPlayedTracks.items.map((item, index) => {
      // using index as the key for this one because there can be some recently played tracks
      // that have the same id from the user's saved tracks, resulting in duplicate ids.
      return <Track key={index} img_url={item.track.album.images[1].url} artists={item.track.artists} name={item.track.name} />
    })
  }

  renderTopTracks = () => {

  }

  handleRenderTracks = (e) => {
    console.log("eee", e.target.innerText)
    this.setState({
      active: e.target.innerText
    })
  }

  renderSwitch = (val) => {
    switch(val) {
      case 'All Tracks':
        return (
          <StackGrid columnWidth={300}>
            {this.renderAllTracks()}
          </StackGrid>
        )
      case 'Recently Played':
        return (
          <StackGrid columnWidth={300}>
            {this.renderRecentlyPlayedTracks()}
          </StackGrid>
        )
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/all-track-features').then(res => res.json())
      .then(parsedRes => {
        console.log('RES',parsedRes)
        this.props.setTracks(parsedRes.tracks)
        this.props.setRecentlyPlayedTracks(parsedRes.recent_tracks)
        this.setState({
          loading: false
        })
      })

  }

  render() {
    console.log('FUCK', this.props.tracks)
    return (
      <div id="track-container">
        <div className="track-btns">
          <Button color='black' onClick={this.handleRenderTracks}>
            All Tracks
          </Button>
          <Button color='black' onClick={this.handleRenderTracks}>
            Recently Played
          </Button>
        </div>
        {this.state.loading ?
          <Dimmer active>
            <Loader content='Loading' />
          </Dimmer> :
          <Fragment>
            {this.renderSwitch(this.state.active)}
          </Fragment>}
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
