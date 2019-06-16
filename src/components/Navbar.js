import React, { Component } from 'react';
import { Input, Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    activeItem: this.props.path
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    console.log('navbar', this.props)
    return (
      <Segment inverted>
       <Menu inverted secondary>
         <Menu.Item
           as={ Link }
           name='/home'
           to="/home"
           active={activeItem === '/home' }
           onClick={this.handleItemClick}
         />
         <Menu.Item
         as={ Link }
         name='/profile'
         to='/profile'
         active={activeItem === '/profile'}
         onClick={this.handleItemClick}
         />
         <Menu.Item
           as={ Link }
           name='/artists'
           to='/artists'
           active={activeItem === '/artists'}
           onClick={this.handleItemClick}
         />
         <Menu.Item
           as={ Link }
           name='/tracks'
           to='/tracks'
           active={activeItem === '/tracks'}
           onClick={this.handleItemClick}
         />
         <Menu.Item
           as={ Link }
           name='/genres'
           to='/genres'
           active={activeItem === '/genres'}
           onClick={this.handleItemClick}
         />
         <Menu.Item
           as={ Link }
           name='/reviews'
           to='/reviews'
           active={activeItem === '/reviews'}
           onClick={this.handleItemClick}
         />
         <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
       </Menu>
     </Segment>
    )
  }
}

export default Home
