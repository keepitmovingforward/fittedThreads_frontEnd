import {combineReducers} from 'redux'


let initialState = {
  clothingCollection: [],
  users: [],
  categories: [],
  brands: [],
  loggedInUser: true,
  clothingLoading: true,
  searchActive: false
}

let clothingLoadingReducer = (state=initialState.clothingLoading, action) => {
  switch (action.type) {
    case "FETCHED_CLOTHINGS":
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

let usersReducer = (state=initialState.users, action) => {
  return state
}

let loggedInUserReducer = (state=initialState.loggedInUser, action) => {
  switch (action.type) {
    case "LOG_OUT":
      return null
    case "LOGIN_USER":
      return action.payload
    default:
      return state
    }
  }

let searchActiveReducer = (state=initialState.searchActive, action) => {
  switch (action.type) {
    case "TOGGLE":
      return !state
    default:
      return state
    }
  }

const rootReducer = combineReducers({
  clothingCollection: clothingCollectionReducer,
  users: usersReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  loggedInUser: loggedInUserReducer,
  clothingLoading: clothingLoadingReducer,
  searchActive: searchActiveReducer
})

export default rootReducer

// const paintingsReducer = (state = initialState.paintings, action) => {
//   switch (action.type) {
//     case "FETCHED_PAINTINGS":
//       return action.payload
//     case "INCREASE_VOTES":
//       return state.map(painting => {
//         if (painting.id === action.payload) {
//           return {
//             ...painting,
//             votes: painting.votes + 1
//           };
//         } else {
//           return painting;
//         }
//       });
//     case "UPDATE_PAINTING":
//       return state.map(painting => {
//         if (painting.id === action.payload.paintingId) {
//           return {
//             ...painting,
//             title: action.payload.title,
//             artist: {
//               ...painting.artist,
//               name: action.payload.name,
//               birthday: action.payload.birthday,
//               deathday: action.payload.deathday
//             }
//           };
//         } else {
//           return painting;
//         }
//       });
//     default:
//       return state;
//   }
// };
