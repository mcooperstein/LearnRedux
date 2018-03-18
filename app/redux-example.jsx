var redux = require('redux');

console.log('Starting redux example');

// var stateDefault = {
//   name:'Anonymous',
//   hobbies: [],
//   movies: []
// };

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

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

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Marc'));
store.dispatch(actions.addHobby('running'))
store.dispatch(actions.addHobby('eating'))
store.dispatch(actions.removeHobby(2));
store.dispatch(actions.addMovie('The Master', 'Drama'))
store.dispatch(actions.changeName('Andrew'))
store.dispatch(actions.addMovie('The Big Sick', 'Rom Com'))
store.dispatch(actions.removeMovie(1));

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
