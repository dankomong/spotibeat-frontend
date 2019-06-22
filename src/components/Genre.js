import React, { Component } from 'react';
import { connect } from 'react-redux';

class Genre extends Component {

  state = {
    clicked: false
  }

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  capitalizeFirstLetter = (name) => {
    if (name.indexOf(" ")) {
      let nameArr = name.split(" ");
      for (let i = 0; i < nameArr.length; i++) {
        nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1);
      }
      return nameArr.join(" ");
    }
    else {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }

  render() {
    const colors = ["tomato", "orange", "dodgerblue", "mediumseagreen", "slateblue", "violet", "gold", "teal", "pink"]
    let rand = Math.floor(Math.random() * Math.floor(9));
    return (
      <div className="genre">
        <h2 style={{color: colors[rand]}} className="genre-name" onClick={() => this.props.selectGenres(this.props.artists, this.props.tracks, this.capitalizeFirstLetter(this.props.name), colors[rand])}>{this.capitalizeFirstLetter(this.props.name)}</h2>

      </div>
    )
  }
}


export default connect()(Genre)
