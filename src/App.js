import React, { Component } from 'react';
import './App.css';
import {Route, Switch, withRouter } from "react-router-dom"
import {connect} from 'react-redux'

class App extends Component {

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchedClothings: (clothings) => {dispatch ( {type: "FETCHED_CLOTHINGS", payload: clothings})}
    }
  }

export default withRouter(connect(null, mapDispatchToProps)(App));
