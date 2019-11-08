import React, { Component, createRef } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { Card, Image, Icon, Button, Grid,
        Rail, Ref, Sticky, Container
        } from 'semantic-ui-react'

const _ = require("lodash")

class ClothesPreview extends Component {
  contextRef = createRef()

  render() {
    let {selectedClothing} = this.props

    return (
      <Grid.Column width={3}>
        <Ref innerRef={this.contextRef}>
            <Rail>
                <Sticky context={this.contextRef}>
                <Container fluid>
                  <Card fluid id="clothingPreviewCard">
                    <Card.Content>
                      <Card.Description textAlign='right'>
                        <Icon name='heart outline' color='red' onClick={(e) => console.log(e.target.classList["value"])} />
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
                        <strong>Categories:</strong> {selectedClothing.categories.map(c => _.capitalize(c.name)).join(", ")}
                      </Card.Description>
                      {selectedClothing.sizes.length > 0 ?
                      <Card.Description>
                        <strong>Sizes:</strong> {selectedClothing.sizes.map(s => s.size).join(", ")}
                      </Card.Description>
                      :
                      null
                      }
                    </Card.Content>
                    <Card.Content extra>
                      <div>
                        <Button animated='fade' color='black'
                          as={ Link }
                          to = {`/threads/${selectedClothing.id}`}
                          id="clothingPrevDetailsBtn">
                        <Button.Content visible>Details</Button.Content>
                        <Button.Content hidden>
                          <Icon name='external alternate' />
                        </Button.Content>
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                  </Container>
                </Sticky>
              </Rail>
            </Ref>
        </Grid.Column>
    )
  }
}


const mapStateToProps = state => {
  return {
    selectedClothing: state.selectedClothing
  }
}


export default connect(mapStateToProps)(ClothesPreview);
