import React from "react";
import { Link } from 'react-router-dom'
import { Image, Grid, Button, Form, Container, Message, Header, Segment } from "semantic-ui-react";
import {connect} from 'react-redux'
import {handleLoginSubmit} from '../redux/actions'


class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' id="loginBackground">
    <Grid.Column style={{ maxWidth: 550 }}>
      <Image src='https://fontmeme.com/permalink/191104/0280bed54d0e9e77f2c3131d3b7a1b61.png' centered id="logo" />
      <Header as='h2' color='black' textAlign='center' id="loginForm">
        Log-in to your account
      </Header>
      <Form
        size='big'
        onSubmit={() => this.props.handleLoginSubmit(this.state.username, this.state.password)}
        >
        <Segment stacked>
          <Form.Input
            fluid icon='user'
            iconPosition='left'
            placeholder='Enter Username'
            name='username'
            onChange={this.handleChange}
            value={this.state.username} />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Enter Password'
            type='password'
            name='password'
            onChange={this.handleChange}
            value={this.state.password}
          />

          <Button color='black' fluid size='large' type="submit">
            Login
          </Button>
        </Segment>
      </Form>
      <Message as={ Link } to ='/signup'>
        <a>Create an Account</a>
      </Message>
    </Grid.Column>
  </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLoginSubmit: (username, password) => {dispatch ( handleLoginSubmit(username, password) )}
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser,
    clothingLoading: state.clothingLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
