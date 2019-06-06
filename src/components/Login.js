import React, { Component } from 'react';
import '../assets/Login.css'
import Fab from '@material-ui/core/Fab';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },

});

class Login extends Component {


  render() {
    return (
      <header>
        <div className="header-content">
           <h1 class="header-title animate-pop-in">Spotifyzer</h1>
           <ThemeProvider theme={theme}>
             <Fab variant="extended" href="http://localhost:3001/api/v1/login" id="log-in-btn" size="large" color="primary" className="header-button animate-pop-in" aria-label="Delete">
                <i class="fa fa-spotify"></i>
                Login with Spotify
             </Fab>
          </ThemeProvider>
         </div>
     </header>
    )
  }
}

// <a href="http://localhost:3001/api/v1/login">
// Log in to Spotify
// </a>
export default Login
