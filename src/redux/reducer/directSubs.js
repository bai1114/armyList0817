const initState = {
  directSubs: [],
  isLoading: false,
  err: null
};

const directSubs = (state = initState, action) => {
  switch(action.type) {
    case 'FETCH_DIRECT_SUBS_START':
      return {
        ...state,
        isLoading: true
      };
    case 'FETCH_DIRECT_SUBS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        directSubs: action.directSubs,
        err: null
      };
    case 'FETCH_DIRECT_SUBS_FAIL': 
      return {
        ...state,
        isLoading: false,
        err: action.err
      };
    default:
      return state;
  }
};

export default directSubs;