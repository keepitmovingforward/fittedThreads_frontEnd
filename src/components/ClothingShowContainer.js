import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";
import { Container, Grid, Card, Image, Icon } from 'semantic-ui-react'

const _ = require("lodash")

const ClothingShowContainer = props => {
  let { clothing } = props

  return(
    <Container fluid>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image id='clothingShowImg' src={props.clothing.image_url}/>
          </Grid.Column>
          <Grid.Column width={12}>
            <Card fluid>
              <Card.Content>
                <Card.Description>
                  <Grid>
                    <Grid.Column id='clothingShowHeart' floated='right' width={1}>
                      <Icon name='heart outline' color='red' size='big' onClick={(e) => console.log(e.target.classList["value"])} />
                    </Grid.Column>
                  </Grid>
                </Card.Description>
                <Card.Header id="clothesShowBrand">{clothing.brand}</Card.Header>
                <Card.Header id="clothesShowName">{clothing.name}</Card.Header>

                <Image
                 floated='right'
                 id="clothingShowUser"
                 src={clothing.user.avatar}
                />
              <Card.Header id='clothingShowUserPosted'>posted by</Card.Header>
                <Card.Meta id='clothingShowUserName'>{clothing.user.username}</Card.Meta>
                <Card.Description id='clothingShowDescription'>
                  {clothing.description}
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <strong>Categories:</strong> {clothing.categories.map(c => _.capitalize(c.name)).join(", ")}
                </Card.Description>
                {clothing.sizes.length > 0 ?
                <Card.Description>
                  <strong>Sizes:</strong> {clothing.sizes.map(s => s.size).join(", ")}
                </Card.Description>
                :
                null
                }
              </Card.Content>

            </Card>

          </Grid.Column>

        </Grid.Row>

      </Grid>

    </Container>

  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    clothing: state.clothingCollection.find(c => c.id === parseInt(ownProps.match.params.threadId))
  }
}

export default withRouter(connect(mapStateToProps)(ClothingShowContainer));
