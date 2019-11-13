import React, {Component} from 'react';
import { Card, Grid, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";

const _ = require("lodash")

class MeasurementsDisplay extends Component {

  generateMeasurementDisplay = size => {
    let {clothing} = this.props
    let array = []
    clothing.user_clothings.filter(measurement => size.id === measurement.size_id)
    .map(sizedMeasures => {
        let measurementArray = _.toPairs(sizedMeasures)
        return (
            measurementArray.filter(e => e[1] !== null).filter(e => !e[0].includes("id"))
            .forEach(actualMeas => {
              array.push(`${actualMeas[0].split("top")[1]} x ${actualMeas[1]}`)
            })
          )
            }
        // <Segment id='clothingShowInnerMeasures' key={sizedMeasures.id}>
        // </Segment>
        // uploaded by {clothing.user_measurements.find(user => user.id === sizedMeasures.user_id).username})
      )
      console.log(array)
      debugger
    }



  render() {
    let { clothing } = this.props
    return (
    <Card.Content>
      <Card.Header id='clothingShowMeasuresHeader'>
        <strong>MEASUREMENTS</strong>
      </Card.Header>
    <Grid columns='equal'>
      <Grid.Row id='clothingShowMeasures'>
        <Grid.Column width={4} textAlign='center'>
          <Card.Description id='clothingShowMeasures'>
            <strong>SIZE</strong>
          </Card.Description>
        </Grid.Column>
        <Grid.Column width={12} textAlign='center'>
          <Card.Description id='clothingShowMeasures'>
            <strong>FITTED MEASUREMENTS</strong>
          </Card.Description>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Grid columns='equal'>
      {clothing.sizes.map(size =>
        <Grid.Row key={size.id}>
          <Grid.Column width={4}>
            <Segment id='clothingShowInnerMeasures'><strong>{size.size}</strong> </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            {this.generateMeasurementDisplay(size)}
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
    </Card.Content>
  )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    clothing: state.clothingCollection.find(c => c.id === parseInt(ownProps.match.params.threadId)),
    user: state.loggedInUser
  }
}

export default withRouter(connect(mapStateToProps)(MeasurementsDisplay));
