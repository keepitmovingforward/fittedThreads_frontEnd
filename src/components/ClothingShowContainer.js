import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { Container, Grid, Card, Image, Icon, Button } from 'semantic-ui-react'

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
                    <Grid.Column floated='left' width={1}>
                      <div>
                        <Button animated='fade' color='black'
                          as={ Link }
                          to = {`/home`}>
                        <Button.Content visible>Back</Button.Content>
                        <Button.Content hidden>
                          <Icon name='home' />
                        </Button.Content>
                        </Button>
                      </div>
                    </Grid.Column>
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
                <Card.Header id='clothingShowCategory'>
                  <strong>Category:</strong> {clothing.categories.map(c => _.capitalize(c.name)).join(", ")}
                </Card.Header>
                {clothing.sizes.length > 0 ?
                <>
                <Card.Description id='clothingShowSizes'>
                  <strong>Sizes Available:</strong>
                </Card.Description>
                <Card.Description id='clothingShowSizes'>
                  {clothing.sizes.map(s => s.size).join(", ")}
                </Card.Description>
                </>
                :
                null
                }
              </Card.Content>
                {clothing.user_clothings.length > 0 ?
                  <>
                  <Card.Content>
                    <Card.Header id='clothingShowCategory'>
                      <strong>Measurements</strong>
                    </Card.Header>
                <Card.Description id='clothingShowSizes'>
                  <strong>Measurements Available:</strong>
                </Card.Description>
                <Card.Description id='clothingShowSizes'>
                  {clothing.user_clothings.map(measurement => {
                    return (
                      <Card key={measurement.id}>
                        <Card.Description>{measurement.measurements}</Card.Description>
                      </Card>
                    )
                  })}
                </Card.Description>
              </Card.Content>
                </>
                :
                null
                }

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
