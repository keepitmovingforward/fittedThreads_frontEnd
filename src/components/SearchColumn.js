import React, { Component } from 'react';
import { Form, Segment, Checkbox } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {updateClothingSearch, updateBrandsSearch, updateCategoriesSearch} from '../redux/actions'

const _ = require("lodash")

class SearchColumn extends Component {

  render() {

    return (
      <>
      <Segment inverted raised>
        <Form inverted>
          <Form.Input
            fluid icon='search'
            iconPosition='left'
            label='Search by Clothing Name'
            name='clothingSearch'
            placeholder='Enter clothing name'
            onChange={this.props.updateClothingSearch}
            value={this.props.clothingSearch}
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
                onChange={this.props.updateBrandsSearch}
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
                onChange={this.props.updateCategoriesSearch}
              />
            </Form.Field>
          )}
          </Form>
      </Segment>

      </>
    )
  }

}

const mapStateToProps = state => {
  return {
    brands: state.brands,
    categories: state.categories,
    clothingSearch: state.clothingSearch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateClothingSearch: (e, { name, value }) => {dispatch ( updateClothingSearch(value) )},
    updateBrandsSearch: (e, { name, checked }) => {dispatch ( updateBrandsSearch(name, checked) )},
    updateCategoriesSearch: (e, { name, checked }) => {dispatch ( updateCategoriesSearch(name, checked) )},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchColumn);
