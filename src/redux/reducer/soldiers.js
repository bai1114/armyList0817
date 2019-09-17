const initState = {
  soldiers: [],
  isLoading: false,
  isFetching: false,
  err: null,
  isSearching: false,
  showSoldiers: [],
  deleteErr: false,
  hasMore: true,
  index: 0,
  order: 0,
  sortKey: "",
  sorted:false,
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
      console.log('action newSoldier', action.newSoldier);
      return {
        ...state,
        soldiers: newSoldiers,
        isLoading: false,
        err: null
      }
    
    //Edit Soldier 
    case 'EDIT_SOLDIER_START':
      return {
        ...state,
        isLoading: true
      };
    case 'EDIT_SOLDIER_ERROR':
      return {
        ...state,
        isLoading: false,
        err: action.err
      };
    case 'EDIT_SOLDIER_SUCCESS':
      let editedSoldiers = state.soldiers.map(soldier => {
        if (soldier._id === action._id) {
          return action.soldier;
        } else {
          return soldier;
        }
      });
      return {
        ...state,
        isLoading: false,
        soldiers: editedSoldiers,
        err: null,
        // showSoldiers: show
      };
    
    case 'SORT_SOLDIERS': {
      const soldiers = [...state.soldiers];
      const key = action.keep === true ? state.sortKey : action.key;
      const keep = action.keep;
      var sorted = false;
      var newOrder = state.order === 1 ? -1 : 1;
      if(keep === true){ newOrder = state.order; sorted = false;}
      soldiers.sort((soldier1, soldier2) => {
        if (soldier1[key] === soldier2[key]) {
          return 0;
        }
        if(newOrder === 1)
        return soldier1[key] < soldier2[key] ? -1 : 1;
        else return soldier1[key] > soldier2[key] ? -1 : 1;
      });
      return {
        ...state,
        soldiers,
        order : newOrder,
        sortKey : key,
        sorted:sorted,
      };
    }

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
        sorted: true,
        // searchInput: ''
      };
    }
    case 'FETCH_SOLDIERS_FAIL':
      return {
        // ...state,
        isLoading: false,
        isFetching: false,
        err: action.error
      };


    case 'ADD_RANGE_SOLDIERS_START':
      return {
        ...state,
        isLoading: true
      };
    case 'ADD_RANGE_SOLDIERS_SUCCESS': {
      const newSoldiers = [...state.soldiers, ...action.soldiers];
      return {
        ...state,
        isLoading: false,
        err: null,
        soldiers: newSoldiers,
        hasMore: action.hasMore
      };
    }
    case 'ADD_RANGE_SOLDIERS_FAIL': 
      return {
        ...state,
        isLoadng: false,
        err: action.err,
      }
      // const searchInput = (state = '', action) => {
      //   switch(action.type) {
    // case 'CHANGE_INPUT':
    //   return {
    //     searchInput: action.input
    //   }
        //   default:
        //     return state;
        // }
      // }
      
      // export default searchInput;

    default:
      return state;
  }
};

export default soldiers;





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
    

