const initState = {
  input: ''
}
const searchInput = (state = initState, action) => {
  switch(action.type) {
    case 'CHANGE_INPUT':
      return {
        input: action.input
      };
    case 'CLEAR_INPUT':
      return {
        input: ''
      };
    default:
      return state;
  }
}

export default searchInput;