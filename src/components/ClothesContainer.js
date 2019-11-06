import React from 'react';
import { Card } from 'semantic-ui-react'
import ClothesCard from './ClothesCard'

const ClothesContainer = props => {
  return(
    <Card.Group>
      <ClothesCard/>
    </Card.Group>
  )
}


export default ClothesContainer
