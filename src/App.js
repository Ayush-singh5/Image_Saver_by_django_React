import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { getToken, setToken, removeToken } from './utils/auth';
import './App.css'; // Include this line to import the CSS file

const App = () => {
  const [token, setTokenState] = useState(getToken());

  useEffect(() => {
    if (token) {
      setToken(token);
    } else {
      removeToken();
    }
  }, [token]);

  return (
    <Router>
      <Navbar token={token} setToken={setTokenState} />
      <Switch>
        <Route path="/" exact>
          <Home token={token} />
        </Route>
        <Route path="/login">
          <Login setToken={setTokenState} />
        </Route>
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
