import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './layout/login/login';
import Bandou from './layout/bandou/bandou';
import NotFound from './layout/error/404';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/bandou/" component={Login} />
            <Route path="/bandou/home" component={Bandou} />
            <Route path="/bandou/login" component={Login} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
