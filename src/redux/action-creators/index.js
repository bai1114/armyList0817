import axios from 'axios';
// Create User
const createSoldierStart = () => {
  return {
    type: 'CREATE_SOLDIER_START'
  };  
};
const createSoldierFail = (error) => {
  return {
    type:'CREATE_SOLDIER_FAIL',
    error
  };
};

const createSoldierSuccess = (newSoldier) => {
  return {
    type:'CREATE_SOLDIER_SUCCESS',
    newSoldier
  }
};

 
export const createSoldier = (soldier) => {
  return (dispatch) => {
    dispatch(createSoldierStart());
    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/create',
      data: soldier
    })
      .then(response => {
        console.log('response.data.soldier', response.data.soldier);
        dispatch(createSoldierSuccess(response.data.soldier));
      })
      .catch(error => {
        dispatch(createSoldierFail(error));
      });
  };
};

// Edit User
const editSoldierStart = () => {
  return {
    type: 'EDIT_SOLDIER_START'
  };
};

const editSoldierFail = (error) => {
  return {
    type: 'EDIT_SOLDIER_ERROR',
    error
  };
};

const editSoldierSuccess = (id, user) => {
  return {
    type: 'EDIT_SOLDIER_SUCCESS',
    id,
    user
  };
};

export const editSoldier = (id, soldier) => {
  return (dispatch) => {
    dispatch(editSoldierStart());
    axios
      .put(`http://localhost:5000/api/edit/${id}`, soldier)
      .then(response => {
        dispatch(editSoldierSuccess(id, soldier));
        //redirect home
      })
      .catch(error => {
        dispatch(editSoldierFail(error));
      });
   };
};

// Delete User
const deleteSoldierStart = () => {
  return {
    type: 'DELETE_SOLDIER_START'
  };
};

const deleteSoldierFail = (error) => {
  return {
    type: 'DELETE_SOLDIER_ERROR',
    error
  };
};

const deleteSoldierSuccess = (id) => {
  return {
    type: 'DELETE_SOLDIER_SUCCESS',
    id
  };
};

export const deleteSoldier = (id) => {
  return (dispatch) => {
    dispatch(deleteSoldierStart());
    console.log('delete id is ', id);
    axios
      .delete(`http://localhost:5000/api/delete/${id}`)
      
      .then(response => {
        dispatch(deleteSoldierSuccess(id));
        console.log('delete soldier success');
      })
      .catch(error => {
        dispatch(deleteSoldierFail(error));
      });
  };
};

// Get Users
// const getUsersStart = () => {
//   return {
//     type: 'GET_USERS_START'
//   };
// };

// const getUsersFail = (error) => {
//   return {
//     type: 'GET_USERS_ERROR',
//     error
//   };
// };

// const getUsersSuccess = (response) => {
//   return {
//     type: 'GET_USERS_SUCCESS',
//     data: response
//   };
// };

// export const getUsers = () => {
//   return (dispatch) => {
//     dispatch(getUsersStart());
//     axios
//       .get('http://localhost:8080/api/', getUsers)
//       .then(response => {
//         dispatch(getUsersSuccess(response.data.users));
//       })
//       .catch(error => {
//         dispatch(getUsersFail(error));
//       });
//   };
// };

// Redirect
// export const redirect = () => {
//   return {
//     type: 'REDIRECT'
//   };
// };

// export const resetRedirect = () => {
//   return {
//     type: 'RESET_REDIRECT'
//   };
// };


// Sort
// export const sortUsers = key => {
//   return {
//     type: 'SORT_USERS',
//     key
//   };
// };


// Search
// const searchStart = () => {
//   return {
//     type: 'SEARCH_START'
//   };
// };

// const searchSuccess = (users) => {
//   return {
//     type: 'SEARCH_SUCCESS',
//     users,
//   };
// };

// const searchFail = error => {
//   return {
//     type: 'SEARCH_FAIL',
//     error
//   };
// };

// export const search = (keyword) => {
//   return (dispatch) => {
//     dispatch(searchStart());
//     axios
//       .get(`http://localhost:8080/api/search/${keyword}`)
//       .then(response => {
//         console.log(`keyword is ${keyword}`);
//         dispatch(searchSuccess(response.data));
//       })
//       .catch(error => {
//         dispatch(searchFail(error));
//       });
//   }
// }

// export const changeSearchInput = (input) => {
//   return {
//     type: 'CHANGE_SEARCH_INPUT',
//     input
//   };
// };

// Fetch Page
const fetchSoldiersStart = () => {
  return {
    type: 'FETCH_SOLDIERS_START'
  };
};

const fetchSoldiersSuccess = (soldiers) => {
  return {
    type: 'FETCH_SOLDIERS_SUCCESS',
    soldiers
  };
};

const fetchSoldiersFail = err => {
  return {
    type: 'FETCH_SOLDIERS_FAIL',
    err
  };
};

export const fetchSoldiers = () => {
  return (dispatch) => {
    dispatch(fetchSoldiersStart());
    axios
      .get('http://localhost:5000/api/')
      .then(response => {
        console.log('action test',response.data.soldiers);
        dispatch(fetchSoldiersSuccess(response.data.soldiers));
      })
      .catch(err => {
        dispatch(fetchSoldiersFail(err));
      });
  }
}

// // Count Page
// const getCountStart = () => {
//   return {
//     type: 'GET_COUNT_START'
//   };
// };

// const getCountSuccess = count => {
//   return {
//     type: 'GET_COUNT_SUCCESS',
//     count
//   };
// };

// const getCountFail = err => {
//   return {
//     type: 'GET_COUNT_FAIL',
//     err
//   };
// };

// export const getCount = () => {
//   return (dispatch) => {
//     dispatch(getCountStart());
//     axios
//       .get('http://localhost:8080/api/count')
//       .then(response => {
//         const count = parseInt(response.data.count);
//         dispatch(getCountSuccess(count));
//       })
//       .catch(err => {
//         dispatch(getCountFail(err));
//       });
//   };
// };


// Set Status
// export const setStatusCurPage = curPage => {
//   return {
//     type: 'SET_STATUS_CUR_PAGE',
//     curPage
//   };
// };

