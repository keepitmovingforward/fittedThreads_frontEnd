import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom"
import {connect} from 'react-redux'
import {fetchingClothings} from './redux/actions'
import NavBar from './components/NavBar'
import MainPage from './components/MainPage'

class App extends Component {

  componentDidMount() {
    this.props.fetchingClothings()
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
            <Switch>
              <Route exact path="/home" component={MainPage} />
            </Switch>
        </div>
      </Router>
    );
  }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchingClothings: () => {dispatch ( fetchingClothings() )}
    }
  }

  const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
