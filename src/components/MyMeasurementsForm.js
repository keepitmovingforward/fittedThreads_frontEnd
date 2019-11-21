import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Card, Form, Dropdown } from 'semantic-ui-react'
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


  render() {
  let { user } = this.props

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
               value={user.topNeck}
               onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
           </Form.Field>
           <Form.Field>
             <label>Chest</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topChest'}
               value={user.topChest}
               onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
           </Form.Field>
           <Form.Field>
             <label>Waist</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topWaist'}
               value={user.topWaist}
               onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
           </Form.Field>
           <Form.Field>
             <label>Sleeve</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topSleeve'}
               value={user.topSleeve}
               onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
           </Form.Field>
           <Form.Field>
             <label>Front Length</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topFront_Length'}
               value={user.topFront_Length}
               onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
           </Form.Field>
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
                value={user.bottomWaist}
                onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
            </Form.Field>
            <Form.Field>
              <label>Length</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomLength'}
                value={user.bottomLength}
                onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
            </Form.Field>
            <Form.Field>
              <label>Hip</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomHip'}
                value={user.bottomHip}
                onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
            </Form.Field>
            <Form.Field>
              <label>Thigh</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomThigh'}
                value={user.bottomThigh}
                onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
            </Form.Field>
            <Form.Field>
              <label>Bottom Hem</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomBottom_Hem'}
                value={user.bottomBottom_Hem}
                onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
            </Form.Field>
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
