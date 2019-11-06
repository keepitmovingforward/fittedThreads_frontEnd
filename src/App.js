import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom"
import {connect} from 'react-redux'
import {fetchingData} from './redux/actions'
import NavBar from './components/NavBar'
import MainPage from './components/MainPage'
import LoginForm from './components/LoginForm'

class App extends Component {

  componentDidMount() {
    this.props.fetchingData()
  }

  render() {
    let { loggedInUser, clothingLoading } = this.props
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

              <Route exact path="/login" render={() => {
                return (loggedInUser ?
                <Redirect to='/home' />
                :
                  <LoginForm />
                )}
                } />

              <Route exact path="/addclothing" render={() => {
                return (loggedInUser ?
                <div>Add Clothing</div>
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
      clothingLoading: state.clothingLoading
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
