import React from 'react';
import {connect} from 'react-redux'
import { Card, Image, Icon } from 'semantic-ui-react'
// import {updateSelectedClothing} from '../redux/actions'

const ClothesPreview = (props) => {
  let {selectedClothing} = props

  return (

    <>

      <Card color='black' fluid
        key={selectedClothing.id}>
        <Card.Content>
          <Card.Description textAlign='right' extra>
            <Icon name='heart outline' color='red' iconPosition='right' onClick={(e) => console.log(e.target.classList["value"])} />
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
      </Card>

    </>
  )
}


const mapStateToProps = state => {
  return {
    selectedClothing: state.selectedClothing
  }
}


export default connect(mapStateToProps)(ClothesPreview);
