import React, { Component } from 'react'
import { connect } from 'react-redux'
import StackGrid from 'react-stack-grid'
import Playlist from './Playlist'
import { Grid } from 'semantic-ui-react'
import '../assets/Playlist.css'


class FeaturedPlaylists extends Component {

  renderPlaylists = () => {
    return this.props.playlists.map(playlist => {
      return <Playlist key={playlist.id} name={playlist.name} external_url={playlist.external_urls.spotify} image={playlist.images[0].url}/>
    })
  }

  render() {
    console.log("playlists", this.props.playlists);;
    return (
      <div>
        <h1>Featured Playlists </h1>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              {this.renderPlaylists()[0]}
            </Grid.Column>
            <Grid.Column>
              {this.renderPlaylists()[1]}
            </Grid.Column>
            <Grid.Column>
              {this.renderPlaylists()[2]}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {this.renderPlaylists()[3]}
            </Grid.Column>
            <Grid.Column>
              {this.renderPlaylists()[4]}
            </Grid.Column>
            <Grid.Column>
              {this.renderPlaylists()[5]}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {this.renderPlaylists()[6]}
            </Grid.Column>
            <Grid.Column>
              {this.renderPlaylists()[7]}
            </Grid.Column>
            <Grid.Column>
              {this.renderPlaylists()[8]}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {this.renderPlaylists()[9]}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {playlists: state.playlists}
}

export default connect(mapStateToProps)(FeaturedPlaylists)
