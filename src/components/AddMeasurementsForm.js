import React, {Component} from 'react';
import { Card, Form, Dropdown, Select, Button, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";

const topMeasurements = ["Neck", "Chest", "Waist", "Sleeve", "Front Length"]
const bottomsMeasurements = ["Waist", "Length", "Hip", "Thigh", "Bottom Hem"]

class AddMeasurementsForm extends Component {

  state = {
    addCustomSize: false,
    existingSizeId: "",
    customSizeEntry: "",
    topNeck: "",
    topChest: "",
    topWaist: "",
    topSleeve: "",
    topFrontLength: "",
    bottomWaist: "",
    bottomLength: "",
    bottomHip: "",
    bottomThigh: "",
    bottomBottomHem: ""
  }

  createSizeOptions = () => {
    let {clothing} = this.props
    let sizeOptions = clothing.sizes.map(s => {
      return {"key": s.id, "text": s.size, "value": s.id}
    })
    sizeOptions.push({"key": 'New', "text": 'Add New Size', "value": 'New'})
    return sizeOptions
  }

  generateOptions = () => {
    let options = []
    for (let i = 5; i < 66; i++) {
      options.push({"key": i, "text": `${i} inches`, "value": i})
    }
    return options
  }

  checkForNewSize = (e, {name, value}) => {
    if (e.target.innerText === "Add New Size") {
      this.setState({
        addCustomSize: true
      })
    }
    else {
      this.setState({
        addCustomSize: false,
        [name]: value
      })
    }
  }

  customSizeEntry = (e) => {
    this.setState({
      customSizeEntry: e.target.value
    })
  }

  handleDimensionsChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }

  handleMeasurementSubmit = (e, obj) => {
    let {clothing} = this.props
    let {addCustomSize, existingSizeId, customSizeEntry,
        topNeck, topChest, topWaist, topSleeve, topFrontLength,
        bottomWaist, bottomLength, bottomHip, bottomThigh, bottomBottomHem } = this.state

    if (addCustomSize && customSizeEntry === "") {
      console.log("we need size fools!")

    }


    if(clothing.categories[0].name.toLowerCase() === "pants" ||
    clothing.categories[0].name.toLowerCase() === "jeans") {

    }
  }


  render() {
    let {clothing} = this.props
  return(
    <Form>
      <Form.Group>
      <Form.Field
        label='Size'
        placeholder='Select A Size'
        width={4}
        control={Select}
        name='existingSizeId'
        options={this.createSizeOptions()}
        onChange={this.checkForNewSize}
        required
        />
        {this.state.addCustomSize ?
        <Form.Input label='Add Custom Size'
          placeholder='Enter size' width={4}
          required
          onChange={this.customSizeEntry} />
        :
        null
        }
      </Form.Group>

      <Form.Group>
        {clothing.categories[0].name.toLowerCase() === "pants" ||
        clothing.categories[0].name.toLowerCase() === "jeans" ?
          bottomsMeasurements.map(dim => {
            return (
              <Form.Field key={dim}>
                <label>{dim}</label>
                <Dropdown clearable options={this.generateOptions()}
                  selection search
                  name={`bottom${dim.split(" ").join("")}`}
                  onChange={this.handleDimensionsChange}/>
              </Form.Field>
            )
          })
          :
          topMeasurements.map(dim => {
            return (
              <Form.Field key={dim}>
                <label>{dim}</label>
                <Dropdown clearable options={this.generateOptions()}
                   selection search
                   name={`top${dim.split(" ").join("")}`}
                   onChange={this.handleDimensionsChange}
                   />
              </Form.Field>
            )
          })
        }
      </Form.Group>
      <Card.Content textAlign='center'>
          <Button type='submit' animated='fade' color='black' size='big'
           onClick={this.handleMeasurementSubmit}
          >
           <Button.Content visible>Submit Measurement</Button.Content>
           <Button.Content hidden>
              <Icon name='arrow circle up' />
           </Button.Content>
          </Button>
      </Card.Content>
    </Form>
  )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    clothing: state.clothingCollection.find(c => c.id === parseInt(ownProps.match.params.threadId))
  }
}

export default withRouter(connect(mapStateToProps)(AddMeasurementsForm));
