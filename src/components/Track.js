import React, { Component, Fragment } from 'react'
import { Form, Button, Icon, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'


class Track extends Component {

  state = {
    writeReviewClicked: false,
    description: ''
  }

  handleReviewClicked = () => {
    this.setState({
      writeReviewClicked: true
    })
  }

  renderArtistNames = () => {
    const length = this.props.artists.length
    return this.props.artists.map((artist, index) => {
      if (length - 1 === index) {
        return artist.name;
      }
      else if (length > 0) {
        return artist.name + ", ";
      }
    })
  }

  goBack = () => {
    this.setState({
      writeReviewClicked: false
    })
  }

  setDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  postReview = () => {
    fetch('http://localhost:3001/api/v1/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        track_id: this.props.id,
        description: this.state.description
      })
    }).then(res => res.json()).then(parsedRes => {
      this.props.addReview(parsedRes.review)
    })
  }

  render() {
    //console.log('props.tracks', this.props);
    return (
      /* <a href={this.props.spotify_url} target="_blank"> */
        <div className="track">
          {this.state.writeReviewClicked ?
            <Fragment>
              <img src={this.props.img_url} />
                <div className="img-description">
                  <div className="container">
                    <Form>
                      <Form.Field
                        control={TextArea}
                        label="Review"
                        onChange={this.setDescription}
                        placeholder="Write a review...">
                      </Form.Field>
                      <Form.Field
                         id='form-button-control-public'
                         control={Button}
                         content='Submit'
                         onClick={this.postReview}
                       />
                    </Form>
                  </div>
                  <Button id="back-button" color="black" icon onClick={this.goBack}>
                    <Icon name='arrow left' />
                  </Button>
                </div>
            </Fragment>
            : <Fragment>
            <img src={this.props.img_url} />
              <div className="img-description">
                <h2>{this.props.name} </h2>
                <p>{this.renderArtistNames()}</p>
                <Button id="remove-btn" color="black" icon onClick={() => this.props.removeTrack(this.props.id)}>
                  <Icon name='minus' />
                </Button>
                <div className="review-btn-box">
                  <Button inverted color="teal" onClick={this.handleReviewClicked}>Write a review</Button>
                </div>
              </div> </Fragment>}
        </div>
      /* </a> */
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeTrack: (track) => {
      dispatch({type: "REMOVE_TRACK", payload: track})
    },
    addReview: (review) => {
      dispatch({type: "ADD_REVIEW", payload: review})
    }
  }
}

export default connect(null, mapDispatchToProps)(Track)
