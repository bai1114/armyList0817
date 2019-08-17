import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import './createUser.css';


class CreateSoldier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sex: '',
      rank: '',
      startDate: null,
      startDateStr: '',
      phone: '',
      email: '',
      superiorId: null,
      redirect: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const soldier = {...this.state};
    delete soldier.startDateStr;
    this.props.createSoldier(soldier);
    console.log('err', this.props.err);
    if (this.props.err === null) {
      this.setState({ redirect: true });
    }
  }
  
  handleChange = (e, key) => {
    let newObj = {};
    newObj[key] = e.target.value;
    this.setState(newObj);
  }

  handleDateChange = e => {
    const dateStr = e.target.value;
    let date = e.target.value;
    this.setState({ startDateStr: dateStr, startDate: date });
  }

  render() {
    // const passwordStyle = {color: 'red'};
    const redirect = this.state.redirect;
    if (redirect && !this.props.isLoading) {
      console.log('redirect', redirect);
      console.log('loading', this.props.isLoading);
      return <Redirect to = {{ pathname: '/' }}/>
    } else {
      return (
        <div className = 'create_soldier'>
          <h2>Create New Soldier</h2>
          <br></br>
          <form onSubmit = {this.handleSubmit}>
            <div class="form-group col-md-50"> 
              <label htmlFor="name">
                Name:
              </label>
              <input type = 'text' class="form-control" id = 'name' value = {this.state.name} onChange = {e => this.handleChange(e, 'name')} required = {true} />
            </div>

            <div class="form-group col-md-50"> 
              <label htmlFor="sex">
                Sex:
              </label>
              <input type = 'text' class="form-control" id = 'sex' value = {this.state.sex} onChange = {e => this.handleChange(e, 'sex')} required = {true} />
            </div>
            
            <div class="form-group col-md-50"> 
              <label  htmlFor="rank">
                Rank:
              </label>
              <input type = 'text' class="form-control" id = 'rank' value = {this.state.rank} onChange = {e => this.handleChange(e, 'rank')} required = {true}/>
            </div>
              
            <div class="form-group col-md-50"> 
              <label htmlFor="startDate">
                Start Date:
              </label>
              <input type = 'date' class="form-control" id = 'startDate' value = {this.state.startDateStr} onChange = {this.handleDateChange} required = {true}/>
            </div>
            
            <div class="form-group col-md-50"> 
              <label htmlFor="phone">
                Phone:
              </label>
              <input type = 'number' class="form-control" id = 'phone' value = {this.state.phone} onChange = {e => this.handleChange(e, 'phone')} required = {true} />
            </div>
              
            <div class="form-group col-md-50"> 
              <label htmlFor='email'>
                Email: 
              </label> 
              <input type = 'text' class="form-control" id = 'email' value = {this.state.email} onChange = {e => this.handleChange(e, 'email')} required = {true} />
            </div> 

            <button className="btn btn-success" type = "submit">Save Soldier</button> 
          </form>
        </div>
      );
    } 
  }
}

export default CreateSoldier;