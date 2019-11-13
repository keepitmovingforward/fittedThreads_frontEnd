import React, {Component} from 'react';
import { Card, Grid, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";

const _ = require("lodash")

class MeasurementsDisplay extends Component {

  generateMeasurementDisplay = size => {
    let {clothing} = this.props
    let prep = this.generateSizedArray(size)
    let newPrep = _.groupBy(prep, function(x) {return x[0]})
    let keys = Object.keys(newPrep)
    let sizePhrases = []
    keys.forEach(key => {
      let meas1 = [newPrep[key][0][1].split(": ")[0], newPrep[key][0][1].split(": ")[1] === "null" ? ` 🔘 ` : newPrep[key][0][1].split(": ")[1]+ `"`].join(" ")
      let meas2 = [newPrep[key][1][1].split(": ")[0], newPrep[key][1][1].split(": ")[1] === "null" ? ` 🔘 ` : newPrep[key][1][1].split(": ")[1]+ `"`].join(" ")
      let meas3 = [newPrep[key][2][1].split(": ")[0], newPrep[key][2][1].split(": ")[1] === "null" ? ` 🔘 ` : newPrep[key][2][1].split(": ")[1]+ `"`].join(" ")
      let meas4 = [newPrep[key][3][1].split(": ")[0], newPrep[key][3][1].split(": ")[1] === "null" ? ` 🔘 ` : newPrep[key][3][1].split(": ")[1]+ `"`].join(" ")
      let meas5 = [newPrep[key][4][1].split(": ")[0].split("_").join(" "), newPrep[key][4][1].split(": ")[1] === "null" ? ` 🔘 ` : newPrep[key][4][1].split(": ")[1]+ `"`].join(" ")
      let measured_user_id = clothing.user_clothings.find(m => m.id === parseInt(key)).user_id
      let measured_user = clothing.user_measurements.find(user => user.id === measured_user_id)
      sizePhrases.push([[meas1, meas2, meas3, meas4, meas5].join(" x "), measured_user, key])
    })
     return sizePhrases.map(sizeComponent => {
       return <Card fluid id='clothingShowDimensions' key={sizeComponent[2]}>
                <Card.Content>
                  <Card.Header>{sizeComponent[0]}</Card.Header>
                  <Card.Meta>uploaded by {sizeComponent[1].username}</Card.Meta>
                </Card.Content>
              </Card>
     })

  }

  generateSizedArray = size => {
    let {clothing} = this.props
    let sizedArray = []
    let bottoms
      if (clothing.categories[0].name === 'jeans' || clothing.categories[0].name === 'pants') {
        bottoms = true
      }
      else {
        bottoms = false
      }
    clothing.user_clothings.filter(measurement => size.id === measurement.size_id)
    .map(sizedMeasures => {
        let measurementArray = _.toPairs(sizedMeasures)
        if (bottoms) {
        return (
            measurementArray.filter(e => e[0].includes("bottom"))
            .forEach(actualMeas => {
              sizedArray.push([sizedMeasures.id, `${actualMeas[0].split("bottom")[1]}: ${actualMeas[1]}`])
            })
          )
        }
        else {
          return (
              measurementArray.filter(e => e[0].includes("top"))
              .forEach(actualMeas => {
                sizedArray.push([sizedMeasures.id, `${actualMeas[0].split("top")[1]}: ${actualMeas[1]}`])
              })
            )
        }
    })

      return sizedArray
    }

    sortSizes = () => {
      let {clothing} = this.props
      let value
      let sizeNames = clothing.sizes.map(s => s.size)
      let prepForSort = sizeNames.map(name => {
        let shrunk = name.toLowerCase()
        if (shrunk === 'x-small' || shrunk === 'xs' || shrunk === 'x-s') {
            value = 1000;
        }
        else if (shrunk === 'small' || shrunk === 's' || shrunk ==='sm') {
            value = 1001;
        }
        else if (shrunk === 'medium' || shrunk === 'm' || shrunk ==='med') {
            value = 1002;
        }
        else if (shrunk === 'large' || shrunk === 'l' || shrunk ==='lg') {
            value = 1003;
        }
        else if (shrunk === 'x-large' || shrunk === 'xl' || shrunk === 'x-l') {
            value = 1004;
        }
        else if (shrunk === 'xx-large' || shrunk === 'xxl' || shrunk === 'xx-l') {
            value = 1005;
        }
        else if (shrunk === (parseInt(name.toLowerCase()).toString())) {
            value = 1 + parseInt(name.toLowerCase());
        }
        else {
            value = 9999;
        }
        return [value, name]
      })
        prepForSort.sort((function(a, b)
        {
            if(a[0] === b[0])
            {
                var x = a[1].toLowerCase(), y = b[1].toLowerCase();

                return x < y ? -1 : x > y ? 1 : 0;
            }
            return a[0] - b[0];
        }))
        console.log(prepForSort)

        return prepForSort.map(e => e[1])
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
      {this.sortSizes().map(sizeName =>
        <Grid.Row key={clothing.sizes.find(size => size.size === sizeName).id}>
          <Grid.Column width={4}>
            <Segment id='clothingShowInnerMeasures'><strong>{sizeName}</strong> </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            {this.generateMeasurementDisplay(clothing.sizes.find(size => size.size === sizeName))}
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
