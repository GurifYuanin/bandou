import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../../page/home/home';
import Header from '../header/header';
import Footer from '../footer/footer';
import User from '../../page/user/user';
import Detail from '../../page/detail/detail';
import './bandou.css';

interface Props {
  match: {
    path: string,
    url: string
  }
}

export default class Bandou extends React.Component<Props> {
  componentWillMount() {

  }
  render() {
    return (
      <>
        <Header></Header>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <div style={{ position: 'absolute', top: '104px', bottom: '64px', left: 0, right: 0, overflow: 'auto' }}>
              <Route exact path="/bandou/home/" component={Home} />
              <Route exact path="/bandou/home/user" component={User} />
              <Route exact path="/bandou/home/user/:username" component={Detail} />
            </div>
          </Switch>
        </Suspense>
        <Footer className="footer"></Footer>
      </>
    );
  }
}