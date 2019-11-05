import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { Image, Menu, Segment, Icon } from 'semantic-ui-react'
import {logOutUser} from '../redux/actions'

class NavBar extends Component {

  state = { activeItem: 'home'}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    let { activeItem, loggedInUser } = this.state

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
        {this.props.loggedInUser ?
          <>
          <Menu.Item
            name='Add Clothing'
            as={ Link }
            to="/addclothing"
            active={activeItem === 'Add Clothing'}
            onClick={this.handleItemClick}
          >
          <Icon name='plus square' />
          Add Clothing
          </Menu.Item>
          <Menu.Item
            name='Logout'
            active={activeItem === 'logout'}
            onClick={this.props.logOutUser}
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

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => {dispatch ( logOutUser() )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
