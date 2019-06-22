import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'
import { Bar, Polar } from 'react-chartjs-2';

class Profile extends Component {

  state = {
    chartData: {
      labels: ['Tracks', 'Artists', 'Genres'],
      datasets: [
        {
          label: 'Tracks, Artists, and Genres the user currently has: ',
          data: [
            this.props.currentUser.tracks.length,
            this.props.genres.length,
            this.props.artists.length
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
          ]
        }
      ]
    }
  }

  fetchLibrary = () => {
    fetch("http://localhost:3001/api/v1/get-library")
  }

  render() {
    // console.log('profile', this.props)
    const data = {
      datasets: [{
        data: [
          this.props.currentUser.tracks.length,
          this.props.genres.length,
          this.props.artists.length
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        label: 'My dataset' // for legend
      }],
      labels: [
        'Tracks',
        'Genres',
        'Artists'
      ]
    };
    return (
      <div className="profile-content animate-pop-in">

        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <h1>Profile</h1>
              <a href={this.props.currentUser.spotify_url} target="_blank">
                <img className="profile-pic" src={this.props.currentUser.profile_img_url} alt="profile pic" />
              </a>
              <h3>Username: {this.props.currentUser.username} </h3>
              <h3>Followers: {this.props.currentUser.followers} </h3>
              <Button onClick={this.fetchLibrary}> Update Library </Button>
            </Grid.Column>
            <Grid.Column width={10}>
              <h1>Your Track Statistics</h1>
              <Polar data={data} />
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {currentUser: state.currentUser, genres: state.genres, artists: state.artists}
}

export default connect(mapStateToProps)(Profile)
