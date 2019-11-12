import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { Container, Grid, Card, Image, Icon, Button, Segment, Form, Select } from 'semantic-ui-react'

const _ = require("lodash")
const topMeasurements = ["Neck", "Chest", "Waist", "Sleeve", "Front Length"]
const bottomsMeasurements = ["Waist", "Length", "Hip", "Thigh", "Bottom Hem"]

class ClothingShowContainer extends Component {

  state = {
    addMeasurement: false,
    customSize: false
  }

  handleAddMeasurement = () => {
    this.setState({
      addMeasurement: !this.state.addMeasurement
    })
  }

  createSizeOptions = () => {
    let {clothing} = this.props
    let sizeOptions = clothing.sizes.map(s => {
      return {"key": s.id, "text": s.size, "value": s.id}
    })
    sizeOptions.push({"key": 'New', "text": 'Add New Size', "value": 'New'})
    return sizeOptions
  }

  render() {
  let { clothing } = this.props

  return(
    <Container fluid>
      <Grid celled id='clothingShowGrid'>
        <Grid.Row>
          <Grid.Column width={4} id='clothingShowImgCol'>
            <Card fluid>
            <Card.Content textAlign='center'>
            <Image id='clothingShowImg' src={clothing.image_url}/>
            </Card.Content>
            <Card.Content>
            <Image
             floated='right'
             id="clothingShowUser"
             src={clothing.user.avatar}
            />
            <Card.Header id='clothingShowUserPosted'>posted by</Card.Header>
            <Card.Meta id='clothingShowUserName'>{clothing.user.username}</Card.Meta>
            </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12} id='clothingShowDetailCol'>
            <Card fluid>
              <Card.Content>
                <Card.Description>
                  <Grid>
                    <Grid.Column floated='left' width={1}>
                      <div>
                        <Button animated='fade' color='black' size='large'
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


                <Card.Description id='clothingShowDescription'>
                  {clothing.description}
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Header id='clothingShowCategoryHeader'>
                  <strong>ADDITIONAL DETAILS</strong>
                </Card.Header>
                <Card.Description id='clothingShowCategory'>
                  <strong>Category:</strong>
                </Card.Description>
                <Card.Description id='clothingShowCategory'>
                  {clothing.categories.map(c => _.capitalize(c.name)).join(", ")}
                </Card.Description>
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
                    <Card.Header id='clothingShowMeasuresHeader'>
                      <strong>MEASUREMENTS</strong>
                    </Card.Header>
                  <Grid columns='equal'>
                    <Grid.Row id='clothingShowMeasures'>
                      <Grid.Column width={8} textAlign='center'>
                        <Card.Description id='clothingShowMeasures'>
                          <strong>SIZE</strong>
                        </Card.Description>
                      </Grid.Column>
                      <Grid.Column width={8} textAlign='center'>
                        <Card.Description id='clothingShowMeasures'>
                          <strong>FITTED MEASUREMENTS</strong>
                        </Card.Description>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>


                <Grid columns='equal'>
                  {clothing.sizes.map(size =>
                    <Grid.Row key={size.id}>
                      <Grid.Column width={8}>
                        <Segment id='clothingShowInnerMeasures'><strong>{size.size}</strong> </Segment>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        {clothing.user_clothings.filter(measurement => size.id === measurement.size_id).map(sizedMeasures =>
                          <Segment id='clothingShowInnerMeasures' key={sizedMeasures.id}> {sizedMeasures.measurements} by User ID:{sizedMeasures.user_id}</Segment>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  )}
                </Grid>
                </Card.Content>
                </>
                :
                null
                }
                {!this.state.addMeasurement ?
                <Card.Content textAlign='center'>
                <Button animated='vertical' color='black'
                  size='big' id='addMeasBtn' onClick={this.handleAddMeasurement}>
                  <Button.Content visible>Add Measurement</Button.Content>
                  <Button.Content hidden>
                    <Icon name='add circle' />
                  </Button.Content>
                </Button>
                </Card.Content>

                :
                <Card.Content>
                <Card.Header textAlign='right'>
                  <Button icon color='black' size='large' onClick={this.handleAddMeasurement}>
                    <Icon name='close'/>
                  </Button>
                </Card.Header>
                  <Form>
                  <Form.Group>
                  <Form.Field
                    label='Size'
                    placeholder='Select A Size'
                    width={4}
                    control={Select}
                    options={this.createSizeOptions()}
                    />
                  </Form.Group>
                  </Form>
                </Card.Content>
                }

            </Card>

          </Grid.Column>

        </Grid.Row>

      </Grid>

    </Container>

  )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    clothing: state.clothingCollection.find(c => c.id === parseInt(ownProps.match.params.threadId))
  }
}

export default withRouter(connect(mapStateToProps)(ClothingShowContainer));
