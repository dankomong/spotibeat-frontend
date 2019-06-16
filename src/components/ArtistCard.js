import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/ArtistCard.css'

class ArtistCard extends Component {


  render() {
    //console.log("artistcard", this.props);
    return (
      <div className="artist-box">
        {this.props.image_url_small === "" ?
        <img src="https://www.catapultdistribution.com/images/artistimages/noartistimage.png" className="artist-card-image" onClick={() => this.props.handleClick("https://www.catapultdistribution.com/images/artistimages/noartistimage.png", this.props.name, this.props.tracks)} alt={this.props.name}/>
        :
        <img src={this.props.image_url_small} className="artist-card-image" onClick={() => this.props.handleClick(this.props.image_url_medium, this.props.name, this.props.tracks)} alt={this.props.name}/>
        }
        <div>
          <h4 className="artist-name">{this.props.name}</h4>
        </div>
      </div>
    )
  }
}


export default connect()(ArtistCard)
