const initState = {
  superior: {},
  isLoading: false,
  err: null
};

const directSup = (state = initState, action) => {
  switch(action.type) {
    
    case 'FETCH_SUP_START':
      return {
        ...state,
        isLoading: true,
        // isFetching: true,
      };
    case 'FETCH_SUP_SUCCESS': {   
      console.log('reducer', action.soldier);
      return {
        ...state,
        superior: action.soldier,
        isLoading: false,
        // isFetching: false,
        err: null,
        // sorted: true
      };
    }
    case 'FETCH_SUP_FAIL':
      return {
        // ...state,
        isLoading: false,
        // isFetching: false,
        err: action.err
      };
    default:
      return state;
  }
};

export default directSup;