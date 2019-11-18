import React, { Component } from 'react';
import { Grid, Container, Modal, Button, Image, Header, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import ClothesContainer from './ClothesContainer'
import SearchColumn from './SearchColumn'
import ClothesPreview from './ClothesPreview'
import {updateFirstTimeUser} from '../redux/actions'


class MainPage extends Component {

  render() {
    let { searchActive, selectedClothing, loggedInUser } = this.props

    return(
      <>
      <div>
        <Modal
          id='modalBox'
          open={loggedInUser.firstTimeUser}
          >
           <Modal.Header id="modalHeader">Welcome to Fitted Threads!</Modal.Header>
           <Modal.Content image>
             <Image wrapped id='modalImg' src='https://images.pexels.com/photos/2100583/pexels-photo-2100583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
             <Modal.Description id='modalText'>
               <Header>Your Source for Fresh Threads matched to your Personal Fit</Header>
               <p>
                 Shopping online for "Threads" (i.e. clothing) can often be hit-or-miss.
                 We're striving to make that an issue of the past by allowing users to share
                 valuable information on measurements for clothing that they've seen in-store or
                 have had the opportunity to measure. Share the knowledge for better fits and save everyone all those minutes burnt
                 on returns.
               </p>
               <p>Stay fitted and Let's get it!</p>
               <p>CHEERS!  - <b>Rob Paik</b> <i>Fitted Threads, Founder and CEO</i></p>
             </Modal.Description>
           </Modal.Content>
           <Modal.Actions>

           <Button
             animated
             size='big'
             id='modalBtn'
             onClick={() => {this.props.updateFirstTimeUser(loggedInUser.id)}}>
             <Button.Content visible>Let's Go!</Button.Content>
             <Button.Content hidden>
               <Icon name='double angle right' />
             </Button.Content>
           </Button>

         </Modal.Actions>
         </Modal>
      </div>
      <Container fluid>
        <Grid columns='equal'>
          <Grid.Row>
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
            <ClothesPreview />
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
    firstTimeUser: state.loggedInUser.firstTimeUser,
    searchActive: state.searchActive,
    selectedClothing: state.selectedClothing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFirstTimeUser: (userId) => {dispatch ( updateFirstTimeUser(userId) )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
