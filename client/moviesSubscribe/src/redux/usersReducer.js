const initialState = {
  isAdmin: "",
  permissions:[],
  users:[],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER': 
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
        permissions: action.payload.permissions
      };

    case 'LOAD_USERS': 
      return {...state ,  users: action.payload}

    case 'LOGOUT':
      return initialState
   
    default:
      return state;
  }
};

export default usersReducer;