import React, { Component } from 'react'
import { connect } from 'react-redux'

class Review extends Component {


  render() {
    return (
      <div>
        <img src={this.props.track.album.image_url_medium} />
        <h1>Review</h1>
        <p>{this.props.description}</p>
      </div>
    )
  }
}




export default connect()(Review)
