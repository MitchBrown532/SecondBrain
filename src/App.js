import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Log-in';
import Command from './Command.js';

//Pages
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage'
import CalenderPage from './pages/CalenderPage'
import OverviewPage from './pages/OverviewPage'
import inTrayPage from './pages/InTrayPage'
import Categories from './pages/CategoriesPage'
import { Proxy } from './Proxy.js'


export var proxy = new Proxy()
console.log(`Creating proxy object with user default ${proxy.user['authToken']}`);
var item_command = new Command(0,{},0)

proxy.processCommand(item_command)
function App() {
  
  //States 
    //To determine which pages, components & functions are called
 
  //Functions + Events
    //Actions to be performed & Events to be listened to

  return (
  
    <Router>
      <header>
        <Navbar />
      </header>

      <div>
        <Switch>
          <Route path="/"exact component={LandingPage}/>
          <Route path="/home"  component={MainPage}/>
          <Route path="/log-in" component={Login}/>
          <Route path="/in-tray" component ={inTrayPage}/>
          <Route path="/overview" component ={OverviewPage}/>
          <Route path="/calender" component ={CalenderPage}/>
          <Route path="/categories" component={Categories}/>
          <Route path="*" component={ErrorPage}/>
        </Switch>
      </div>

      <footer>
      <Footer />
      </footer>
    </Router>

  );
}

export default App;
