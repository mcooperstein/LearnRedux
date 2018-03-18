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
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

//subscribe to changes
store.subscribe(()=>{
  var state = store.getState();

  document.getElementById('app').innerHTML = state.searchText;
})

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Dog'
});
store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Walk'
});
store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Sleep'
});

// console.log('Search Text should be Dog', store.getState());
