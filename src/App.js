import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Listing from './Components/Listing';
import Detail from './Components/Detail';

import './App.css';

function App() {
  return (
    <Router>
        <Route exact path="/" component={Listing} />
        <Route path="/detail/:id" component={Detail} />
    </Router>
  );
}

export default App;
