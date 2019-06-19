const defaultState = {
  currentUser: null,
  tracks: [],
  recentlyPlayedTracks: [],
  topTracks: [],
  genres: [],
  artists: [],
  reviews: [],
  currentTrackURL: "",
  new_releases: [],
  recommendations: [],
  filterTerm: "",
  playlists: []
}


function reducer(state=defaultState, action){
  switch(action.type){
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "SET_TRACKS":
      return {...state, tracks: action.payload}
    case 'SET_SEARCH':
      return {...state, filterTerm: action.payload}
    case "REMOVE_TRACK":
      let filteredArr = state.tracks.filter(track => {
        return track.spotify_id !== action.payload
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
    case "SET_PLAYLISTS":
      return {...state, playlists: action.payload}
    case "ADD_REVIEW":
      return {...state, reviews: [...state.reviews, action.payload]}
    case "SET_URI":
      return {...state, currentTrackURL: action.payload}
    case "SET_NEW_RELEASES":
      return {...state, new_releases: action.payload}
    case "SET_RECOMMENDATIONS":
      return {...state, recommendations: action.payload}
    default:
      return state
  }
}

export default reducer;
