import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import {connect} from 'react-redux'

class MainPage extends Component {

  render() {
    return(
      <div>Main Page</div>
    )
  }

}

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  }
}

export default connect(mapStateToProps)(MainPage);

// this.props.currentUser ?
// <Grid celled id="mainPage">
//   <Grid.Row>
//       <Grid.Column width={12}>
//           <ItemContainer items={this.props.items.filter(itemObj => itemObj.user_id !== this.props.currentUser.id)}
//             users={this.props.users}
//             currentUser={this.props.currentUser}
//             itemsPerRow={5}
//             />
//       </Grid.Column>
//       <Grid.Column width={4}>
//       <UserBox user={this.props.currentUser}
//         itemsPerRow={3}
//       />
//       </Grid.Column>
//   </Grid.Row>
// </Grid>
// :
// <Grid celled id="mainPage">
//   <Grid.Row>
//       <Grid.Column width={16}>
//           <ItemContainer items={this.props.items}
//             users={this.props.users}
//             currentUser={this.props.currentUser}
//             itemsPerRow={6}
//             />
//       </Grid.Column>
//   </Grid.Row>
// </Grid>
