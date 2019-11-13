import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { Card, Image, Icon, Button } from 'semantic-ui-react'

const ProfileClothesPosted = (props) => {
  debugger
  return (

    <>
    {props.clothingArray.map(clothingObj =>
      <Card color='black'
        key={clothingObj.id} id='clothesCard'>
        <Card.Content extra textAlign='right'>
          <Icon name='heart outline' color='red' onClick={(e) => console.log(e.target.classList["value"])} />
        </Card.Content>
        <Image src={clothingObj.image_url} verticalAlign='middle' centered id="clothesCardPhoto" bordered />
        <Card.Content id="clothesTextBox">
          <Card.Header id="clothesCardBrand">{clothingObj.brand}</Card.Header>
          <Card.Header id="clothesCardName">{clothingObj.name}</Card.Header>
            <Card.Description textAlign='right'>
            <Button animated='fade' color='black'
              as={Link}
              to = {`/threads/${clothingObj.id}`}
              id='clothingCardDetailsBtn'>
            <Button.Content visible>Details</Button.Content>
            <Button.Content hidden>
              <Icon name='magnify' />
            </Button.Content>
            </Button>
            </Card.Description>
        </Card.Content>
      </Card>
    )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.loggedInUser
  }
}

export default connect(mapStateToProps)(ProfileClothesPosted);
