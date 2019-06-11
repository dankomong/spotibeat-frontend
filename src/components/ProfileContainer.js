import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/Profile.css'
import Profile from './Profile'

class ProfileContainer extends Component {

  // componentDidMount() {
  //   // fetch to get genres and artists
  //   fetch('http://localhost:3001/api/v1//get-genres-and-artists').then(res => res.json())
  //     .then(parsedRes => {
  //       this.props.setGenres(parsedRes.genres)
  //       this.props.setArtists(parsedRes.artists)
  //     })
  // }

  render() {
    console.log(this.props)
    return (
      <Profile />
    )
  }
}



// function mapDispatchToProps(dispatch) {
//   return {
//     setGenres: (genres) => {
//       dispatch({type: "SET_GENRES", payload: genres})
//     },
//     setArtists: (artists) => {
//       dispatch({type: "SET_ARTISTS", payload: artists})
//     }
//   }
// }

export default connect()(ProfileContainer)
