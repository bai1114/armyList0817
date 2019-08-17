import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  componentDidMount() {
    if (this.props.soldiers.length === 0) {
      this.props.fetchSoldiers();
    }
  }
  render() {
    // const soldiers = this.props.soldiers;
    //console.log('test Homepage component',this.props.soldiers);
    console.log('soldiers', this.props.soldiers);
    //console.log('soldier length', this.props.soldiers.length);
    
    return (
      <div>
        <div>
          <h2>US Army Personnel Registry</h2>
        </div>
        {/* <div>
          <Search/>
        </div> */}
        <div>
          <table className="table table-bordered">
            <thead className ="thead-dark"> 
              <tr>
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
                {/* <th class='text-center'>Edit</th> */}
                <th class='text-center'>Delete</th>
              </tr>    
            </thead>
          
            <tbody>
              {this.props.soldiers.map(soldier => {
                return (
                  <tr key = {soldier._id}>
                    <td class='text-center'>{soldier.name}</td>
                    <td class='text-center'>{soldier.sex}</td>
                    <td class='text-center'>{soldier.rank}</td>
                    <td class='text-center'>{soldier.startDate}</td>
                    <td class='text-center'>{soldier.phone}</td>
                    <td class='text-center'>{soldier.email}</td>
                    <td class='text-center'>{soldier.superior}</td>
                    <td class='text-center'>{soldier.numberOfDS}</td>
                    {/* <td class='text-center'><Link className="btn btn-info" to={`/users/${user._id}`} >Edit</Link></td>  */}
                    <td class='text-center'><button type = 'button' className="btn btn-danger" onClick={() => this.props.deleteSoldier(soldier._id)}>Delete</button></td>
                  </tr>
                );
              })} 
            </tbody>  
          </table>
        </div>

          {/*  Button to Create User  */}
          <Link to="/create" className="btn btn-primary" > 
            Create New Soldier
          </Link>

      </div>
    )
  }
}

export default HomePage;