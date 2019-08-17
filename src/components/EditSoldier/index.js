import React, { Component } from 'react';
import { editSoldier } from '../../redux/action-creators';

class EditSoldier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        _id: null,
        name: '',
        sex:'',
        rank: '',
        startDate: '',
        phone: '',
        email: '',
        superior: '',
        numberOfDS: '',
      },
      changedInfo: {}
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    let changedInfo = {...this.state.changedInfo};
    const curSoldier = {name, sex, rank, startDate, phone, email, superior};
    editSoldier(id, curSoldier);
  }


  handleSubmit = e => {
    e.preventDefault();
    let { id, editUser } = this.props;
    let { firstname, lastname, sex, age, password } = this.state;
    if (this.state.password === this.state.passwordRepeat) {
      const curUser = { id, firstname, lastname, sex, age, password };
      editUser(id, curUser);
      // // console.log('!!!test edit id is ', id);
      // console.log('!!!test: curUser is ', curUser);
      this.setState({
        firstname: '',
        lastname: '',
        sex: '',
        age: '',
        passoword: '',
        passwordRepeat: '',
        passwordsSame: true
      });
      this.props.redirectToUserlist();
    } else {
      this.setState({
        passoword: '',
        passwordRepeat: '',
        passwordsSame: false
      });
    }
  }

  handleChange = 

  handleChange = (e, key) => {
    const editUser = {};
    editUser[key] = e.target.value;
    this.setState(editUser);
  }

  render() {
    const info  = this.state;
    // if (redirect && !this.props.isLoading) {
    //   return <Redirect to = {{ pathname: '/' }}/>
    // } else {
      return (
        <div className='edit_user'>
          <h2>Edit Soldier</h2>
          <br></br>
          <form onSubmit = {this.handleSubmit}>
            <div className="form-group col-md-50" >
              <label for = 'name'>
                Name:
              </label>
              <input type = 'text' class = 'form-control' id = 'name' value = {this.state.name} onChange = {e => this.handleChange(e, 'name')} required = {true} />
            </div> 

            <div className="form-group col-md-50" >
              <label htmlFor="sex">
                Sex:
              </label>
              <input type = 'text' class = 'form-control' id = 'sex' value = {this.state.sex} onChange = {e => this.handleChange(e, 'sex')} required = {true} />
            </div>  
            
            <div className="form-group col-md-50" >
              <label  htmlFor="rank">
                Rank:
              </label>
              <input type = 'text' class = 'form-control' id = 'rank' value = {this.state.rank} onChange = {e => this.handleChange(e, 'rank')} required = {true}/>
            </div>

            <div className="form-group col-md-50" >
              <label htmlFor="startDate">
                Start Date:
              </label>
              <input type = 'date' class = 'form-control' id = 'startDate' value = {this.state.startDate} onChange = {e => this.handleChange(e, 'startDate')} required = {true}/>
            </div>

            <div className="form-group col-md-50" >
              <label htmlFor="phone">
                Phone:
              </label>
              <input type = 'number' class = 'form-control' id = 'phone' value = {this.state.phone} onChange = {e => this.handleChange(e, 'phone')} required = {true} />
            </div>

            <div className="form-group col-md-50" > 
              <label htmlFor='text'>
                Email: 
              </label> 
              <input type = 'text' class = 'form-control' id = 'email' value = {this.state.email} onChange = {this.handleChange(e, 'email')} required = {true} />
            </div>

            <div className="form-group col-md-50" > 
              <label htmlFor='text'>
                Superior: 
              </label> 
              <input type = 'text' class = 'form-control' id = 'superior' value = {this.state.superior} onChange = {this.handleChange(e, 'superior')} required = {true} />
            </div>

            <button className="btn btn-success" type = "submit">Save Change</button> 
          </form>
        </div>
      );
    } 
  // }
}

export default EditSoldier;

