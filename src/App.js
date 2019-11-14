import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom"
import {connect} from 'react-redux'
import { Card, Image, Container } from 'semantic-ui-react'
import {fetchingData} from './redux/actions'
import NavBar from './components/NavBar'
import MainPage from './components/MainPage'
import LoginForm from './components/LoginForm'
import ClothingShowContainer from './components/ClothingShowContainer'
import ProfilePageContainer from './components/ProfilePageContainer'

class App extends Component {

  componentDidMount() {
    this.props.fetchingData()
  }

  clothingRoutingCheck = (loggedInUser, foundClothing) => {
    if (loggedInUser && foundClothing) {
      return <ClothingShowContainer />
    }
    else {
      if (loggedInUser && !!foundClothing === false) {
        return (
          <Card fluid>
            <Image src={"https://i.imgur.com/vdU2Jlg.png"} verticalAlign='middle' centered />
          </Card>
        )
      } else {
        if(!!loggedInUser === false ) {
          return <Redirect to='/login' />
        }
      }
    }
  }

  render() {
    let { loggedInUser, clothingLoading, clothingCollection } = this.props
    return (
      <Router>
        {loggedInUser ?
        <NavBar />
        :
        null}
        <div>
          {clothingLoading ?
            null
            :
            <Switch>
              <Route exact path="/home" render = {() => {
                return (loggedInUser ?
                  <MainPage />
                  :
                  <Redirect to='/login' />
                )
                }} />

              <Route path='/threads/:threadId' render={(props) => {
                  let threadId = parseInt(props.match.params.threadId)
                  let foundClothing = clothingCollection.find(clothingObj => clothingObj.id === threadId)
                  return (
                    this.clothingRoutingCheck(loggedInUser, foundClothing)
                )}
                } />

              <Route exact path="/login" render={() => {
                return (loggedInUser ?
                <Redirect to='/home' />
                :
                  <LoginForm />
                )}
                } />

              <Route exact path="/addclothing" render={() => {
                return (loggedInUser ?
                <Container fluid id='underConstruction'>
                  <Image src={'http://karenmcgrane.com/wp-content/uploads/2018/06/under-construction1.gif'}  verticalAlign='middle' centered />
                </Container>
                :
                <Redirect to='/home' />
                )}
                } />

              <Route exact path="/signup" render={() => {
                return (loggedInUser ?
                <Redirect to='/home' />
                :
                <div>Create New User</div>
                )}
                } />

              <Route exact path="/profile" render={() => {
                return (loggedInUser ?
                <ProfilePageContainer />
                :
                <Redirect to='/home' />
                )}
                } />

              <Route path ='/' render = {() => {
                return (loggedInUser ?
                <Redirect to='/home' />
                :
                <Redirect to='/login' />
                )}
                } />
                }}

            </Switch>}
        </div>
      </Router>
    );
  }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchingData: () => {dispatch ( fetchingData() )}
    }
  }

  const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
      clothingLoading: state.clothingLoading,
      clothingCollection: state.clothingCollection
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
