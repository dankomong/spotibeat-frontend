import React, { Component } from 'react'
import { connect } from 'react-redux'


class Playlist extends Component {

  render() {
    console.log("playlists", this.props);;
    return (
      <div className="playlist">
        <a href={this.props.external_url} target="_blank">
          <img src={this.props.image} alt={this.props.name} />
        </a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {playlists: state.playlists}
}

export default connect(mapStateToProps)(Playlist)
