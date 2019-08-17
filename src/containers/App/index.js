import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../../components/HomePage';
import CreateSoldier from '../../components/CreateSoldier';
// import EditUser from '../../components/EditUser';
import { fetchSoldiers, deleteSoldier, editSoldier, createSoldier } from "../../redux/action-creators";

class App extends Component { 
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path='/' render = {() => 
            <HomePage 
              soldiers = {this.props.soldiers}
              err = {this.props.err}
              fetchSoldiers = {this.props.fetchSoldiers}
              deleteSoldier = {this.props.deleteSoldier}
              editSoldier = {this.props.editSoldier}
            />
          } />
          <Route 
            exact = {true}
            path = '/create' 
            render = {() => 
              <CreateSoldier 
                createSoldier = {this.props.createSoldier} 
                // redirect = {this.props.redirect}
                // redirectToUserlist = {this.props.redirectToUserlist}
                isLoading = {this.props.isLoading}
                err = {this.props.err}
              />
            } 
          /> 
           {/* <Route 
            path = '/edit/:soldierId' 
            render = {({ match }) => {
              return (
                <EditSoldier
                  soldiers = {this.props.soldiers}
                  id = {match.params.soldierId}
                  editSoldier = {this.props.editSoldier}
                  err = {this.props.err}
                  //geters = {this.props.getUsers}
                  // getUser = {this.getUser}
                  // redirect = {this.props.redirect}
                  // redirectToUserlist = {this.props.redirectToUserlist}
                  isLoading = {this.props.isLoading}
                /> 
              );
            }}
          />  */}
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    soldiers: state.soldiers.soldiers,
    err: state.soldiers.err,
    // redirect: state.redirect,
    isLoading: state.soldiers.isLoading,
    // isSearching: state.searchInput.isSearching,
    // searchUsers: state.getUsers.searchUsers,
    // searchInput: state.searchInput.searchInput,
    // pageOfUsers: state.getUsers.pageOfUsers,
    // status : state.status,
    // pageNumber: state.getUsers.pageNumber,
    // curPage: state.getUsers.curPage,
    // users: state.getUsers.users,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSoldiers: () => {
      dispatch(fetchSoldiers());
    },
    // getUsers: () => {
    //   dispatch(getUsers());
    // },
    deleteSoldier: (_id) => {
      dispatch(deleteSoldier(_id));
    },
    createSoldier: (soldier) => {
      dispatch(createSoldier(soldier));
    },
    // redirectToUserlist: () => {
    //   dispatch(redirect());
    // },
    // resetRedirect: () => {
    //   dispatch(resetRedirect());
    // },
    editSoldier: (id, soldier) => {
      dispatch(editSoldier(id, soldier));
    },
    // sortUsers: (key) => {
    //   dispatch(sortUsers(key));
    // },
    // search: (keyword) => {
    //   dispatch(search(keyword));
    // },
    // changeSearchInput: (input) => {
    //   dispatch(changeSearchInput(input));
    // },
    // getCount: () => {
    //   dispatch(getCount());
    // }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

