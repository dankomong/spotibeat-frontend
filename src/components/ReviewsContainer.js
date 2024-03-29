import React, { Component } from 'react'
import { connect } from 'react-redux'
import StackGrid from "react-stack-grid";
import '../assets/Review.css'
import Review from './Review'

class ReviewsContainer extends Component {

  renderReviews = () => {
    return this.props.reviews.map(review => {
      console.log('review', review)
      let track = this.props.tracks.find(track => track.id === review.track.id)

      return <Review key={"review" + review.id} description={review.description} track={track}/>
    })
  }

  componentDidMount() {
    // fetch to get reviews
    fetch('http://localhost:3001/api/v1/reviews').then(res => res.json())
      .then(parsedRes => {
        this.props.setReviews(parsedRes)

      })
  }

  render() {

    return (
      <div id="review-container">
        <StackGrid columnWidth={300}>
          {this.renderReviews()}
        </StackGrid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {tracks: state.tracks, reviews: state.reviews}
}

function mapDispatchToProps(dispatch) {
  return {
    setReviews: (reviews) => {
      dispatch({type: "SET_REVIEWS", payload: reviews})
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer)
