import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './components/Home/Home'
import Tdee from './components/Tdee/Tdee'
import OneRepMax from './components/OneRepMax/OneRepMax'

function App(props){
  return(
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <div className="container-960">
            <div className="navbar-header">
              <Link to="/">Fitness Calculations</Link>
            </div>
            <ul className="pull-right">
              <li><Link to="/tdee-calculator">TDEE</Link></li>
              <li><Link to="/one-rep-max-calculator">One Rep Max</Link></li>
            </ul>
          </div>
        </nav>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/tdee-calculator" component={Tdee}/>
        <Route path="/one-rep-max-calculator" component={OneRepMax}/>
      </div>
    </BrowserRouter>
  )
}

export default App
