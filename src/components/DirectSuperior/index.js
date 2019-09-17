import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import face from '../../image/default.png';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class DirectSuperior extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  componentDidMount() {
    const { fetchSup, _id } = this.props;
    fetchSup(_id);
  }
  
  onDelete = (_id) =>{
    this.props.deleteSoldier(_id);
    this.props.fetchSup(this.props._id);
    this.setState({redirect: true});
  }
  render() {
    const style = {
      maxHeight: '50px',
      maxWidth: '50px'
    };  
    const { directSup } = this.props;
    if (directSup.isLoading) {
      return <p>Loading...</p>
    }
    if (directSup.err !== null) {
      return <p>Some errors happened!</p>
    }
    const sup = directSup.superior;
    console.log('superiorname', sup.superiorName);
    if (this.state.redirect && !this.props.isLoading) {
      return <Redirect to = {{ pathname: '/' }}/>
    } else {
    return (
      <div className="container">
        <h3>Direct Superior</h3>
        <div>
          <Link to={`/`}><button className="btn btn-secondary">Back</button></Link>
        </div>
        <div>
          <table className="table table-striped table-bordered table-hover">
          <thead>
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
              
            <td>
              { sup.imgUrl ? (<img src={sup.imgUrl} alt ="" style={style}/>) : (
                <img src={face} alt="default avatar" style={style} />
              )}
            </td>
            <td class='text-center'>{sup.name}</td>
            <td class='text-center'>{sup.sex}</td>
            <td class='text-center'>{sup.rank}</td>
            <td class='text-center'>{moment.parseZone(sup.startDate).format('YYYY-MM-DD')}</td>
            <td class='text-center'><a href ={`tel:sup.phone`}>{sup.phone}</a></td>
            <td class='text-center'><a href ={`mailto:sup.email`}>{sup.email}</a></td>
            {/* <td class='text-center'>{sup.superiorName}</td> */}
            <td class='text-center'><Link to ={`/${sup.superiorId}`}>{sup.superiorName}</Link></td>
            <td class='text-center'>{sup.numberOfDirectSubs === 0 ? 0 : <Link to={`/${sup._id}/directSubs`}>{sup.numberOfDirectSubs}</Link>}</td>
            <td class='text-center'><Link className="btn btn-info" to={`/edit/${sup._id}`} >Edit</Link></td> 
            <td class='text-center'><button type = 'button' className="btn btn-danger" onClick={() => this.onDelete(sup._id)}>Delete</button></td>
          
        
              
            </tbody>  
         
        </table>
        </div>
  
      </div>
    );
    }
  }
}

export default DirectSuperior;