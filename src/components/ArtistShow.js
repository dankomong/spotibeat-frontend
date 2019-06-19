import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/ArtistCard.css'
import SpotifyPlayer from './SpotifyPlayer'

class ArtistShow extends Component {

  state = {
    className: "",
  }

  renderSpotifyPlayers = () => {
    return this.props.currentTracks.map(track => {
      console.log('track', track)
      return <SpotifyPlayer key={"spotifyplayer" + track.id} url={track.spotify_url} />
    })
  }

  componentDidMount(){
    window.addEventListener("scroll", (event) => {
      if (window.scrollY >= 80){
        this.setState({className: "up"})
      } else {
        if (this.state.className === "up"){
          this.setState({className: "top"})
        }
      }
    })
  }

  render() {
    console.log("artistcard", this.props);
    return (
      <div className={"artist-show-box " + this.state.className}>
        <img className="artist-pic" src={this.props.currentImage} alt={this.props.currentName}/>
        <h2>{this.props.currentName}</h2>
        <div className="player-box">
          {this.renderSpotifyPlayers()}
        </div>
      </div>
    )
  }
}


export default connect()(ArtistShow)
