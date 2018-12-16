import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import request from '../../util/request';
import { Md5 } from 'ts-md5/dist/md5';
import './login.css';
import PropTypes from 'prop-types';

interface Props {
  username: string;
  password: string;
  passwordAgain: string;
  isLogin: boolean;
}
export default class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  state: Props = {
    username: '',
    password: '',
    passwordAgain: '',
    isLogin: true
  };
  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      username: e.target.value
    });
  }
  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      password: e.target.value
    });
  }
  onLoginClick = () => {
    if (this.state.isLogin) {
      this.context.router.history.replace('/bandou/home');

      // request({
      //   url: 'index/login',
      //   method: 'post',
      //   data: {
      //     username: this.state.username,
      //     password: Md5.hashStr(this.state.password)
      //   }
      // });
    } else {
      this.setState({
        isLogin: true
      });
    }
  }
  onRegisterClick = () => {
    if (this.state.isLogin) {
      this.setState({
        isLogin: false
      });
    } else {
      request({
        url: 'index/register',
        method: 'post',
        data: {
          username: this.state.username,
          password: Md5.hashStr(this.state.password)
        }
      });
    }
  }
  render() {
    return (
      <article className="login-container">
        <Card className="absolute-vertical-horizontal-center login-card">
          <div className="login-header">
            <LockIcon />
            欢迎{this.state.isLogin ? '登录' : '注册'}
          </div>
          <CardContent>
            <FormControl fullWidth>
              <InputLabel htmlFor="login-username">用户名</InputLabel>
              <Input
                id="login-username"
                value={this.state.username}
                onChange={this.onUsernameChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="login-password">密码</InputLabel>
              <Input
                id="login-password"
                type="password"
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
            </FormControl>
            {!this.state.isLogin && <FormControl fullWidth>
              <InputLabel htmlFor="login-password-again">再次输入密码</InputLabel>
              <Input
                id="login-password-again"
                type="password"
                value={this.state.passwordAgain}
              />
            </FormControl>}
            <CardActions className="login-actions">
              <Button variant="contained" color="primary" onClick={this.onLoginClick}>
                {this.state.isLogin ? '登录' : '返回登录'}
                {/* <Link to="/home" className="plain-text"> </Link> */}
              </Button>
              <Button variant="contained" onClick={this.onRegisterClick}>{this.state.isLogin ? '注册' : '确定注册'}</Button>
            </CardActions>
          </CardContent>
        </Card>
      </article>
    );
  }
}