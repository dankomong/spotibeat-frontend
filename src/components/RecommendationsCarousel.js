import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from "react-slick";
import Album from './Album';
import '../assets/HomeContainer.css'

class RecommendationsCarousel extends Component {

  renderNewRecommendations = () => {
    return this.props.recommendations.map((rec, index) => {
      return <Album key={"recs" + index} img_url={rec.album.images[1].url} artists={rec.album.artists} name={rec.album.name} album_type={rec.album.album_type} spotify_url={rec.album.external_urls.spotify}/>
    })
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: true,
      autoplay: true
    };
    return (
      <div className="carousel">
        <h1> New Recommendations </h1>
        <Slider {...settings}>
          {this.renderNewRecommendations()}
        </Slider>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {recommendations: state.recommendations}
}

export default connect(mapStateToProps)(RecommendationsCarousel)
