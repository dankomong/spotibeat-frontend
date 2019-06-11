import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'


class Track extends Component {


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

  render() {
    //console.log('props.tracks', this.props);
    return (
      /* <a href={this.props.spotify_url} target="_blank"> */
        <div className="track">
          <img src={this.props.img_url} />
          <div className="img-description">
            <h2>{this.props.name} </h2>
            <p>{this.renderArtistNames()}</p>
            <Button id="remove-btn" color="black" icon onClick={() => this.props.removeTrack(this.props.id)}>
              <Icon name='minus' />
            </Button>
          </div>
        </div>
      /* </a> */
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeTrack: (track) => {
      dispatch({type: "REMOVE_TRACK", payload: track})
  }}
}

export default connect(null, mapDispatchToProps)(Track)
