import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import face from '../../image/default.png';
import InfiniteScroll from "react-infinite-scroll-component";

import moment from 'react-moment';

class HomePage extends Component {
  componentDidMount() {
    if (this.props.soldiers.length === 0) {    
      this.props.fetchSoldiers();
    }
  };

  onDelete = (_id) => {
    this.props.deleteSoldier(_id);
  };
  
  handleSort = (e, key) => {
    e.preventDefault();
    this.props.sortSoldiers(key, false);
  }

  handleReset = () => {
    this.props.clearInput();
    this.props.fetchSoldiers();
  }

  render() {
    let filteredList = this.props.soldiers;
    if (this.props.searchInput !== '') {
      filteredList = this.props.soldiers.filter(soldier => {
        for (let key in soldier) {
          if (typeof soldier[key] === 'string') {
            const input = this.props.searchInput.toLowerCase();
            const value = soldier[key].toLowerCase();
            if (value.indexOf(input) === 0) {
              return true;
            }
          }
        }
        return false;
      });
    }
    
    const style = { maxHeight: '50px', maxWidth: '50px' };
    if (this.props.err !== null) {
      return <p>There is an error in getting soldiers.</p>
    } else {
      if (this.props.isLoading) {
        return <h2>Loading...</h2>
      } else {
        return (
          <div>
            <div>
              <h2>US Army Personnel Registry</h2>
            </div>
            <div>
              <form className="form-inline">
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Search"
                  onChange={e => this.props.changeInput(e.target.value)} 
                  value={this.props.searchInput} 
                />
              </form>
            </div>
            <div>
              <button type = 'button' className="btn btn-danger" 
                      onClick={() => this.handleReset()}>Reset</button>
            </div>
            <div>
              <div id="scrollable" className="scroll">
                <InfiniteScroll
                  className="scroll"
                  dataLength={filteredList.length}
                  next={() =>this.props.loadSoldiers(filteredList.length, 5)}
                  hasMore={this.props.hasMore}
                >
              <table className="table table-bordered">
                <thead className ="thead-dark"> 
                  <tr>
                    <th scope="col">Avatar</th>
                    <th scope="col" >
                      <a href='' onClick = {e => this.handleSort(e, "name")}>Name</a>
                    </th>
                    <th scope="col"> 
                      <a href='' onClick = {e => this.handleSort(e, 'sex')}>Sex</a>
                    </th>
                    <th scope="col">
                      <a href=''  onClick = {e => this.handleSort(e, 'rank')}>Rank</a>
                    </th>
                    <th scope="col">
                      <a href='' onClick = {e => this.handleSort(e, 'startDate')}>Start Date</a>
                    </th>
                    <th scope="col">
                      <a href='' onClick = {e => this.handleSort(e, 'phone')}>Phone</a>
                    </th>
                    <th scope="col">
                      <a href=''  onClick = {e => this.handleSort(e, 'email')}>Email</a>
                    </th>
                    <th scope="col">
                      <a href=''  onClick = {e => this.handleSort(e, 'superior', false)}>Superior</a>
                    </th>
                    <th scope="col">
                      <a href=''  onClick = {e => this.handleSort(e, 'numberOfDS', false)}># of D.S.</a>
                    </th>
                    <th class='text-center'>Edit</th>
                    <th class='text-center'>Delete</th>
                  </tr>    
                </thead>
              
                <tbody>
                  {filteredList.map(soldier => {
                    return (
                      <tr key = {soldier._id}>
                        <td>
                          { soldier.imgUrl ? (<img src={soldier.imgUrl} alt ="" style={style}/>) : (
                            <img src={face} alt="default avatar" style={style} />
                          )}
                        </td>
                        <td class='text-center'>{soldier.name}</td>
                        <td class='text-center'>{soldier.sex}</td>
                        <td class='text-center'>{soldier.rank}</td>
                        <td class='text-center'>{soldier.startDate.slice(0,4)}-{soldier.startDate.slice(5,7)}-{soldier.startDate.slice(8,10)}</td>
                        <td class='text-center'><a href ={`tel:soldier.phone`}>{soldier.phone}</a></td>
                        <td class='text-center'><a href ={`mailto:soldier.email`}>{soldier.email}</a></td>
                        <td class='text-center'><Link to ={`/${soldier.superiorId}`}>{soldier.superiorName}</Link></td>
                        <td class='text-center'>{soldier.numberOfDirectSubs === 0 ? 0 : <Link to={`/${soldier._id}/directSubs`}>{soldier.numberOfDirectSubs}</Link>}</td>
                        <td class='text-center'><Link className="btn btn-info" to={`/edit/${soldier._id}`} >Edit</Link></td> 
                        <td class='text-center'><button type = 'button' className="btn btn-danger" onClick={() => this.onDelete(soldier._id)}>Delete</button></td>
                      </tr>
                    );
                  
              })} 
            </tbody>  
          </table>
          </InfiniteScroll>
          </div>
        </div>

          {/*  Button to Create User  */}
          <Link to="/create" className="btn btn-primary" > 
            Create New Soldier
          </Link>

      </div>
    )
    }
  }}
}

export default HomePage;

// if (this.props.deleteErr) {
//   this.props.redirectToHome();
// }