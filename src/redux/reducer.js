import {combineReducers} from 'redux'


let initialState = {
  clothingCollection: [],
  users: [],
  loggedInUser: null
}

let clothingCollectionReducer = (state=initialState.clothingCollection, action) => {
  switch (action.type) {
    case "UPDATE":
      return action.payload
    default:
      return state
  }
}

let usersReducer = (state=initialState.users, action) => {
  return state
}

let loggedInUserReducer = (state=initialState.loggedInUser, action) => {
  return state
}

let rootReducer = combineReducers({
  clothingCollection: clothingCollectionReducer,
  users: usersReducer,
  loggedInUser: loggedInUserReducer
})




export default rootReducer
