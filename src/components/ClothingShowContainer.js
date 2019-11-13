import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { Container, Grid, Card, Image, Icon, Button } from 'semantic-ui-react'
import AddMeasurementsForm from './AddMeasurementsForm'
import MeasurementsDisplay from './MeasurementsDisplay'

const _ = require("lodash")

class ClothingShowContainer extends Component {

  state = {
    addMeasurement: false
  }

  handleAddMeasurement = () => {
    this.setState({
      addMeasurement: !this.state.addMeasurement
    })
  }

  sortSizes = () => {
    let {clothing} = this.props
    let value
    let sizeNames = clothing.sizes.map(s => s.size)
    let prepForSort = sizeNames.map(name => {
      let shrunk = name.toLowerCase()
      if (shrunk === 'x-small' || shrunk === 'xs' || shrunk === 'x-s') {
          value = 1000;
      }
      else if (shrunk === 'small' || shrunk === 's' || shrunk ==='sm') {
          value = 1001;
      }
      else if (shrunk === 'medium' || shrunk === 'm' || shrunk ==='med') {
          value = 1002;
      }
      else if (shrunk === 'large' || shrunk === 'l' || shrunk ==='lg') {
          value = 1003;
      }
      else if (shrunk === 'x-large' || shrunk === 'xl' || shrunk === 'x-l') {
          value = 1004;
      }
      else if (shrunk === 'xx-large' || shrunk === 'xxl' || shrunk === 'xx-l') {
          value = 1005;
      }
      else if (shrunk === (parseInt(name.toLowerCase()).toString())) {
          value = 1 + parseInt(name.toLowerCase());
      }
      else {
          value = 9999;
      }
      return [value, name]
    })
      prepForSort.sort((function(a, b)
      {
          if(a[0] === b[0])
          {
              var x = a[1].toLowerCase(), y = b[1].toLowerCase();

              return x < y ? -1 : x > y ? 1 : 0;
          }
          return a[0] - b[0];
      }))

      return prepForSort.map(e => e[1]).join(", ")
  }

  render() {
  let { clothing } = this.props

  return(
    <Container fluid>
      <Grid celled id='clothingShowGrid'>
        <Grid.Row>
          <Grid.Column width={4} id='clothingShowImgCol'>
            <Card fluid id='clothingShowImageCard'>
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
                  {this.sortSizes()}
                </Card.Description>
                </>
                :
                null
                }
              </Card.Content>
                {clothing.user_clothings.length > 0 ?
                  <>
                  <MeasurementsDisplay / >
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



                  <AddMeasurementsForm handleAddMeasurement={this.handleAddMeasurement}/>


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
