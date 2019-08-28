import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../../components/HomePage';
import CreateSoldier from '../../components/CreateSoldier';
import EditSoldier from '../../components/EditSoldier';
import DirectSubs from '../../components/DirectSubs';
import DirectSuperior from '../../components/DirectSuperior';

import { fetchSoldiers, deleteSoldier, editSoldier, createSoldier, uploadImage, fetchDirectSubs, fetchSup, addRangeSoldiers, sortSoldiers } from "../../redux/action-creators";

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
              isLoading = {this.props.isLoading}
              loadSoldiers = {this.props.loadSoldiers}
              hasMore = {this.props.hasMore}
              showSoldiers = {this.props.showSoldiers}
              sortSoldiers = {this.props.sortSoldiers}
              sortKey={this.props.sortKey}
              order={this.props.order}
              sorted={this.props.sorted}
            />
          } />
          <Route 
            exact = {true}
            path = '/create' 
            render = {() => 
              <CreateSoldier 
                createSoldier = {this.props.createSoldier} 
                isLoading = {this.props.isLoading}
                err = {this.props.err}
                soldiers = {this.props.soldiers}
                uploadImage = {this.props.uploadImage}
                image = {this.props.image}
              />
            } 
          /> 
           <Route 
            path = '/edit/:soldierId' 
            render = {({ match }) => {
              return (
                <EditSoldier
                  soldiers = {this.props.soldiers}
                  id = {match.params.soldierId}
                  editSoldier = {this.props.editSoldier}
                  err = {this.props.err}
                  isLoading = {this.props.isLoading}
                  uploadImage = {this.props.uploadImage}
                  image = {this.props.image}
                /> 
              );
            }}
          /> 
          <Route path="/:soldierId/directSubs" render={({ match }) =>
            <DirectSubs
              _id={match.params.soldierId}
              directSubs={this.props.directSubs}
              fetchDirectSubs={this.props.fetchDirectSubs}
              err = {this.props.err}
              deleteSoldier = {this.props.deleteSoldier}
              isLoading = {this.props.isLoading}
              deleteErr={this.props.deleteErr}
            />
          } />
          <Route path="/:soldierId" render={({ match }) =>
            <DirectSuperior
              _id={match.params.soldierId}
              // handleSort={this.handleSort}
              fetchSup={this.props.fetchSup}
              // fetchDirectSubs={this.props.fetchDirectSubs}
              // handleDelete={this.handleDelete}
              // soldiers = {this.props.soldiers}
              err = {this.props.err}
              // superior = {this.props.superior}
              directSup={this.props.directSup}
              // fetchSoldiers = {this.props.fetchSoldiers}
              deleteSoldier = {this.props.deleteSoldier}
              // isLoading = {this.props.isLoading}
              deleteErr={this.props.deleteErr}
            />
          } />
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
    image: state.image,
    directSubs: state.directSubs,
    directSup: state.directSup,
    showSoldiers: state.soldiers.showSoldiers,
    hasMore: state.soldiers.hasMore,
    deleteErr: state.soldiers.deleteErr,
    sortKey: state.soldiers.sortKey,
    order: state.soldiers.order,
    // sort: state.soldiers.sort,
    sorted: state.soldiers.sorted
    // isSearching: state.searchInput.isSearching,
    // searchUsers: state.getUsers.searchUsers,
    // searchInput: state.searchInput.searchInput,
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
    uploadImage: (file, filename) => {
      dispatch(uploadImage(file, filename));
    },
    editSoldier: (id, soldier) => {
      dispatch(editSoldier(id, soldier));
    },
    fetchDirectSubs: (_id) => {
      dispatch(fetchDirectSubs(_id));
    },
    fetchSup: (_id) => {
      dispatch(fetchSup(_id));
    },
    loadSoldiers: (offset, limit) => {
      setTimeout(() => {
        dispatch(addRangeSoldiers(offset, limit));
      }, 2000);
    },
    sortSoldiers: (key, keep) => {
      dispatch(sortSoldiers(key, keep));
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
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

