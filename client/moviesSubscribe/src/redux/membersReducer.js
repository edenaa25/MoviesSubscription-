const initialState = {
   members:[]
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOAD_MEMBERS':
      return {...state ,  members: action.payload}
   
    default:
      return state;
  }
};

export default membersReducer;