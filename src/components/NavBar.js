import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, Menu, Segment, Icon } from 'semantic-ui-react'

class NavBar extends Component {

  state = { activeItem: 'home'}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout = (e, { name }) => {
    let response = window.confirm("Please confirm Logout")
    if (!response) {
      return
    }
    this.setState({ activeItem: name })
    this.props.logoutUser()
  }

  render() {
    const { activeItem } = this.state

    return (

      <div style={{ padding: '5px', marginBottom: '10px', marginTop: '2px' }}>
        <Image src="https://fontmeme.com/permalink/191104/0280bed54d0e9e77f2c3131d3b7a1b61.png" id="logo"></Image>
        <Segment inverted color='black'>
        <Menu inverted pointing secondary icon='labeled'>
          <Menu.Item
            name='home'
            as={ Link }
            to="/home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
           <Icon name='home' />
           Home
           </Menu.Item>
        {this.props.currentUser ?
          <>
          <Menu.Item
            name='my barters'
            as={ Link }
            to="/barters"
            active={activeItem === 'my barters'}
            onClick={this.handleItemClick}
          >
          <Icon name='handshake' />
          My Barters
          </Menu.Item>
          <Menu.Item
            name='Logout'
            active={activeItem === 'logout'}
            onClick={this.logout}
          >
          <Icon name='hand peace' />
          Logout
          </Menu.Item>
          </>
        :
        <Menu.Item
          name='login'
          as={ Link }
          to="/login"
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
          >
          <Icon name='user circle' />
          Login
          </Menu.Item>
        }
        </Menu>
        </Segment>
      </div>
    )
  }
}

export default NavBar;
