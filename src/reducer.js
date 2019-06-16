const defaultState = {
  currentUser: null,
  tracks: [],
  recentlyPlayedTracks: [],
  topTracks: [],
  genres: [],
  artists: [],
  reviews: [],
  currentTrackURL: "",
}


function reducer(state=defaultState, action){
  switch(action.type){
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "SET_TRACKS":
      return {...state, tracks: action.payload}
    case "REMOVE_TRACK":
      let filteredArr = state.tracks.filter(track => {
        return track.id !== action.payload
      })
      return {...state, tracks: filteredArr}
    case "SET_RECENTLY_PLAYED_TRACKS":
      return {...state, recentlyPlayedTracks: action.payload}
    case "SET_GENRES":
      return {...state, genres: action.payload}
    case "SET_ARTISTS":
      return {...state, artists: action.payload}
    case "SET_REVIEWS":
      return {...state, reviews: action.payload}
    case "ADD_REVIEW":
      return {...state, reviews: [...state.reviews, action.payload]}
    case "SET_URI":
      return {...state, currentTrackURL: action.payload}
    default:
      return state
  }
}

export default reducer;
