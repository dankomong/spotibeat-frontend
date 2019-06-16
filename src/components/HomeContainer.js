import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeCarousel from './HomeCarousel'
import RecommendationsCarousel from './RecommendationsCarousel'
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

  }

  render() {
    console.log("recs", this.props.recs)
    return (
      <div id="home-container">
        <HomeCarousel />
        <RecommendationsCarousel />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {new_releases: state.new_releases, recs: state.recommendations}
}

function mapDispatchToProps(dispatch) {
  return {
    setNewReleases: (new_releases) => {
      dispatch({type: 'SET_NEW_RELEASES', payload: new_releases})
    },
    setRecommendations: (recs) => {
      dispatch({type: 'SET_RECOMMENDATIONS', payload: recs})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
