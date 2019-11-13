import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Container, Grid, Card, Image, Form } from 'semantic-ui-react'
import ProfileClothesPosted from './ProfileClothesPosted'

class ProfilePageContainer extends Component {

  render() {
    let {user, clothingCollection} = this.props
    return(
      <Container fluid>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={5}>
              <Card fluid>
                <Card.Content textAlign='center'>
                <Image id='profileAvatar' src={user.avatar}/>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={11}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{user.username}'s Profile</Card.Header>
                  <Card.Description>Stats:</Card.Description>
                  <Card.Description>Threads Posted: {user.clothings.length}</Card.Description>
                  <Card.Description>Threads Fitted: {user.measured_clothings.length}</Card.Description>
                </Card.Content>
                <Card.Content>
                  <Card.Header>My Measurements</Card.Header>

                  <Card.Content>

                    <Card.Header>Top Measurements</Card.Header>
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
                    <Card.Header>Bottom Measurements</Card.Header>
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
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
          <Grid.Column width={8}>
            <Card fluid>
              <Card.Content>
              <Card.Header>Threads I've Posted</Card.Header>
              <Card.Group centered>
                <ProfileClothesPosted />
              </Card.Group>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={8}>
            <Card fluid>
              <Card.Content>
              <Card.Header>Threads I've Measured</Card.Header>
              <Card.Group centered>
                <ProfileClothesPosted />
              </Card.Group>
              </Card.Content>
            </Card>
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

    )
  }
}

const mapStateToProps = state => {
  return {
    clothingCollection: state.clothingCollection,
    user: state.loggedInUser
  }
}

export default connect(mapStateToProps)(ProfilePageContainer)
