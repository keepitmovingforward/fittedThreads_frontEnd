import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Container, Grid, Card, Image } from 'semantic-ui-react'
import ProfileClothesPosted from './ProfileClothesPosted'
import MyMeasurementsForm from './MyMeasurementsForm'

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
            <Grid.Column width={4}>
              <Card fluid id='profileAvatarBox'>
                <Card.Content textAlign='center'>
                <Image id='profileAvatar' src={user.avatar}/>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={12}>
              <Card fluid>
                <Card.Content>
                  <Card.Header id='profileHeader'>{`${user.username}'s Profile`}</Card.Header>
                  <Card.Description id='profileStatsHeader'>User Stats</Card.Description>
                  <Card.Description id='profileStats'>Posted Threads: {user.clothings.length}</Card.Description>
                  <Card.Description id='profileStats'>Fitted Threads: {user.measured_clothings.length}</Card.Description>
                </Card.Content>

                <MyMeasurementsForm />

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
