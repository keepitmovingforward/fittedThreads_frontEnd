import React from 'react';
import { Card, Form } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";

const topMeasurements = ["Neck", "Chest", "Waist", "Sleeve", "Front Length"]
const bottomsMeasurements = ["Waist", "Length", "Hip", "Thigh", "Bottom Hem"]

const DimensionsForm = props => {
  let {clothing} = props

  return(
    <Form.Group>
      {clothing.categories[0].name.toLowerCase() === "pants" ||
      clothing.categories[0].name.toLowerCase() === "jeans" ?
        bottomsMeasurements.map(dim => {
          return <Form.Input label={dim} placeholder={`${dim}"`} />
        })
        :
        topMeasurements.map(dim => {
          return <Form.Input label={dim} placeholder={`${dim}"`} />
        })
      }
    </Form.Group>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    clothing: state.clothingCollection.find(c => c.id === parseInt(ownProps.match.params.threadId))
  }
}

export default withRouter(connect(mapStateToProps)(DimensionsForm));
