import React, { Component, Fragment } from 'react'
import StackGrid from "react-stack-grid";
import { connect } from 'react-redux'
import { Button, Dimmer, Loader, Sticky } from 'semantic-ui-react'
import '../assets/Track.css'
import SpotifyPlayer from 'react-spotify-player';

import Track from './Track'

class TrackContainer extends Component {

  state = {
    active: "All Tracks"
  }

  renderAllTracks = () => {
    return this.props.tracks.map(track => {

      return <Track key={"track" + track.id} recent_track={false} img_url={track.album.image_url_medium} {...track} />
    })
  }

  renderRecentlyPlayedTracks = () => {
    return this.props.recentlyPlayedTracks.items.map((item, index) => {
      // using index as the key for this one because there can be some recently played tracks
      // that have the same id from the user's saved tracks, resulting in duplicate ids.
      console.log('item', item)
      return <Track key={"recent-tracks" + index} recent_track={true} spotify_url={item.track.external_urls.spotify} recent={true} img_url={item.track.album.images[1].url} artists={item.track.artists} name={item.track.name} />
    })
  }

  // renderTopTracks = () => {
  //
  // }

  handleRenderTracks = (e) => {
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




  render() {
    console.log('FUCK', this.props)
    const size = {
      width: '100%',
      height: 300,
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'
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

          <Fragment>
            {this.renderSwitch(this.state.active)}
          </Fragment>


      </div>
    )
  }
}

function mapStateToProps(state) {
  // try {
    return {tracks: state.tracks.filter(t => t.name.toLowerCase().includes(state.filterTerm.toLowerCase())), recentlyPlayedTracks: state.recentlyPlayedTracks, url: state.currentTrackURL}
  // } catch {
  //   debugger
  // }
}

export default connect(mapStateToProps)(TrackContainer)
