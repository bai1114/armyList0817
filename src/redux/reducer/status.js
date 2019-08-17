const initState = {
  curPage: 1,
};

const status = (state = initState, action) => {
  switch(action.type) {
    case 'SET_STATUS_CUR_PAGE': 
      return {
        ...state,
        curPage: action.curPage
      };
    default:
      return state;
  }
};

export default status;