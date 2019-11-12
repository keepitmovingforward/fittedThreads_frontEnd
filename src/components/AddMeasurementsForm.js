import React, {Component} from 'react';
import { Card, Form, Dropdown, Select, Button, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";

const topMeasurements = ["Neck", "Chest", "Waist", "Sleeve", "Front Length"]
const bottomsMeasurements = ["Waist", "Length", "Hip", "Thigh", "Bottom Hem"]

class AddMeasurementsForm extends Component {

  state = {
    addCustomSize: false,
    customSizeEntry: ""
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

  checkForNewSize = (e) => {
    if (e.target.innerText === "Add New Size") {
      this.setState({
        addCustomSize: true
      })
    }
    else {
      this.setState({
        addCustomSize: false
      })
    }
  }

  customSizeEntry = (e) => {
    this.setState({
      customSizeEntry: e.target.value
    })
  }

  handleMeasurementSubmit = (e) => {
    console.log(e)
    debugger
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
                  key={dim}/>
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
                   />
              </Form.Field>
            )
          })
        }
      </Form.Group>
      <Card.Content textAlign='center'>
          <Button type='submit' animated='fade' color='black'
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
