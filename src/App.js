import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TdeeForm from './components/TdeeForm';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <TdeeForm />
          </div>
          <div className="col-sm-6">
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
