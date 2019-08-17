const initState = {
  searchInput: "",
  isSearching: false,
}
const searchInput = (state=initState, action) => {
  switch(action.type) {
    case 'CHANGE_SEARCH_INPUT':
      let isSearching = action.input.length === 0 ? false : true;
      return {
        searchInput:action.input,
        isSearching
      }
    default:
      return state;
  }
};

export default searchInput;