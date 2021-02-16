import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GuestDash from './components/GuestDash';

export default function App() {

  const endpoint = 'http://localhost:8000/api';
  
  return (
    <>
        <Switch>
          <Route
            path="/home"
            render={(props) => {
              return <GuestDash
              endpoint={endpoint} 
              />
            }}
          />
        </Switch>
    </>
  );
}


