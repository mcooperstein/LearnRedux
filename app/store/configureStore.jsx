var redux = require('redux');
var thunk = require('redux-thunk').default;
var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require('./../reducers/index');

export var configure = () => {

  var reducer = redux.combineReducers({
    name: nameReducer,
    hobby: hobbiesReducer,
    movie: moviesReducer,
    map: mapReducer
  })

  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
