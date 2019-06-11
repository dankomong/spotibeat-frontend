import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/Profile.css'

class Profile extends Component {


  render() {
    console.log(this.props)
    return (
      <div className="profile-content animate-pop-in">
        <h1>Profile</h1>
        <img className="profile-pic" src={this.props.currentUser.profile_img_url} alt="profile pic" />
        <p>Username: {this.props.currentUser.username} </p>
        <p>Followers: {this.props.currentUser.followers} </p>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(Profile)
