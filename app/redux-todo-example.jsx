var redux = require('redux');

console.log('Starting todo redux example');

var stateDefault = {todos:[],showCompleted:false,searchText:''}
var reducer = (state= stateDefault,action) =>{
  // state = state || {name: 'Anonymous'};
  switch(action.type){
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
}
var store = redux.createStore(reducer);

var currentState = store.getState();
console.log('currentState', currentState);

var action = {
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Dog'
};

store.dispatch(action);

console.log('Search Text should be Dog', store.getState());
