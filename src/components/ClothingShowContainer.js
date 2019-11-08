import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";
// import { Card } from 'semantic-ui-react'


const ClothingShowContainer = props => {

  return(
    <div>Clothing Show {props.clothing.name}</div>
  )
}

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    clothing: state.clothingCollection.find(c => c.id === parseInt(ownProps.match.params.threadId))
  }
}

export default withRouter(connect(mapStateToProps)(ClothingShowContainer));
