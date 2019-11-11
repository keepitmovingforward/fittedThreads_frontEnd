import React, { Component, createRef   } from 'react';
import { Form, Segment, Checkbox,
        Rail, Ref, Sticky
        } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {updateClothingSearch, updateBrandsSearch, updateCategoriesSearch} from '../redux/actions'

const _ = require("lodash")

class SearchColumn extends Component {
  contextRef = createRef()

  render() {

    return (
      <>
      <Ref innerRef={this.contextRef}>
        <Rail internal position='left' id='searchColumn'>
          <Sticky context={this.contextRef}>
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
                {this.props.categories.map(category =>
                  <Form.Field key={category}>
                    <Checkbox
                      key={category}
                      label={_.capitalize(category)}
                      name={category}
                      onChange={this.props.updateCategoriesSearch}
                    />
                  </Form.Field>
                )}
                </Form>
            </Segment>
            </Sticky>
          </Rail>
        </Ref>

      </>
    )
  }

}

const mapStateToProps = state => {
  return {
    brands: state.brands,
    categories: state.categories.map(c => c.name).sort(),
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