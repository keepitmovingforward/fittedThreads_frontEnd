import React, { Component } from 'react';
import { Grid, Container, Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import ClothesContainer from './ClothesContainer'
import SearchColumn from './SearchColumn'

class MainPage extends Component {

  state = {
    selectedClothing: true
  }

  render() {
    let { searchActive } = this.props
    let { selectedClothing } = this.state
    return(
      <>
      <Container fluid>
        <Grid columns='equal' divided>
          <Grid.Row stretched>
            {searchActive ?
            <Grid.Column width={3}>
              <SearchColumn />
            </Grid.Column>


      :
      null}
            <Grid.Column>
                <ClothesContainer />
            </Grid.Column>

      {selectedClothing ?
            <Grid.Column width={3}>
              <Image src="http://placeimg.com/200/200/animals" centered></Image>
            </Grid.Column>
      :
      null}
          </Grid.Row>
        </Grid>
      </Container>
      </>
    )
  }

}

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser,
    searchActive: state.searchActive
  }
}

export default connect(mapStateToProps)(MainPage);
