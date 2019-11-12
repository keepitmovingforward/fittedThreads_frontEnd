import React from 'react';
import { Card, Form } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";


const DimensionsForm = props => {
  let {clothing} = props

  return(
    <Form.Group>
      {if clothing.categories.name.toLowerCase() === "" }
    </Form.Group>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    clothing: state.clothingCollection.find(c => c.id === parseInt(ownProps.match.params.threadId))
  }
}

export default withRouter(connect(mapStateToProps)(DimensionsForm));
