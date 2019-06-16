import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { Bar } from 'react-chartjs-2';

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



  render() {
    console.log('profile', this.props)
    return (
      <div className="profile-content animate-pop-in">
        <h1>Profile</h1>
        <a href={this.props.currentUser.spotify_url} target="_blank">
          <img className="profile-pic" src={this.props.currentUser.profile_img_url} alt="profile pic" />
        </a>
        <p>Username: {this.props.currentUser.username} </p>
        <p>Followers: {this.props.currentUser.followers} </p>

        <Grid columns='three' divided>
          <Grid.Row>
            <Grid.Column>
              <h1>Tracks</h1>
            </Grid.Column>
            <Grid.Column>
              <h1>Artists</h1>
            </Grid.Column>
            <Grid.Column>
              <h1>Genres</h1>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <h1>{this.props.currentUser.tracks.length}</h1>
            </Grid.Column>
            <Grid.Column>
              <h1>{this.props.artists.length}</h1>
            </Grid.Column>
            <Grid.Column>
              <h1>{this.props.genres.length}</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Bar
              data={this.state.chartData}
              height={200}
              width={1}
              options={{maintainAspectRatio: false}}
            />
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
