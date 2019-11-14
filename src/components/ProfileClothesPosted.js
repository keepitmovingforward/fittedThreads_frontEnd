import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import {inactivateNavBar} from '../redux/actions'


const ProfileClothesPosted = (props) => {
  return (

    <>
    {props.clothingArray.map(clothingObj =>
      <Card color='black' id='profileClothesCard'
        key={clothingObj.id}>
        <Card.Content extra textAlign='right' id='profileClothesCardHeart'>
          <Icon name='heart outline' color='red' onClick={(e) => console.log(e.target.classList["value"])} />
        </Card.Content>
        <Image src={clothingObj.image_url} verticalAlign='middle' centered id="profileClothesCardPhoto" bordered />
        <Card.Content id="profileClothesTextBox">
          <Card.Header id="profileClothesCardBrand">{clothingObj.brand}</Card.Header>
          <Card.Header id="profileClothesCardName">{clothingObj.name}</Card.Header>

            <Button animated='fade' color='black'
              as={Link}
              to = {`/threads/${clothingObj.id}`}
              onClick={props.inactivateNavBar}
              id='profileClothesCardDetailsBtn'>
            <Button.Content visible>Details</Button.Content>
            <Button.Content hidden>
              <Icon name='magnify' />
            </Button.Content>
            </Button>

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

const mapDispatchToProps = dispatch => {
  return {
    inactivateNavBar: () => { dispatch (inactivateNavBar() )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileClothesPosted);
