const initialState = {
   movies:[],
  //  selectedMovie: null,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOAD_MOVIES':
      return {...state ,  movies: action.payload}
   
    default:
      return state;
  }
};

export default moviesReducer;