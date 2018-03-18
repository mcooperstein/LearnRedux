var redux = require('redux');
var axios = require('axios');

console.log('Starting redux example');

// var stateDefault = {
//   name:'Anonymous',
//   hobbies: [],
//   movies: []
// };

// Name reducer and action generators
// --------------------------------

var nameReducer = (state='Anonymous',action) => {
  switch (action.type){
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
}

var changeName = (name) => {
  return {
    name,
    type: 'CHANGE_NAME',
  }
};

// Hobbies reducer and action generators
// --------------------------------

var nextHobbyId = 1;
var hobbiesReducer = (state=[],action) => {
  switch(action.type){
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ]
    case 'REMOVE_HOBBY':
      return state.filter((hobby)=>hobby.id !== action.id)
    default:
      return state;
  }
}

var addHobby = (hobby) => {
  return {
    hobby,
    type: 'ADD_HOBBY'
  }
}

var removeHobby = (id) => {
    return {
      id,
      type: 'REMOVE_HOBBY'
    }
}

// Movies reducer and action generators
// --------------------------------

var nextMovieId = 1;
var moviesReducer = (state=[],action) => {
  switch(action.type){
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          movie: action.movie,
          genre: action.genre
        }
      ]
    case 'REMOVE_MOVIE':
      return state.filter((movie)=>movie.id !== action.id)
    default:
      return state;
  }
}

var addMovie = (movie,genre) => {
  return {
    movie,
    genre,
    type: 'ADD_MOVIE'
  }
}

var removeMovie = (id) => {
  return {
    id,
    type: 'REMOVE_MOVIE'
  }
}

// Map reducer and action generators
// --------------------------------

var mapReducer = (state = {isFetching:false, url:undefined}, action) => {
  switch(action.type){
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
}

var startLocationFetch = ()=> {
  return {
    type: 'START_LOCATION_FETCH'
  }
}

var completeLocationFetch = (url)=> {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function(res){
    var location = res.data.loc;
    var baseUrl = 'http://maps.google.com?q='

    store.dispatch(completeLocationFetch(baseUrl+location));
  })
}

var reducer = redux.combineReducers({
  name: nameReducer,
  hobby: hobbiesReducer,
  movie: moviesReducer,
  map: mapReducer
})

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
var unsubscribe = store.subscribe(()=>{
  var state = store.getState();

  console.log('New state', store.getState())
  if(state.map.isFetching){
    document.getElementById('app').innerHTML = 'LOADING...'
  } else if(state.map.url) {
    document.getElementById('app').innerHTML = '<a target="_blank" href="'+ state.map.url +'">View Your Location</a>'
  }
})
// unsubscribe();

var currentState = store.getState();
console.log('currentState', currentState);

fetchLocation();

store.dispatch(changeName('Marc'));
store.dispatch(addHobby('running'))
store.dispatch(addHobby('eating'))
store.dispatch(removeHobby(2));
store.dispatch(addMovie('The Master', 'Drama'))
store.dispatch(changeName('Andrew'))
store.dispatch(addMovie('The Big Sick', 'Rom Com'))
store.dispatch(removeMovie(1));

// var oldReducer = (state=stateDefault,action) =>{
//   // state = state || {name: 'Anonymous'};
//
//   switch (action.type) {
//     case 'CHANGE_NAME':
//       return {
//         ...state,
//         name:action.name
//       };
//     case 'ADD_HOBBY':
//       return {
//         ...state,
//         hobbies: [
//           ...state.hobbies,
//           {
//             id: nextHobbyId++,
//             hobby: action.hobby
//           }
//         ]
//       }
//     case 'REMOVE_HOBBY':
//       return {
//         ...state,
//         hobbies: state.hobbies.filter((hobby)=>hobby.id !== action.id)
//       }
//     case 'ADD_MOVIE':
//       return {
//         ...state,
//         movies: [
//           ...state.movies,
//           {
//             id:nextMovieId++,
//             movie: action.movie,
//             genre: action.genre
//           }
//         ]
//       }
//     case 'REMOVE_MOVIE':
//       return {
//         ...state,
//         movies: state.movies.filter((movie)=>movie.id!==action.id)
//       }
//     default:
//       return state;
//   }
// }

// store.dispatch({
//   type: 'CHANGE_NAME',
//   name: 'Marc'
// });

// store.dispatch({
//   type: 'ADD_HOBBY',
//   hobby: 'running'
// });

// store.dispatch({
//   type: 'ADD_HOBBY',
//   hobby: 'eating'
// });

// store.dispatch({
//   type: 'REMOVE_HOBBY',
//   id: 2
// })

// store.dispatch({
//   type: 'ADD_MOVIE',
//   movie: 'The Master',
//   genre: 'Drama'
// })

// store.dispatch({
//   type: 'ADD_MOVIE',
//   movie: 'The Big Sick',
//   genre: 'Rom Com'
// })

// store.dispatch({
//   type: 'REMOVE_MOVIE',
//   id: 1
// })
