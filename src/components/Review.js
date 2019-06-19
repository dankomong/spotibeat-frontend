import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Icon, Image } from 'semantic-ui-react'

class Review extends Component {

  renderArtistNames = () => {
    const length = this.props.track.artists.length
    return this.props.track.artists.map((artist, index) => {
      if (length - 1 === index) {
        return artist.name;
      }
      else if (length > 0) {
        return artist.name + ", ";
      }
    })
  }

  render() {
    //console.log('review props', this.props)
    return (
      <div>
        <Card>
          <Image src={this.props.track.album.image_url_medium} wrapped ui={true} />
          <Card.Content>
            <Card.Header>{this.props.track.name}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.renderArtistNames()}</span>
            </Card.Meta>
            <Card.Description>
              {this.props.description}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
}




export default connect()(Review)
