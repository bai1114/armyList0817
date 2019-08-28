import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import './createUser.css';
import face from '../../image/default.png';

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
      imgUrl: face,
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    let imgUrl = '';
    console.log('uploadsuccess',this.props.image.uploadSuccess);
    console.log('upload image url:', this.props.image.imgUrl);
    if (this.props.image.uploadSuccess) {
      imgUrl = this.props.image.imgUrl;
      console.log('Testing imgUrl', imgUrl);
      this.setState({ imgUrl: this.props.image.imgUrl });
      const soldier = {...this.state, imgUrl };
      delete soldier.startDateStr;
      this.props.createSoldier(soldier);
      if (this.props.err === null) {
        this.setState({ redirect: true, imgUrl: this.props.image.imgUrl });
      }
      
    } else {
      const soldier = {...this.state, imgUrl };
      delete soldier.startDateStr;
      this.props.createSoldier(soldier);
      if (this.props.isLoading === false && this.props.err === null ) {
        this.setState({ redirect: true });
      }
    }
    console.log('after submit imgurl', imgUrl);
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

  handleFile = () => {
    const file = this.fileInput.files[0];
    const filename = file.name;
    const url = this.getObjectURL(file);
    console.log('file', file);
    console.log('filename', filename);
    console.log('url', url);
    this.setState({imgUrl : url});
    this.props.uploadImage(file, filename);
  };
  getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!==undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!==undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!==undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    console.log('getobjectURL', url);
    return url ;
  }

  render() {
    const redirect = this.state.redirect;
    const imgStyle  = {width : "200px", height : "200px"}
    console.log("redirect", redirect);
    if (redirect && !this.props.isLoading) {
      return <Redirect to = {{ pathname: '/' }}/>
    } else {
      return (
        <div className = 'create_soldier'>
          <h2>Create New Soldier</h2>
          <br></br>
          <form onSubmit = {this.handleSubmit}>
            <div className="image">
            <img src={this.state.imgUrl} alt="" style={imgStyle}></img>
              <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="picture"> 
              </label>
              <div className="col col-sm-10 col-lg-4">
              Upload Picture:
                <input id="picture" type="file" 
                       ref = {input => {this.fileInput = input}}
                       className="form-control"
                       accept=".jpg, .jpeg, .png"
                       onChange={this.handleFile}
                />
              </div>
            </div>

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

            <div class="form-group col-md-50"> 
              <label htmlFor='superior'>
                Superior: 
              </label> 
              <div className="col col-sm-10 col-lg-4">
              <select className="form-control" id="superior" onChange={e => this.handleChange(e, 'superiorId')}>
                <option value={null}> Select a soldier as a superior </option>
                {this.props.soldiers.map(soldier => {
                  return <option key={soldier._id} value={soldier._id}>{soldier.name}</option>
                })}
              </select>
            </div>
            </div> 

            <button className="btn btn-success" type = "submit">Save Soldier</button> 
          </form>
        </div>
      );
    } 
  }
}

export default CreateSoldier;