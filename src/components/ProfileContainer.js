import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/Profile.css'
import Profile from './Profile'

class ProfileContainer extends Component {

  render() {
    console.log(this.props)
    return (
      <Profile />
    )
  }
}

export default connect()(ProfileContainer)
