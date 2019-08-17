import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortUsers, fetchPage, getCount } from '../../redux/action-creators';
import { Link } from 'react-router-dom';
import Pagination from '../../containers/Pagination';
import './index.css';

class UserList extends Component {
  componentDidMount() {
    console.log("this is in the didmmout: " + this.props.curPage);
    this.props.getUsers();
    this.props.dispatch(fetchPage(this.props.curPage, 5));
    this.props.dispatch(getCount());
    this.props.resetRedirect();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.curPage);
    if (this.props.pageOfUsers.length !== prevProps.pageOfUsers.length) {
            this.props.dispatch(fetchPage(this.props.curPage, 5));
    }
  }

  handleSort = (e, key) => {
    e.preventDefault();
    this.props.dispatch(sortUsers(key));
  }

  handleSearch = e => {
    this.props.searchChange(e.target.value);
  }

  render() {
    let showUsers = [];
    let keyword = this.props.searchInput.searchInput;
    showUsers = this.props.isSearching === true ? 
    this.props.users.filter(user => {
      for(let key of Object.keys(user)) {
        console.log(key)
        if(key !== "firstname" && key !== "lastname" && key !== "sex") continue;
        if(user[key].includes(keyword)) return true;
      }
      return false;
    }) : this.props.pageOfUsers;
    if (this.props.isLoading) {
      return <div>Loading...</div>
    } else {
      return (
        <div className = 'container'>
          <h1>User List</h1>
          <br></br>
          {/*  Search Part  */}
          <div> 
              <input type = 'search' className = "form-control mr-sm-2 col col-lg-4" aria-label="Search"
              placeholder = 'Search' onChange = {this.handleSearch} />
          </div>
          {/*  Table Part  */}
          <table className="table table-bordered">
            <thead className ="thead-dark"> 
              <tr>
                
                <th scope="col" >
                  <button type = 'button' class = "btn btn-info btn-block" onClick = {e => this.handleSort(e, "firstname")}>
                    First Name
                  </button>
                </th>
                <th scope="col"> 
                  <button type = 'button' className = "btn btn-info btn-block" onClick = {e => this.handleSort(e, 'lastname')}>
                    Last Name
                  </button>
                </th>
                <th scope="col">
                  <button type = 'button' className = "btn btn-info btn-block" onClick = {e => this.handleSort(e, 'sex')}>
                    Sex
                  </button>
                </th>
                <th scope="col">
                  <button type = 'button' className = "btn btn-info btn-block" onClick = {e => this.handleSort(e, 'age')}>
                    Age
                  </button>
                </th>
                <th class='text-center'>Edit</th>
                <th class='text-center'>Delete</th>
              </tr>    
            </thead>
            
            <tbody>
              {showUsers.map(user => {
                return (
                  <tr key = {user._id}>
                    <td class='text-center'>{user.firstname}</td>
                    <td class='text-center'>{user.lastname}</td>
                    <td class='text-center'>{user.sex}</td>
                    <td class='text-center'>{user.age}</td>
                    <td class='text-center'><Link className="btn btn-info" to={`/users/${user._id}`} >Edit</Link></td>
                    <td class='text-center'><button type = 'button' className="btn btn-danger" onClick={() => this.props.deleteUser(user._id)}>Delete</button></td>
                  </tr>
                );
              })} 
            </tbody> 
          </table>

          {/*  Pagination Part  */}
           <Pagination/>
          
          {/*  Button to Create User  */}
          <Link to="/users" className="btn btn-primary" > 
            Create New User
          </Link>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    pageOfUsers: state.getUsers.pageOfUsers,
    searchInput: state.searchInput
  };
}

export default connect(mapStateToProps)(UserList);

