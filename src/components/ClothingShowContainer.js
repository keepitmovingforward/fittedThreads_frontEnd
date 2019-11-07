import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";
// import { Card } from 'semantic-ui-react'


const ClothingShowContainer = props => {
  return(
    <div>Clothing Show {props.clothing}</div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    clothing: state.clothingCollection.find(c => c.id === ownProps.match.params.threadId)
  }
}

export default withRouter(connect(mapStateToProps)(ClothingShowContainer));
