import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { Image, Menu, Segment, Icon } from 'semantic-ui-react'
import {logOutUser, toggleSearch, goHome} from '../redux/actions'

class NavBar extends Component {

  state = { activeItem: 'home'}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    let { activeItem } = this.state

    return (

      <div id="navBarBackground" style={{ padding: '10px 0px 0px 0px', marginBottom: '6px'}}>
        <Image src="https://fontmeme.com/permalink/191104/0280bed54d0e9e77f2c3131d3b7a1b61.png" id="mainLogo"></Image>
        <Segment inverted color='black'>
          <Menu fluid inverted secondary widths={4} icon='labeled'>
            <Menu.Item
              name='home'
              as={ Link }
              to="/home"
              active={activeItem === 'home'}
              onClick={(e, clickObj) => {
                this.props.goHome()
                this.handleItemClick(e, clickObj)
              }}
            >
             <Icon name='home' />
             Home
             </Menu.Item>

             <Menu.Item
               name='Search'
               as={ Link }
               to="/home"
               active={activeItem === 'Search'}
               onClick={(e, clickObj) => {
                 this.props.toggleSearch()
                 this.handleItemClick(e, clickObj)
               }}
             >
             <Icon name='search' />
             Search
             </Menu.Item>

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

            <Menu.Menu position = 'right'>
            <Menu.Item
              name='Logout'
              active={activeItem === 'logout'}
              onClick={this.props.logOutUser}
            >
            <Icon name='hand peace' />
            Logout
            </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => {dispatch ( logOutUser() )},
    toggleSearch: () => {dispatch ( toggleSearch() )},
    goHome: () => {dispatch ( goHome() )}
  }
}

export default connect(null, mapDispatchToProps)(NavBar);
