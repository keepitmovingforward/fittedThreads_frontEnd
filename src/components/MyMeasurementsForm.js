import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Card, Form, Dropdown, Button, Icon } from 'semantic-ui-react'
import {updateUserMeasurements} from '../redux/actions'
import {generateOptions} from './importFunctions'


class MyMeasurementsForm extends Component {

  state = {
    topNeck: this.props.user.topNeck,
    topChest: this.props.user.topChest,
    topWaist: this.props.user.topWaist,
    topSleeve: this.props.user.topSleeve,
    topFront_Length: this.props.user.topFront_Length,
    bottomWaist: this.props.user.bottomWaist,
    bottomLength: this.props.user.bottomLength,
    bottomHip: this.props.user.bottomHip,
    bottomThigh: this.props.user.bottomThigh,
    bottomBottom_Hem: this.props.user.bottomBottom_Hem
  }


  handleDimensionsChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (measurements) => {
    console.log("measurements: ", measurements)
    debugger
  }

  render() {
  let { user } = this.props
  let { topNeck, topChest, topWaist, topSleeve, topFront_Length,
        bottomWaist, bottomLength, bottomHip, bottomThigh, bottomBottom_Hem} = this.state

  return (
    <Card.Content>
      <Card.Header id='profileStatsHeader'>My Measurements</Card.Header>

      <Card.Content>

        <Card.Header id='profileStats'>Top Measurements</Card.Header>
        <Form>
         <Form.Group widths='equal'>
           <Form.Field>
             <label>Neck</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topNeck'}
               value={this.state.topNeck}
               onChange={this.handleDimensionsChange}/>
           </Form.Field>
           <Form.Field>
             <label>Chest</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topChest'}
               value={this.state.topChest}
               onChange={this.handleDimensionsChange}/>
           </Form.Field>
           <Form.Field>
             <label>Waist</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topWaist'}
               value={this.state.topWaist}
               onChange={this.handleDimensionsChange}/>
           </Form.Field>
           <Form.Field>
             <label>Sleeve</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topSleeve'}
               value={this.state.topSleeve}
               onChange={this.handleDimensionsChange}/>
           </Form.Field>
           <Form.Field>
             <label>Front Length</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topFront_Length'}
               value={this.state.topFront_Length}
               onChange={this.handleDimensionsChange}/>
           </Form.Field>
         </Form.Group>
         <Form.Group>
           <Button
             animated='fade'
             size='large'
             type='submit'
             onClick={() => this.handleSubmit({ topNeck, topChest, topWaist, topSleeve, topFront_Length})}>
             <Button.Content visible>Update Top Measurements</Button.Content>
             <Button.Content hidden>
               <Icon name='save' />
             </Button.Content>
           </Button>
         </Form.Group>
        </Form>

      </Card.Content>

      <Card.Content>
        <Card.Header id='profileStats'>Bottom Measurements</Card.Header>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Waist</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomWaist'}
                value={this.state.bottomWaist}
                onChange={this.handleDimensionsChange}/>
            </Form.Field>
            <Form.Field>
              <label>Length</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomLength'}
                value={this.state.bottomLength}
                onChange={this.handleDimensionsChange}/>
            </Form.Field>
            <Form.Field>
              <label>Hip</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomHip'}
                value={this.state.bottomHip}
                onChange={this.handleDimensionsChange}/>
            </Form.Field>
            <Form.Field>
              <label>Thigh</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomThigh'}
                value={this.state.bottomThigh}
                onChange={this.handleDimensionsChange}/>
            </Form.Field>
            <Form.Field>
              <label>Bottom Hem</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomBottom_Hem'}
                value={this.state.bottomBottom_Hem}
                onChange={this.handleDimensionsChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Button animated='fade'
              size='large'
              type='submit'
              onClick={() => this.handleSubmit({ bottomWaist, bottomLength, bottomHip, bottomThigh, bottomBottom_Hem})}>
              <Button.Content visible>Update Bottom Measurements</Button.Content>
              <Button.Content hidden>
                <Icon name='save' />
              </Button.Content>
            </Button>
          </Form.Group>
        </Form>
      </Card.Content>
    </Card.Content>
  )
  }
}

const mapStateToProps = state => {
  return {
    clothingCollection: state.clothingCollection,
    user: state.loggedInUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserMeasurements: (name, value) => {dispatch (updateUserMeasurements(name, value))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMeasurementsForm);
