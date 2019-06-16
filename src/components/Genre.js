import React, { Component } from 'react';
import { connect } from 'react-redux';

class Genre extends Component {

  state = {
    clicked: false
  }

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  renderTracks = () => {
    return this.props.tracks.map(track => {
      return <p> {track.name} </p>
    })
  }

  render() {
    return (
      <div>
        <h2 onClick={this.handleClick}>{this.props.name}</h2>
        {this.state.clicked ? this.renderTracks() : null}
      </div>
    )
  }
}


export default connect()(Genre)
