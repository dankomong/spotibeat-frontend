import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeCarousel from './HomeCarousel'
import RecommendationsCarousel from './RecommendationsCarousel'
import FeaturedPlaylists from './FeaturedPlaylists'
import '../assets/HomeContainer.css'

class Home extends Component {

  componentDidMount() {
    // fetch for new releases
    fetch('http://localhost:3001/api/v1/get-new-releases').then(res => res.json())
      .then(parsedRes => {
        this.props.setNewReleases(parsedRes.albums.items)
      })

    // fetch for recommendations
    fetch('http://localhost:3001/api/v1/recommendations').then(res => res.json())
      .then(parsedRes => {
        console.log('rec res', parsedRes)
        this.props.setRecommendations(parsedRes.tracks)
      })

    fetch('http://localhost:3001/api/v1/playlists').then(res => res.json())
      .then(parsedRes => {
        // console.log('playlists res', parsedRes.playlists.playlists.items)
        this.props.setPlaylists(parsedRes.playlists.playlists.items)
      })

  }

  render() {
    // console.log("playlists", this.props.playlists)
    // console.log("new releases", this.props.new_releases);
    return (
      <div id="home-container">
        <HomeCarousel />
        <RecommendationsCarousel />
        <FeaturedPlaylists />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {new_releases: state.new_releases, recs: state.recommendations, playlists: state.playlists}
}

function mapDispatchToProps(dispatch) {
  return {
    setNewReleases: (new_releases) => {
      dispatch({type: 'SET_NEW_RELEASES', payload: new_releases})
    },
    setRecommendations: (recs) => {
      dispatch({type: 'SET_RECOMMENDATIONS', payload: recs})
    },
    setPlaylists: (playlists) => {
      dispatch({type: 'SET_PLAYLISTS', payload: playlists})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
