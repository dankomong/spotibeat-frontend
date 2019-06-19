import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import '../assets/GenreContainer.css'
import StackGrid from "react-stack-grid";
import { Grid, Button, Icon } from 'semantic-ui-react'
import Genre from './Genre';
import '../assets/Track.css'


class GenreContainer extends Component {

  state = {
    clicked: false,
    currentArtists: [],
    currentTracks: []
  }

  renderGenres = () => {
    return this.props.genres.map(genre => {
      //console.log('GENRE', genre)
      return <Genre key={genre.name} selectGenres={this.selectGenres} name={genre.name} tracks={genre.tracks} artists={genre.artists}/>
    })
  }

  selectGenres = (artists, tracks) => {
    this.setState({
      currentArtists: artists,
      currentTracks: tracks,
      clicked: true
    })
  }

  renderArtistNames = () => {
    return this.state.currentArtists.map(artist => {
      return (
        <Fragment>
          <div key={artist.id} className="artist-box-2 animate-pop-in">
            <h2>{artist.name}</h2>
          </div>
        </Fragment>
      )
    })
  }

  renderTrackNames = () => {
    return this.state.currentTracks.map((track, index) => {
      console.log("hey cuttie", track)
      return (
          <div key={track.id} className="track-box animate-pop-in">
            <h3 className="track-name" onClick={() => this.props.setURI(track.spotify_url)}>{index + 1}. {track.name} </h3>
          </div>
      )
    })
  }

  render() {
    // console.log("genre container")
    return (
      <div id="genre-container">
        <h1> Your collection of genres (from saved tracks) </h1>
        <Grid>
          {this.state.clicked ?
            <Fragment>
              <Grid.Column width={10}>
                <StackGrid columnWidth={200}>
                  {this.renderGenres()}
                </StackGrid>
              </Grid.Column>
              <Grid.Column width={3}>
                  <h1>Artists:</h1>
                  {this.renderArtistNames()}
              </Grid.Column>
              <Grid.Column width={3}>
                  <h1>Tracks:</h1>
                  {this.renderTrackNames()}
              </Grid.Column>
            </Fragment>
            :
            <Grid.Column>
              <StackGrid columnWidth={200}>
                {this.renderGenres()}
              </StackGrid>
            </Grid.Column>
          }

        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {genres: state.genres.filter(g => g.name.includes(state.filterTerm))}
}


function mapDispatchToProps(dispatch) {
  return {
    setURI: (url) => {
      dispatch({type: "SET_URI", payload: url})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GenreContainer)
