var axios = require('axios');

export var changeName = (name) => {
  return {
    name,
    type: 'CHANGE_NAME',
  }
};

export var addHobby = (hobby) => {
  return {
    hobby,
    type: 'ADD_HOBBY'
  }
}

export var removeHobby = (id) => {
    return {
      id,
      type: 'REMOVE_HOBBY'
    }
}

export var addMovie = (movie,genre) => {
  return {
    movie,
    genre,
    type: 'ADD_MOVIE'
  }
}

export var removeMovie = (id) => {
  return {
    id,
    type: 'REMOVE_MOVIE'
  }
}

export var startLocationFetch = ()=> {
  return {
    type: 'START_LOCATION_FETCH'
  }
}

export var completeLocationFetch = (url)=> {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}

export var fetchLocation = () => {
  return (dispatch, getState) => {
    dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then(function(res){
      var location = res.data.loc;
      var baseUrl = 'http://maps.google.com?q='

      dispatch(completeLocationFetch(baseUrl+location));
    })
  };
}
