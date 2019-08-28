import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import face from '../../image/default.png';
import { Redirect } from 'react-router-dom';

class DirectSubs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  componentDidMount() {
    const { fetchDirectSubs, _id } = this.props;
    fetchDirectSubs(_id);
  }
  onDelete = (_id) =>{
    this.props.deleteSoldier(_id);
    this.props.fetchDirectSubs(this.props._id);
    // console.log('delete err', this.props.deleteErr);
    // if (this.props.deleteErr) {
      this.setState({redirect: true});
    // }
  }

  render() {
    const style = {
      maxHeight: '50px',
      maxWidth: '50px'
    };  
    // const handleSort = this.props.handleSort;
    const { directSubs} = this.props;
    if (directSubs.isLoading) {
      return <p>Loading...</p>
    }
    if (directSubs.err !== null) {
      return <p>Some errs happened!</p>
    }
    console.log('redirect',this.state.redirect);
    console.log('loading',this.props.isLoading);

    if (this.state.redirect && !this.props.isLoading) {
      return <Redirect to = {{ pathname: '/' }}/>
    } else {
    return (
      <div className="container">
        <h3>Direct Subordinate</h3>
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
              {directSubs.directSubs.map(sub => {
                return (
                  <tr key = {sub._id}> 
                    <td>
                      { sub.imgUrl ? (<img src={sub.imgUrl} alt ="" style={style}/>) : (
                        <img src={face} alt="default avatar" style={style} />
                      )}
                    </td>
                    <td class='text-center'>{sub.name}</td>
                    <td class='text-center'>{sub.sex}</td>
                    <td class='text-center'>{sub.rank}</td>
                    <td class='text-center'>{sub.startDate}</td>
                    <td class='text-center'><a href ={`tel:sub.phone`}>{sub.phone}</a></td>
                    <td class='text-center'><a href ={`mailto:sub.email`}>{sub.email}</a></td>
                    <td class='text-center'><Link to ={`/${sub.superiorId}`}>{sub.superiorName}</Link></td>
                    <td class='text-center'>{sub.numberOfDirectSubs === 0 ? 0 : <Link to={`/${sub._id}/directSubs`}>{sub.numberOfDirectSubs}</Link>}</td>
                    <td class='text-center'><Link className="btn btn-info" to={`/edit/${sub._id}`} >Edit</Link></td> 
                    <td class='text-center'><button type = 'button' className="btn btn-danger" onClick={() => this.onDelete(sub._id)}>Delete</button></td>
                  </tr>
                );
              })} 
            </tbody>  
          {/* <tbody>
          {directSubs.directSubs.map(sub => {
            return <Soldier key={sub._id} soldier={sub}/> // delete 还没加
          })}
          </tbody> */}
        </table>
        </div>
  
      </div>
    );
    }
  }
}

export default DirectSubs;