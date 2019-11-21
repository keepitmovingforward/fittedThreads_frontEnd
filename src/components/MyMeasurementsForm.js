import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Card, Form } from 'semantic-ui-react'
import {updateUserMeasurements} from '../redux/actions'


class MyMeasurementsForm extends Component {
  render() {
  let { user } = this.props

  return (
    <Card.Content>
      <Card.Header id='profileStatsHeader'>My Measurements</Card.Header>

      <Card.Content>

        <Card.Header id='profileStats'>Top Measurements</Card.Header>
        <Form>
         <Form.Group widths='equal'>
           <Form.Input fluid label='Neck' name='topNeck' value={user.topNeck} onChange={(e, {name, value}) => {this.props.updateUserMeasurements(name, value)}}/>
           <Form.Input fluid label='Chest' name='topChest' value={user.topChest} />
           <Form.Input fluid label='Waist' name='topWaist' value={user.topWaist}/>
           <Form.Input fluid label='Sleeve' name='topSleeve' value={user.topSleeve}/>
           <Form.Input fluid label='Front Length' name='topFront_Length' value={user.topFront_Length} />
         </Form.Group>
        </Form>

      </Card.Content>

      <Card.Content>
        <Card.Header id='profileStats'>Bottom Measurements</Card.Header>
        <Form>
         <Form.Group widths='equal'>
           <Form.Input fluid label='Waist' name='bottomWaist' value={user.bottomWaist} />
           <Form.Input fluid label='Length' name='bottomLength' value={user.bottomLength} />
           <Form.Input fluid label='Hip' name='bottomHip' value={user.bottomHip} />
           <Form.Input fluid label='Thigh' name='bottomThigh' value={user.bottomThigh}  />
           <Form.Input fluid label='Bottom Hem' name='bottomBottom_Hem' value={user.bottomBottom_Hem} />
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
