const Swal = require('sweetalert2')
const _ = require("lodash")
const CLOTHING_URL = "http://localhost:4000/clothes"

function fetchingData() {
  return (dispatch) => {fetch(CLOTHING_URL)
    .then(res => res.json())
    .then(data => {
      dispatch (fetchedClothings(data.clothing))
      dispatch (fetchedCategories(data.categories))
      dispatch (fetchedBrands(data.brands))
      dispatch (fetchesComplete() )
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

function fetchesComplete(clothings) {
  return {type: "FETCHES_COMPLETE"}
}

function logOutUser() {
  return(dispatch) => {
    Swal.fire({
      title: 'Logout',
      text: 'Please confirm your logout',
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
  return (dispatch, getState) => {
    let state = getState()
    if (state.searchActive) {
      dispatch({type: "TOGGLE_SEARCH_OFF"})
    }
    else {
      dispatch({type: "TOGGLE_SEARCH_ON"})
    }
  }
}

function turnSearchOff() {
  return {type: "TOGGLE_SEARCH_OFF"}
}

function goHome() {
  return {type: "HOME"}
}

function updateClothingSearch(clothingSearchTerm) {
  return {type: "UPDATE_CLOTHING_SEARCH", payload: clothingSearchTerm }
}

function updateBrandsSearch(brandsSearchArray) {
  return {type: 'UPDATE_BRANDS_SEARCH', payload: brandsSearchArray }
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
  if (!e.target.classList["value"].includes("heart")
   && !e.target.classList["value"].includes('hidden')
   && !e.target.classList["value"].includes('magnify')
   && !e.target.classList["value"].includes('button')) {
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

function addMeasurement(measurementObj, user_id) {
  return (dispatch) => {fetch("http://localhost:4000/addMeasurement", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    measurementObj
  })
})
  .then(res => {
    return res.json()
  }).then(data => {
  dispatch (fetchedClothings(data.clothing))
  dispatch( {type: "USER_ADD_MEASUREMENT", payload: data.user})
  })
  }
}

function handleNavBarClick(e, {name}) {
  return {type: "UPDATE_ACTIVE_ITEM", payload: name}
}

function inactivateNavBar () {
  return {type: "INACTIVATE_NAVBAR"}
}

function updateFirstTimeUser(userId) {
  return dispatch => {fetch("http://localhost:4000/firstTimeUser", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    userId
  })
})
  .then(res => {
    return res.json()
  }).then(user => {
      dispatch ({type: "UPDATE_FIRST_TIME_STATUS", payload: user})
  })
  }
}

function updateUserMeasurements(measurements, user) {

  let user_id = user.id

  Object.keys(measurements).map((key, index) => {
    return measurements[key] === "" ? measurements[key] = null : measurements[key]
  })



  return dispatch => {
    fetch("http://localhost:4000/updateMyMeasurements", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id,
        measurements
      })
    })
    .then(res => {
      return res.json()
    }).then (user => {

      const Toast = Swal.mixin({
       toast: true,
       position: 'top-end',
       showConfirmButton: false,
       timer: 2500
      })

      Toast.fire({
       icon: 'success',
       title: `${_.capitalize(user.username)} measurements updated!`
      })
      dispatch ({type: "USER_UPDATE_MEASUREMENTS", payload: user})
    })
  }
}


export {fetchingData, logOutUser,
        handleLoginSubmit, toggleSearch,
        goHome, updateClothingSearch,
        updateBrandsSearch, updateCategoriesSearch,
        updateSelectedClothing, closeSelectedClothing,
        addMeasurement, handleNavBarClick,
        inactivateNavBar, updateFirstTimeUser,
        turnSearchOff, updateUserMeasurements
      }
