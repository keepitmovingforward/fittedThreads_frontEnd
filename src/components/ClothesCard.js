import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { Card, Image } from 'semantic-ui-react'

const ClothesCard = (props) => {

  return (

    <>
    {props.clothingCollection.map(clothingObj =>
      <Card color='black' as={Link} to={`/thread/${clothingObj.id}`}
        key={clothingObj.id}>
        <Image src={clothingObj.image_url} verticalAlign='middle' centered id="clothesPhoto" bordered />
        <Card.Content id="clothesTextBox">
          <Card.Header id="clothesCardBrand">{clothingObj.brand}</Card.Header>
          <Card.Header id="clothesCardName">{clothingObj.name}</Card.Header>
          <Card.Description id="clothesCardUser">posted by {clothingObj.user.username}</Card.Description>
        </Card.Content>
      </Card>)
    }
    </>
  )
}

const mapStateToProps = state => {
  return {
    clothingCollection: state.clothingCollection
  }
}

export default connect(mapStateToProps)(ClothesCard);

// {props.users.find( user => user.id === clothingObj.user_id).username}
