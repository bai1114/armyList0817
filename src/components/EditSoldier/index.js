import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class EditSoldier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        _id: null,
        name: '',
        sex: '',
        rank: '',
        startDate: '',
        phone: '',
        email: '',
        superiorId: null,
        superiorName: '',
        numberOfDirectSubs: 0,
        imgUrl: '',
      },
      changedInfo: {},
      filteredSuperiors: []
    };
  }

  componentDidMount() {
    for (let i = 0; i < this.props.soldiers.length; i++){
      if (this.props.soldiers[i]._id === this.props.id) {
        this.setState({info : this.props.soldiers[i]});
      }
    }
    this.filterSuperior();
    setTimeout(() => {
      this.setState({filteredSuperiors: [...this.state.filteredSuperiors,this.state.info.superiorId]});
    }, 0); 
  }

  filterSuperior = () => {
    const result = [];
    this.traverse(this.props._id, result);
    this.setState({filteredSuperiors: result});
  }

  traverse = (_id, list) => {
    if (!_id || _id === '') {
      return;
    }
    list.push(_id);
    let directSubs = this.getDirectSubs(_id);
    for (let ds of directSubs) {
      this.traverse(ds, list);
    }
  };
  getDirectSubs = _id => {
    let result = [];
    const soldiers = this.props.soldiers;
    for (let soldier of soldiers) {
      if (soldier.superiorId === _id) {
        result.push(soldier._id);
      }
    }
    return result;
  };

  
  handleChange = (e, key) => {
    e.preventDefault();
    const newObject = {};
    newObject[key] = e.target.value;
    const info = {
      ...this.state.info,
      ...newObject
    };
    const changed = {...this.state.changedInfo};
    changed[key] = e.target.value;
    this.setState({ info, changedInfo: changed});
  }

  handleSuperiorChange = e => {
    let idName = e.target.value.split(' ');
    const superiorId = idName[0];
    const superiorName = idName[1];
    const newObject = { superiorId, superiorName };
    const info = {
      ...this.state.info,
      ...newObject
    };
    const changed = {...this.state.changedInfo, superiorId};
    this.setState({ info, changedInfo: changed });
  };

  handleFile = () => {
    const file = this.fileInput.files[0];
    const filename = file.name;
    const url = this.getObjectURL(file);
    this.setState({info : {...this.state.info, imgUrl : url}});
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
    return url ;
  }

  handleSubmit = e => {
    e.preventDefault();
    let changedInfo;
    if (this.props.image.imgUrl !== '') {
      changedInfo = {...this.state.changedInfo, imgUrl: this.props.image.imgUrl};
    } else {
      changedInfo = {...this.state.changedInfo};
    }
    this.props.editSoldier(this.props.id, changedInfo);
  };

  render() {
    const imgStyle  = {width : "200px", height : "200px"}
    const candidateSuperiors = this.props.soldiers.filter(superior => {
      return !this.state.filteredSuperiors.includes(superior._id);
    });
    const { info } = this.state;
    if (this.props.redirect && !this.props.isLoading) {
      return <Redirect to = {{ pathname: '/' }}/>
    } else {
      return (
        <div className='edit_user'>
          <h2>Edit Soldier</h2>
          <br></br>
          <form onSubmit = {this.handleSubmit}>

            <div className="image">
            <img src={info.imgUrl} alt="" style={imgStyle}></img>
              <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="picture"> </label>
              <div className="col col-sm-10 col-lg-4">
              Upload Picture:
                <input
                  id="picture"
                  type="file"
                  ref={input => {
                    this.fileInput = input
                  }}
                  className="form-control"
                  accept=".jpg, .jpeg, .png"
                  onChange={this.handleFile}
                />
              </div>
            </div>


            <div className="form-group col-md-50" >
              <label for = 'name'>
                Name:
              </label>
              <input type = 'text' class = 'form-control' id = 'name' value = {info.name} onChange = {e => this.handleChange(e, 'name')} required = {true} />
            </div> 

            <div className="form-group col-md-50" >
              <label htmlFor="sex">
                Sex:
              </label>
              <input type = 'text' class = 'form-control' id = 'sex' value = {info.sex} onChange = {e => this.handleChange(e, 'sex')} required = {true} />
            </div>  
            
            <div className="form-group col-md-50" >
              <label  htmlFor="rank">
                Rank:
              </label>
              <input type = 'text' class = 'form-control' id = 'rank' value = {info.rank} onChange = {e => this.handleChange(e, 'rank')} required = {true}/>
            </div>

            <div className="form-group col-md-50" >
              <label htmlFor="startDate">
                Start Date:
              </label>
              <input type = 'date' class = 'form-control' id = 'startDate' value = {moment.parseZone(info.startDate).format('YYYY-MM-DD')} onChange = {e => this.handleChange(e, 'startDate')} required = {true}/>
            </div>

            <div className="form-group col-md-50" >
              <label htmlFor="phone">
                Phone:
              </label>
              <input type = 'number' class = 'form-control' id = 'phone' value = {info.phone} onChange = {e => this.handleChange(e, 'phone')} required = {true} />
            </div>

            <div className="form-group col-md-50" > 
              <label htmlFor='text'>
                Email: 
              </label> 
              <input type = 'text' class = 'form-control' id = 'email' value = {info.email} onChange = {e => this.handleChange(e, 'email')} required = {true} />
            </div>

            <div className="form-group col-md-50" > 
              <label htmlFor='text'>
                Superior: 
              </label> 
              <div className="col col-sm-10 col-lg-4">
                <select id="manager" onChange={this.handleSuperiorChange} className="form-control">
                <option value={null}>{info.superiorName}</option>
                {candidateSuperiors.map(superior => {
                  return (
                    <option key={superior._id} value={superior._id + " " + superior.name}>
                      {superior.name}
                    </option>
                  );
                })}
                </select>
              </div>
            </div>

            <button className="btn btn-success" type = "submit">Save Change</button> 
          </form>
        </div>
      );
    } 
  }
}

export default EditSoldier;

