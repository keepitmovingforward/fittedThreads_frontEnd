import React from 'react';
import {connect} from 'react-redux'
import { Card, Image, Icon } from 'semantic-ui-react'
import {updateSelectedClothing} from '../redux/actions'

const ClothesCard = (props) => {

  const filterClothingCollection = () => {
    return props.clothingCollection.filter(
      c =>
      c.name.toLowerCase().includes(props.clothingSearch.toLowerCase())
    ).filter(
      c => {
      if(props.brandsSearch.length === 0) {
        return true
      }
      else {
        if (props.brandsSearch.includes(c.brand)) {
          return true
        }
      }
      return false
      }

    ).filter(
      c => {
        for(let i = 0; i < c.categories.length; i++) {
          if (props.categoriesSearch.length === 0) {
            return true
          }
          else {
            if (props.categoriesSearch.includes(c.categories[i].name)) {
              return true
            }
          }
        }
        return false
        }
      )
  }


  return (

    <>
    {filterClothingCollection().map(clothingObj =>
      <Card color='black' onClick={(e) => props.updateSelectedClothing(e, clothingObj)}
        key={clothingObj.id}>
        <Card.Content extra textAlign='right'>
          <Icon name='heart outline' color='red' onClick={(e) => console.log(e.target.classList["value"])} />
        </Card.Content>
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
    clothingCollection: state.clothingCollection,
    clothingSearch: state.clothingSearch,
    brandsSearch: state.brandsSearch,
    categoriesSearch: state.categoriesSearch
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedClothing: (e, clothing) => {dispatch ( updateSelectedClothing(e, clothing) )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClothesCard);

// {props.users.find( user => user.id === clothingObj.user_id).username}
