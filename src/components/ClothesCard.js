import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { Card, Image } from 'semantic-ui-react'

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
    clothingCollection: state.clothingCollection,
    clothingSearch: state.clothingSearch,
    brandsSearch: state.brandsSearch,
    categoriesSearch: state.categoriesSearch
  }
}

export default connect(mapStateToProps)(ClothesCard);

// {props.users.find( user => user.id === clothingObj.user_id).username}
