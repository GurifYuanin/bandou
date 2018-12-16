import React from 'react';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default class Login extends React.Component<{ className: string }> {
  render() {
    return (
      <AppBar style={{
        top: 'auto',
        bottom: 0,
      }}>
        <Toolbar style={{
          margin: 'auto'
        }}>copyright©️2018</Toolbar>
      </AppBar>
    );
  }
}