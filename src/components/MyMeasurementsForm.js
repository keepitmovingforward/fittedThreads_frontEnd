import React from 'react';
import {connect} from 'react-redux'
import { Card, Form } from 'semantic-ui-react'
// import {inactivateNavBar} from '../redux/actions'


const MyMeasurementsForm = (props) => {


  return (
    <Card.Content>
      <Card.Header id='profileStatsHeader'>My Measurements</Card.Header>

      <Card.Content>

        <Card.Header id='profileStats'>Top Measurements</Card.Header>
        <Form>
         <Form.Group widths='equal'>
           <Form.Input fluid label='Neck' placeholder='Neck' />
           <Form.Input fluid label='Chest' placeholder='Chest' />
           <Form.Input fluid label='Waist' placeholder='Waist' />
           <Form.Input fluid label='Sleeve' placeholder='Sleeve' />
           <Form.Input fluid label='Front Length' placeholder='Front Length' />
         </Form.Group>
        </Form>

      </Card.Content>

      <Card.Content>
        <Card.Header id='profileStats'>Bottom Measurements</Card.Header>
        <Form>
         <Form.Group widths='equal'>
           <Form.Input fluid label='Waist' placeholder='Waist' />
           <Form.Input fluid label='Length' placeholder='Length' />
           <Form.Input fluid label='Hip' placeholder='Hip' />
           <Form.Input fluid label='Thigh' placeholder='Thigh' />
           <Form.Input fluid label='Bottom Hem' placeholder='Bottom Hem' />
         </Form.Group>
        </Form>
      </Card.Content>
    </Card.Content>
  )
}

const mapStateToProps = state => {
  return {
    clothingCollection: state.clothingCollection,
    user: state.loggedInUser
  }
}

export default connect(mapStateToProps)(MyMeasurementsForm);
