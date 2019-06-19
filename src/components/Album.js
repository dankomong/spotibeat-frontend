import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/Album.css';

class Album extends Component {

  // reusing this same function from Track.js component
  renderArtistNames = () => {
    const length = this.props.artists.length
    return this.props.artists.map((artist, index) => {
      if (length - 1 === index) {
        return artist.name;
      }
      else if (length > 0) {
        return artist.name + ", ";
      }
    })
  }

  capitalizeFirstLetter = (album_type) => {
    return album_type.charAt(0).toUpperCase() + album_type.slice(1);
  }

  render() {
    //console.log('album props', this.props);
    return (
      <div className="album">
        <img src={this.props.img_url} alt={this.props.name} />
          <a href={this.props.spotify_url} target="_blank">
            <div className="album-description">
              <h2>{this.props.name}</h2>
              <h4>{this.renderArtistNames()}</h4>
              <p> {this.capitalizeFirstLetter(this.props.album_type)} </p>
            </div>
          </a>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {new_releases: state.new_releases}
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     setNewReleases: (new_releases) => {
//       dispatch({type: 'SET_NEW_RELEASES', payload: new_releases})
//     }
//   }
// }

export default connect()(Album)
