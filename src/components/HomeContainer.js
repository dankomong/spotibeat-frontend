import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeCarousel from './HomeCarousel'

class Home extends Component {

  // componentDidMount() {
  //   fetch('http://localhost:3001/api/v1//recommendations').then(res => res.json())
  //     .then(parsedRes => {
  //       console.log('HEYY', parsedRes)
  //     })
  // }

  render() {
    return (
      <div>
        <HomeCarousel />
      </div>
    )
  }
}

export default Home
