import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import AdsList from "./components/ads-list.component";
import EditAds from "./components/edit-ads.component";
import CreateAds from "./components/create-ads.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={AdsList}/>
        <Route path="/edit/:id" exact component={EditAds}/>
        <Route path="/create" exact component={CreateAds}/>
        <Route path="/user" exact component={CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
