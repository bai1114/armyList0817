const initState = {
  soldiers: [],
  isLoading: false,
  isFetching: false,
  err: null,
  isSearching: false,
  showSoldiers: [],
  sorted: false,
};

const soldiers = (state = initState, action) => {
  switch(action.type) {
   
    
    // Delete User
    case 'DELETE_SOLDIER_START':
      return {
        ...state,
        isLoading: true
      };
    case 'DELETE_SOLDIER_ERROR':
      return {
        ...state,
        isLoading: false,
        err: action.error,
        deleteErr: true
      };
    case 'DELETE_SOLDIER_SUCCESS':
      let index = 0;
      const { soldiers } = state;
      for (let i = 0; i < soldiers.length; i++) {
        if(soldiers[i]._id === action.id) {
          index = i;
          break;
        }
      }
      const deletedSoldiers = [...soldiers.slice(0, index), ...soldiers.slice(index + 1)];
      return {
        ...state,
        isLoading: false,
        soldiers: deletedSoldiers,
        deleteErr: false,
        err: null,
      };
    
    // Create New User 
    case 'CREATE_SOLDIER_START':
      return {
        ...state,
        isLoading: true
      };
    case 'CREATE_SOLDIER_FAIL':
      return {
        ...state,
        isLoading: false,
        err: action.error
      };
    case 'CREATE_SOLDIER_SUCCESS':
      const newSoldiers = [...state.soldiers, action.newSoldier];
      return {
        ...state,
        soldiers: newSoldiers,
        isLoading: false,
        err: ''
      }
      // const totalPages = Math.ceil(state.count / state.pageSize);
      // let newPage = totalPages;
      // if(state.pageOfUsers.length === state.pageSize) {
      //   newPage += 1;
      // }
      //   return {
      //     ...state,
      //     isLoading: false,
      //     pageOfUsers:[
      //       ...state.pageOfUsers,
      //       action.user,
      //     ],
      //     curPage : newPage,
      //   };
    
    //Edit User 
    // case 'EDIT_SOLDIER_START':
    //   return {
    //     ...state,
    //     isLoading: true
    //   };
    // case 'EDIT_SOLDIER_ERROR':
    //   return {
    //     ...state,
    //     isLoading: false,
    //     err: action.error
    //   };
    // case 'EDIT_SOLDIER_SUCCESS':
    //   let editedSoldiers = state.soldiers.map(soldier => {
    //     if (soldier._id === action.id) {
    //       return action.soldier;
    //     } else {
    //       return soldier;
    //     }
    //   });
    //   return {
    //     ...state,
    //     isLoading: false,
    //     soldiers: editedSoldiers,
    //     err: null,
    //     showSoldiers: show
    //   };
    
    // Sort Users
    // case 'SORT_USERS': {
    //   const sortedUsers = [...state.pageOfUsers]; 
    //   const key = action.key;
    //   sortedUsers.sort((user1, user2) => {
    //     if (typeof(user1[key]) === 'number') {
    //       if (user1[key] === user2[key]) {
    //         return 0;
    //       }
    //       return user1[key] < user2[key] ? -1 : 1;
    //     }
    //     return user1[key].toLowerCase().localeCompare(user2[key].toLowerCase());
    //   });
    //   return {
    //     ...state,
    //     pageOfUsers: sortedUsers,
    //   };
    // }


    // Fetch Soldiers
    case 'FETCH_SOLDIERS_START':
      return {
        ...state,
        isLoading: true,
        isFetching: true,
      };
    case 'FETCH_SOLDIERS_SUCCESS': {   
      return {
        ...state,
        soldiers: action.soldiers,
        isLoading: false,
        isFetching: false,
        err: null,
        sorted: true
      };
    }
    case 'FETCH_SOLDIERS_FAIL':
      return {
        // ...state,
        isLoading: false,
        isFetching: false,
        err: action.error
      };
    default:
      return state;
  }
};

export default soldiers;



 // Get UserList 
// case 'GET_USERS_START':
//   return {
//     ...state,
//     isLoading: true,
//     err: null
//   };
// case 'GET_USERS_FAIL':
//   return {
//     ...state,
//     isLoading: false,
//     err: action.error
//   };
// case 'GET_USERS_SUCCESS':
//   return {
//     ...state,
//     isLoading: false,
//     err: null,
//     users: action.data
//   };

 // Count Page
//  case 'GET_COUNT_START':
//   return {
//     ...state,
//     isLoading: true
//   };
// case 'GET_COUNT_SUCCESS':
// return {
//   ...state,
//   count: action.count,
//   isLoading: false,
//   err: null
// };
// case 'GET_COUNT_FAIL':
// return {
//   ...state,
//   isLoading: false,
//   err: action.error
// }

  // Search User
// case 'SEARCH_START' : {
//   return {
//     ...state,
//     isLoading: true,
//   }
// }
// case 'SEARCH_SUCCESS' : {
//   return {
//       ...state,
//       searchUsers : action.users,
//       isSearching : true,
//       isLoading: false,
//   }
// }
// case 'SEARCH_FAIL' : {
//   return {
//     ...state,
//     isLoading: false,
//     isSearching: false,
//     err: action.error
//   }
// }
    

