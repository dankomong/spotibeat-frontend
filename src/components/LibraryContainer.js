import React, { Component, Fragment } from 'react'
import { Pie } from 'react-chartjs-2';
import { Grid } from 'semantic-ui-react'
import StackGrid from "react-stack-grid";
import { connect } from 'react-redux'
import '../assets/Library.css'
import PieChart from './PieChart'
import ArtistCard from './ArtistCard'
import ArtistShow from './ArtistShow'


class LibraryContainer extends Component {

  state = {
    clicked: false,
    currentImage: "",
    currentName: "",
    currentTracks: []
  }

  handleClick = (image, name, tracks) => {
    this.setState({
      clicked: true,
      currentImage: image,
      currentName: name,
      currentTracks: tracks
    })
  }

  renderArtistList = () => {
    return this.props.artists.map((artist, index) => {
      return <ArtistCard key={artist.id} handleClick={this.handleClick} number={index + 1} {...artist} />
    })
  }

  render() {
    console.log("library container", this.props.artists)
    return (
      <div id="library-container">
        <Grid>
          {this.state.clicked ?
            <Fragment>
              <Grid.Column width={12}>
                <StackGrid columnWidth={200}>
                  {this.renderArtistList()}
                </StackGrid>
              </Grid.Column>
              <Grid.Column width={4}>
                <ArtistShow currentTracks={this.state.currentTracks} currentImage={this.state.currentImage} currentName={this.state.currentName}/>
              </Grid.Column>
            </Fragment>
            :
            <Grid.Column width={16}>
              <StackGrid columnWidth={200}>
                {this.renderArtistList()}
              </StackGrid>
            </Grid.Column>}

        </Grid>



      </div>
    )
  }
}

function mapStateToProps(state) {
  return {artists: state.artists.filter(a => a.name.toLowerCase().includes(state.filterTerm.toLowerCase()))}
}

export default connect(mapStateToProps)(LibraryContainer)
