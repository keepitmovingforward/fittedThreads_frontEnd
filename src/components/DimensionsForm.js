import React from 'react';
import { Card, Form, Dropdown } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";

const topMeasurements = ["Neck", "Chest", "Waist", "Sleeve", "Front Length"]
const bottomsMeasurements = ["Waist", "Length", "Hip", "Thigh", "Bottom Hem"]

const DimensionsForm = props => {
  let {clothing} = props

  const generateOptions = () => {
    let options = []
    for (let i = 5; i < 66; i++) {
      options.push({"key": i, "text": `${i} inches`, "value": i})
    }
    return options
  }

  return(
    <Form.Group>
      {clothing.categories[0].name.toLowerCase() === "pants" ||
      clothing.categories[0].name.toLowerCase() === "jeans" ?
        bottomsMeasurements.map(dim => {
          return (
            <Form.Field>
              <label>{dim}</label>
              <Dropdown clearable options={generateOptions()}
                selection search selectOnNavigation={false}/>
            </Form.Field>
          )
        })
        :
        topMeasurements.map(dim => {
          return (
            <Form.Field>
              <label>{dim}</label>
              <Dropdown clearable options={generateOptions()}
                 selection search selectOnNavigation={false}/>
            </Form.Field>
          )
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
