import React, { Component, createRef } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { Card, Image, Icon, Button,
        Rail, Ref, Sticky, Grid
        } from 'semantic-ui-react'
import {closeSelectedClothing, turnSearchOff, inactivateNavBar} from '../redux/actions'

const _ = require("lodash")

class ClothesPreview extends Component {
  contextRef = createRef()

  render() {
    let {selectedClothing} = this.props

    return (

        <Ref innerRef={this.contextRef}>
            <Rail position='right' internal id="clothingPreviewCardRail">
                <Sticky context={this.contextRef}>

                  <Card fluid id="clothingPreviewCard">
                    <Card.Content>
                      <Card.Description>
                        <Grid id='clothingPreviewCardTop'>
                          <Grid.Column floated='left' width={1}>
                            <Icon id='clothPrevCloseBtn' name='close' color='black' size='large'onClick={(e) => this.props.closeSelectedClothing(e)}/>
                          </Grid.Column>
                          <Grid.Column floated='right' width={1}>
                            <Icon name='heart outline' color='red' size='large' onClick={(e) => console.log(e.target.classList["value"])} />
                          </Grid.Column>
                        </Grid>
                      </Card.Description>
                      <Card.Header id="clothesCardBrand">{selectedClothing.brand}</Card.Header>
                      <Card.Header id="clothesCardName">{selectedClothing.name}</Card.Header>
                    </Card.Content>
                    <Image src={selectedClothing.image_url} verticalAlign='middle' centered id="previewImg" />
                    <Card.Content>
                      <Image
                       floated='right'
                       id="clothingPreviewUser"
                       src={selectedClothing.user.avatar}
                      />
                      <Card.Header>posted by</Card.Header>
                      <Card.Meta>{selectedClothing.user.username}</Card.Meta>
                      <Card.Description>
                        {selectedClothing.description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content>
                      <Card.Description>
                        <strong>Category:</strong> {selectedClothing.categories.map(c => _.capitalize(c.name)).join(", ")}
                      </Card.Description>
                      {selectedClothing.sizes.length > 0 ?
                      <Card.Description>
                        <strong>Sizes:</strong> {selectedClothing.sizes.map(s => s.size).join(", ")}
                      </Card.Description>
                      :
                      null
                      }
                    </Card.Content>
                    <Card.Content extra textAlign='center'>
                      <div>
                        <Button animated='fade' color='black'
                          as={ Link }
                          to = {`/threads/${selectedClothing.id}`}
                          id="clothingPrevDetailsBtn"
                          onClick={() => {
                            this.props.inactivateNavBar()
                            this.props.turnSearchOff()
                            }
                          }
                          >
                        <Button.Content visible>Details</Button.Content>
                        <Button.Content hidden>
                          <Icon name='magnify' />
                        </Button.Content>
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>

                </Sticky>
              </Rail>
            </Ref>

    )
  }
}


const mapStateToProps = state => {
  return {
    selectedClothing: state.selectedClothing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSelectedClothing: (e, clothing) => {dispatch ( closeSelectedClothing(e, clothing) )},
    turnSearchOff: () => {dispatch ( turnSearchOff() )},
    inactivateNavBar: () => { dispatch (inactivateNavBar() )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothesPreview);
