import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Ads = props => (
    <tr>
      <td>{props.ads.username}</td>
      <td>{props.ads.title}</td>
      <td>{props.ads.description}</td>
      <td>{props.ads.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.ads._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAds(props.ads._id) }}>delete</a>
      </td>
    </tr>
  )
export default class AdsList extends Component{

    constructor(props){
        super(props);
        this.deleteAds = this.deleteAds.bind(this);

        this.state = {ads:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/ads/')
        .then(response => {
            this.setState({ads:response.data})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    deleteAds(id){
        axios.delete('http://localhost:5000/ads/'+id)
        .then(res => console.log(res.data));
        this.setState({
            ads:this.state.ads.filter(el=>el._id !== id)
        })
    }

    adsList(){
        return this.state.ads.map(currentads=>{
            return <Ads ads={currentads}deleteAds={this.deleteAds}key={currentads._ads}/>;
        })
    }
    render(){
        return(
            <div>
            <h3>Ads List</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Username</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.adsList() }
              </tbody>
            </table>
          </div>
        )
    };
}