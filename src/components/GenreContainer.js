import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/GenreContainer.css'
import Genre from './Genre';

class GenreContainer extends Component {

  renderGenres = () => {
    return this.props.genres.map(genre => {
      return <Genre key={genre.name} name={genre.name} tracks={genre.tracks}/>
    })
  }

  render() {

    return (
      <div id="genre-container">
        <h1> Your collection of genres (from saved tracks) </h1>
        {this.renderGenres()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {genres: state.genres}
}


export default connect(mapStateToProps)(GenreContainer)
