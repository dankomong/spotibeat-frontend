import React, { Component } from 'react'
import { connect } from 'react-redux'

class SpotifyPlayer extends Component {

  // componentDidMount() {
  //   this.props.setURI(this.props.url);
  // }

  render() {
    return (
      <div>
        <iframe src={this.props.url.split("/track/").join("/embed/track/")} height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setURI: (url) => {
      dispatch({type: "SET_URI", action: url})
    }
  }
}


export default connect(null, mapDispatchToProps)(SpotifyPlayer)
