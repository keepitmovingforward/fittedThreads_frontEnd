import React, { Component } from 'react';
import { Form, Segment, Checkbox } from 'semantic-ui-react';
import {connect} from 'react-redux'

const _ = require("lodash")

class SearchColumn extends Component {

  state = {
    clothingSearch: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleBrandChange = (e, {name, checked} ) => {
    console.log(name, checked)
  }

  handleCategoryChange = (e, {name, checked} ) => {
    console.log(name, checked)
  }

  render() {

    return (
      <Segment fluid inverted>
        <Form inverted>
          <Form.Input
            fluid icon='search'
            iconPosition='left'
            label='Search by Clothing Name'
            name='clothingSearch'
            placeholder='Enter clothing name'
            onChange={this.handleChange}
            value={this.state.clothingSearch}
          />

          <Form.Field>
            <label>Search by Specific Brands</label>
          </Form.Field>
          {this.props.brands.map(brand =>
            <Form.Field key={brand}>
              <Checkbox
                key={brand}
                label={brand}
                name={brand}
                onChange={this.handleBrandChange}
              />
            </Form.Field>
          )}
          <Form.Field>
            <label>Search by Specific Categories</label>
          </Form.Field>
          {this.props.categories.map(categories =>
            <Form.Field key={categories.id}>
              <Checkbox
                key={categories.id}
                label={_.capitalize(categories.name)}
                name={categories.name}
                onChange={this.handleCategoryChange}
              />
            </Form.Field>
          )}

        </Form>
      </Segment>
    )
  }

}

const mapStateToProps = state => {
  return {
    clothingCollection: state.clothingCollection,
    brands: state.brands,
    categories: state.categories
  }
}

export default connect(mapStateToProps)(SearchColumn);
