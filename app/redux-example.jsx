var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
  name:'Anonymous',
  hobbies: [],
  movies: []
};
var nextHobbyId = 1;
var nextMovieId = 1;
var reducer = (state=stateDefault,action) =>{
  // state = state || {name: 'Anonymous'};

  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name:action.name
      };
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      }
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter((hobby)=>hobby.id !== action.id)
      }
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id:nextMovieId++,
            movie: action.movie,
            genre: action.genre
          }
        ]
      }
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie)=>movie.id!==action.id)
      }
    default:
      return state;
  }
}
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
var unsubscribe = store.subscribe(()=>{
  var state = store.getState();

  console.log('Name is', state.name);
  document.getElementById('app').innerHTML = state.name;

  console.log('New state', store.getState())
})
// unsubscribe();

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Marc'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'eating'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
})

store.dispatch({
  type: 'ADD_MOVIE',
  movie: 'The Master',
  genre: 'Drama'
})

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Andrew'
})

store.dispatch({
  type: 'ADD_MOVIE',
  movie: 'The Big Sick',
  genre: 'Rom Com'
})

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
})
