import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Container, Grid, Card, Image, Form } from 'semantic-ui-react'
import ProfileClothesPosted from './ProfileClothesPosted'

const _ = require("lodash")

class ProfilePageContainer extends Component {

  filterMeasuredClothing = () => {
    let {user} = this.props
    let uniqueClothKeys = _.uniq(user.measured_clothings.map(e => e.id))

    return uniqueClothKeys.map(k => user.measured_clothings.find(c => c.id === k))


  }

  render() {
    window.scrollTo(0,0);
    let {user} = this.props
    return(
      <Container fluid>
        <Grid celled columns='equal'>
          <Grid.Row>
            <Grid.Column width={5}>
              <Card fluid id='profileAvatarBox'>
                <Card.Content textAlign='center'>
                <Image id='profileAvatar' src={user.avatar}/>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={11}>
              <Card fluid>
                <Card.Content>
                  <Card.Header id='profileHeader'>{user.username}'s Profile</Card.Header>
                  <Card.Description id='profileStatsHeader'>User Stats</Card.Description>
                  <Card.Description id='profileStats'>Posted Threads: {user.clothings.length}</Card.Description>
                  <Card.Description id='profileStats'>Fitted Threads: {user.measured_clothings.length}</Card.Description>
                </Card.Content>
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
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
          {user.clothings.length > 0 ?
          <Grid.Column>
            <Card fluid id='profileThreadsHeaderPostCard'>
              <Card.Content>
              <Card.Header id='profileThreadsHeaderPost'>Posted Threads</Card.Header>
              </Card.Content>
            </Card>
            <Card fluid id='profileThreadsBox'>
              <Card.Content>
              <Card.Group centered>
                <ProfileClothesPosted clothingArray={user.clothings}/>
              </Card.Group>
              </Card.Content>
            </Card>
          </Grid.Column>
          :
          null
          }
          {user.measured_clothings.length > 0 ?
          <Grid.Column>
            <Card fluid id='profileThreadsHeaderMeasuredCard'>
              <Card.Content>
              <Card.Header id='profileThreadsHeaderMeasured'>Fitted Threads</Card.Header>
              </Card.Content>
            </Card>
            <Card fluid id='profileThreadsBox'>
              <Card.Content>
              <Card.Group centered>
                <ProfileClothesPosted clothingArray={this.filterMeasuredClothing()}/>
              </Card.Group>
              </Card.Content>
            </Card>
          </Grid.Column>
          :
          null
          }
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
