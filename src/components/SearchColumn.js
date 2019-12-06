import React, { Component, createRef   } from 'react';
import { Form, Segment, Checkbox, Header,
        Rail, Ref, Sticky, Dropdown
        } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {updateClothingSearch, updateBrandsSearch, updateCategoriesSearch} from '../redux/actions'

const _ = require("lodash")

class SearchColumn extends Component {
  contextRef = createRef()

  brandOptions = () => {
    return this.props.brands.map(brand => ({
    key: brand,
    text: brand,
    value: brand
    }))
  }

  render() {

    return (
      <>
      <Ref innerRef={this.contextRef}>
        <Rail internal position='left' id='searchColumn'>
          <Sticky context={this.contextRef}>
            <Segment.Group>
              <Segment id='searchColHeader' inverted raised>
                Search
              </Segment>
              <Segment inverted raised>
              <Form inverted>

                <Form.Field>
                  <Checkbox label="Search for My Fitted Threads" />
                </Form.Field>

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

                <Dropdown
                    label='Search by Brand Name'
                    placeholder='Select brand name(s)'
                    fluid
                    multiple
                    search
                    selection
                    options={this.brandOptions()}
                    onChange={this.props.updateBrandsSearch}
                    value={this.props.brandsSearch}
                  />
                </Form.Field>

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
                      checked={this.props.categoriesSearch.includes(category)}
                    />
                  </Form.Field>
                )}


                </Form>
            </Segment>
            </Segment.Group>
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
    clothingSearch: state.clothingSearch,
    brandsSearch: state.brandsSearch,
    categoriesSearch: state.categoriesSearch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateClothingSearch: (e, { name, value }) => {dispatch ( updateClothingSearch(value) )},
    updateBrandsSearch: (e, { value }) => {dispatch ( updateBrandsSearch(value) )},
    updateCategoriesSearch: (e, { name, checked }) => {dispatch ( updateCategoriesSearch(name, checked) )},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchColumn);

// <Form.Field>
//   <label>Search by Specific Brands</label>
// </Form.Field>
// {this.props.brands.map(brand =>
//   <Form.Field key={brand}>
//     <Checkbox
//       key={brand}
//       label={brand}
//       name={brand}
//       onChange={this.props.updateBrandsSearch}
//       checked={this.props.brandsSearch.includes(brand)}
//     />
//   </Form.Field>
// )}
