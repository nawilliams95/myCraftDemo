import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import GuestDash from './components/GuestDash';

export default function App() {

  const endpoint = 'http://localhost:8000/api';
  
  return (
    <>
      <NavBar/>
      <div>

        <Switch>
        <Route
            path="/home"
            render={() => {
              return <Home />;
            }}
          />
          <Route
            path="/guest"
            render={(props) => {
              return <GuestDash
              endpoint={endpoint} 
              />
            }}
          />
        </Switch>
      </div>
    </>
  );
}


