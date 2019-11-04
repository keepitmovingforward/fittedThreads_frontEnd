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



export {fetchingClothings}

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
