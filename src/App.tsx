import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from './layout/login/login';
import Bandou from './layout/bandou/bandou';
import NotFound from './layout/error/404';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <TransitionGroup>
            <CSSTransition
              classNames="fade"
              timeout={300}
            >
              <Switch>
                <Route exact path="/bandou/" component={Login} />
                <Route path="/bandou/home" component={Bandou} />
                <Route path="/bandou/login" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Suspense>
      </Router>
    );
  }
}

export default App;
