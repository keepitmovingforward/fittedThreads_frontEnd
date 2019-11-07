import React from 'react';
import {connect} from 'react-redux'
import { Card, Image, Icon } from 'semantic-ui-react'
// import {updateSelectedClothing} from '../redux/actions'

const ClothesPreview = (props) => {
  let {selectedClothing} = props

  return (

    <>

      <Card color='black'
        key={selectedClothing.id}>
        <Card.Content extra textAlign='right'>
          <Icon name='heart' onClick={(e) => console.log(e.target.classList["value"])} />
        </Card.Content>
        <Image src={selectedClothing.image_url} verticalAlign='middle' centered bordered />
        <Card.Content id="clothesTextBox">
          <Card.Header id="clothesCardBrand">{selectedClothing.brand}</Card.Header>
          <Card.Header id="clothesCardName">{selectedClothing.name}</Card.Header>
          <Card.Description id="clothesCardUser">posted by {selectedClothing.user.username}</Card.Description>
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
