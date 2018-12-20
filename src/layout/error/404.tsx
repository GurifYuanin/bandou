import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export default class Login extends React.Component {
  render() {
    return (
      <div className="absolute-vertical-horizontal-center">
        <Card style={{
          textAlign: 'center',
          padding: '20px 50px'
        }}>
          <h1 style={{ marginBottom: '50px' }}>*_* 你迷路了</h1>
          <div>
            <Button size="small" color="primary" variant="contained" style={{ marginRight: '10px' }}>
              <ArrowLeftIcon />
              <Link to="/bandou/" className="plain-text">返回瓣豆登录</Link>
            </Button>
            <Button size="small" variant="contained">
              <Link to="/" className="plain-text">返回站点首页</Link>
              <ArrowRightIcon />
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}