import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

export default class EditAds extends Component{
    constructor(props){
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    


        this.state = {
            username:'',
            title:'',
            description:'',
            date:new Date(),
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/ads/'+this.props.match.params.id)
        .then(response=> {
            this.setState({
                username : response.data.username,
                title : response.data.title,
                description:response.data.description,
                date: new Date(response.data.date)
            })
        })
        .catch(function(error){
            console.log(error);
        })

        axios.get('http://localhost:5000/users/')
        .then(response=> {
            if(response.data.length>0){
                this.setState({
                    users:response.data.map(user => user.username),
                })
            }
        })
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        })
    }
    onChangeTitle(e){
        this.setState({
            title:e.target.value
        })
    }
    onChangeDescription(e){
        this.setState({
            description:e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date:date
        })
    }
    onSubmit(e){
        e.preventDefault();
        const ads = {
            username:this.state.username,
            title:this.state.title,
            description:this.state.description,
            date:this.state.date
        }
        axios.post('http://localhost:5000/ads/update/'+this.props.match.params.id, ads)
        .then(res => console.log(res.data));
        console.log(ads)
        window.location='/';
    }

    render(){
        return(
            <div>
            <h3>Edit Ads</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Title: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    />
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    };
}