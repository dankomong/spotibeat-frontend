import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from "react-slick";
import Album from './Album';
import '../assets/HomeContainer.css'

class HomeCarousel extends Component {

  renderNewReleases = () => {
    return this.props.new_releases.map((item, index) => {
      return <Album key={"new-releases" + index} img_url={item.images[1].url} artists={item.artists} name={item.name} album_type={item.album_type} spotify_url={item.external_urls.spotify}/>
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
        <h1> New Releases </h1>
        <Slider {...settings}>
          {this.renderNewReleases()}
        </Slider>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {new_releases: state.new_releases}
}

export default connect(mapStateToProps)(HomeCarousel)
