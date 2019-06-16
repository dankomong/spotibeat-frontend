import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pie } from 'react-chartjs-2';


class LibraryContainer extends Component {

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
    console.log("library container", this.props.currentUser)
    return (
      <div>
        <Pie
          height={300}
          width={300}
          data={this.state.chartData}
          options={{maintainAspectRatio: false}}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser, genres: state.genres, artists: state.artists}
}

export default connect(mapStateToProps)(LibraryContainer)
