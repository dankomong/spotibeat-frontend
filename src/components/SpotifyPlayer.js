import React, { Component } from 'react'
import { connect } from 'react-redux'

class SpotifyPlayer extends Component {


  render() {
    //console.log("artistcard", this.props);
    return (
      <div>
        <iframe src={this.props.url.split("/track/").join("/embed/track/")} height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    )
  }
}


export default connect()(SpotifyPlayer)
