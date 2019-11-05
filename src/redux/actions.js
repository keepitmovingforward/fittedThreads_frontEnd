//copy all action objects

// function changeSearch(searchText) {
//   return {type: "CHANGE_SEARCH", payload: "searchText"}
// }

const CLOTHING_URL = "http://localhost:4000/clothes"

function fetchingClothings() {
  return (dispatch) => {fetch(CLOTHING_URL)
    .then(res => res.json())
    .then(clothingsData => {
      console.log(clothingsData)
      dispatch (fetchedClothings(clothingsData))
    })
   }
}

function fetchedClothings(clothings) {
  return {type: "FETCHED_CLOTHINGS", payload: clothings}
}

function logOutUser() {
  let response = window.confirm("Please confirm Logout")
  if (!response) {
    return {type: "DO_NOTHING"}
  }
  else {
  return {type: "LOG_OUT"}
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
        alert(data.message)
    }
  })
  }
}

function updateLoggedInUser(user) {
  return {type: "LOGIN_USER", payload: user}
}



export {fetchingClothings, logOutUser, handleLoginSubmit}

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
