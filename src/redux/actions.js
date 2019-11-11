const Swal = require('sweetalert2')
const _ = require("lodash")
const CLOTHING_URL = "http://localhost:4000/clothes"

function fetchingData() {
  return (dispatch) => {fetch(CLOTHING_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data.clothing)
      dispatch (fetchedClothings(data.clothing))
      dispatch (fetchedCategories(data.categories))
      dispatch (fetchedBrands(data.brands))
    })
   }
}

function fetchedClothings(clothings) {
  return {type: "FETCHED_CLOTHINGS", payload: clothings}
}

function fetchedCategories(categories) {
  return {type: "FETCHED_CATEGORIES", payload: categories}
}

function fetchedBrands(brands) {
  return {type: "FETCHED_BRANDS", payload: brands}
}

function logOutUser() {
  return(dispatch) => {
    Swal.fire({
      title: 'Logout',
      text: 'Please confirm logout',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      showCloseButton: true,
      showClass: {
      popup: 'animated fadeInDown faster'
      },
      hideClass: {
      popup: 'animated fadeOutUp faster'
      }
    })
    .then((result) => {
  if (result.value) {
    dispatch({type: "LOG_OUT"})
  }
  else {
    dispatch({type: "DO_NOTHING"})
  }
})
}
}

function handleLoginSubmit(username, password) {
  return (dispatch) => {fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(res => {
    return res.json()
  }).then(data => {
    if (data.id) {
      dispatch(updateLoggedInUser(data))
    }
    else {
      const Toast = Swal.mixin({
       toast: true,
       showConfirmButton: false,
       timer: 2500
      })

      Toast.fire({
        title: `${data.message}`,
        icon: 'error'
      })
    }
  })
  }
}

function updateLoggedInUser(user) {

  const Toast = Swal.mixin({
   toast: true,
   position: 'top-end',
   showConfirmButton: false,
   timer: 2500
  })

  Toast.fire({
   icon: 'success',
   title: `${_.capitalize(user.username)} signed in successfully`
  })
  return {type: "LOGIN_USER", payload: user}
}

function toggleSearch() {
  return {type: "TOGGLE"}
}

function goHome() {
  return {type: "HOME"}
}

function updateClothingSearch(clothingSearchTerm) {
  return {type: "UPDATE_CLOTHING_SEARCH", payload: clothingSearchTerm }
}

function updateBrandsSearch(brand, checked) {
  return (dispatch, getState) => {
    let state = getState()
    if (checked) {
    let brandsArray = [...state.brandsSearch]
    brandsArray.push(brand)
    dispatch({type: 'UPDATE_BRANDS_SEARCH', payload: brandsArray })
    }
    else {
      if(state.brandsSearch.includes(brand)) {
      let brandsArray = state.brandsSearch.filter(b => b !== brand)
      dispatch({type: 'UPDATE_BRANDS_SEARCH', payload: brandsArray })
      }
      else {
        dispatch({type: 'DO_NOTHING'})
      }
    }
  }
}

function updateCategoriesSearch(category, checked) {
  return (dispatch, getState) => {
    let state = getState()
    if (checked) {
    let categoriesArray = [...state.categoriesSearch]
    categoriesArray.push(category)
    dispatch({type: 'UPDATE_CATEGORIES_SEARCH', payload: categoriesArray })
    }
    else {
      if(state.categoriesSearch.includes(category)) {
      let categoriesArray = state.categoriesSearch.filter(c => c !== category)
      dispatch({type: 'UPDATE_CATEGORIES_SEARCH', payload: categoriesArray })
      }
      else {
        dispatch({type: 'DO_NOTHING'})
      }
    }
  }
}

function updateSelectedClothing(e, clothing) {
  if (!e.target.classList["value"].includes("heart")) {
    return {type: "UPDATE_SELECTED_CLOTHING", payload: clothing }
  }
  return {type: "DO_NOTHING"}
}

function closeSelectedClothing(e) {
  if (e.target.classList["value"].includes("close")) {
    return {type: "CLOSE_SELECTED_CLOTHING"}
  }
  return {type: "DO_NOTHING"}
}

export {fetchingData, logOutUser,
        handleLoginSubmit, toggleSearch,
        goHome, updateClothingSearch,
        updateBrandsSearch, updateCategoriesSearch,
        updateSelectedClothing, closeSelectedClothing
      }

//at top of components import {onChange} from '../redux/action'

// function votedForPainting(paintingId) {
//   return { type: "INCREASE_VOTES", payload: paintingId };
// }
//
// //click event -> voting (fetch) -> voted (updating store)
// function votingForPainting(paintingId){
//   return (dispatch, getState) => {
//     let oldVotes = getState().paintings.find(p => p.id === paintingId).votes
//     fetch(`${URL}/${paintingId}`,{
//       method: "PATCH",
//       headers : {
//         "Content-Type" : "application/json",
//         "Accept" : "application/json"
//       },
//       body: JSON.stringify({
//         votes: oldVotes + 1
//       })
//     }).then(() => {
//         dispatch(votedForPainting(paintingId))
//     })
//   }
// }
