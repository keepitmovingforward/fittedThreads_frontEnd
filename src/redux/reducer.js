import {combineReducers} from 'redux'


let initialState = {
  clothingCollection: [],
  categories: [],
  brands: [],
  loggedInUser: null,
  clothingLoading: true,
  searchActive: false,
  clothingSearch: "",
  brandsSearch: [],
  categoriesSearch: [],
  selectedClothing: null,
  activeItem: 'home'
}

let clothingLoadingReducer = (state=initialState.clothingLoading, action) => {
  switch (action.type) {
    case "FETCHES_COMPLETE":
      return false
    default:
      return state
  }
}


let clothingCollectionReducer = (state=initialState.clothingCollection, action) => {
  switch (action.type) {
    case "FETCHED_CLOTHINGS":
      return action.payload
    default:
      return state
  }
}

let categoriesReducer = (state=initialState.categories, action) => {
  switch (action.type) {
    case "FETCHED_CATEGORIES":
      return action.payload
    default:
      return state
  }
}

let brandsReducer = (state=initialState.brands, action) => {
  switch (action.type) {
    case "FETCHED_BRANDS":
      return action.payload
    default:
      return state
  }
}

let loggedInUserReducer = (state=initialState.loggedInUser, action) => {
  switch (action.type) {
    case "LOG_OUT":
      return null
    case "LOGIN_USER":
      return action.payload
    case "UPDATE_FIRST_TIME_STATUS":
      return action.payload
    case "USER_ADD_MEASUREMENT":
      return action.payload
    case "USER_UPDATE_MEASUREMENTS":
      return action.payload
    default:
      return state
    }
  }

let searchActiveReducer = (state=initialState.searchActive, action) => {
  switch (action.type) {
    case "TOGGLE_SEARCH_OFF":
      return false
    case "TOGGLE_SEARCH_ON":
      return true
    case "HOME":
      return false
    case "LOG_OUT":
      return false
    default:
      return state
    }
  }

let clothingSearchReducer = (state=initialState.clothingSearch, action) => {
  switch (action.type) {
    case "UPDATE_CLOTHING_SEARCH":
      return action.payload
    case "LOG_OUT":
      return ""
    case "HOME":
      return ""
    case "TOGGLE_SEARCH_OFF":
      return ""
    case "ALL_SEARCHES_OFF":
      return ""
    default:
      return state
    }
  }

let brandsSearchReducer = (state=initialState.brandsSearch, action) => {
  switch (action.type) {
    case "UPDATE_BRANDS_SEARCH":
      return action.payload
    case "LOG_OUT":
      return []
    case "HOME":
      return []
    case "TOGGLE_SEARCH_OFF":
      return []
    case "ALL_SEARCHES_OFF":
      return []
    default:
      return state
    }
  }

let categoriesSearchReducer = (state=initialState.categoriesSearch, action) => {
  switch (action.type) {
    case "UPDATE_CATEGORIES_SEARCH":
      return action.payload
    case "LOG_OUT":
      return []
    case "HOME":
      return []
    case "TOGGLE_SEARCH_OFF":
      return []
    case "ALL_SEARCHES_OFF":
      return []
    default:
      return state
    }
  }

let selectedClothingReducer = (state=initialState.selectedClothing, action) => {
  switch (action.type) {
    case "UPDATE_SELECTED_CLOTHING":
      return action.payload
    case "CLOSE_SELECTED_CLOTHING":
      return null
    case "LOG_OUT":
      return null
    case "HOME":
      return null
    case "ALL_SEARCHES_OFF":
      return null
    default:
      return state
    }
  }

  let activeItemReducer = (state=initialState.activeItem, action) => {
    switch (action.type) {
      case "UPDATE_ACTIVE_ITEM":
        return action.payload
      case "LOG_OUT":
        return 'home'
      case "INACTIVATE_NAVBAR":
        return null
      case "HOME":
        return 'home'
      default:
        return state
      }
    }


const rootReducer = combineReducers({
  clothingCollection: clothingCollectionReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  loggedInUser: loggedInUserReducer,
  clothingLoading: clothingLoadingReducer,
  searchActive: searchActiveReducer,
  clothingSearch: clothingSearchReducer,
  brandsSearch: brandsSearchReducer,
  categoriesSearch: categoriesSearchReducer,
  selectedClothing: selectedClothingReducer,
  activeItem: activeItemReducer
})

export default rootReducer
