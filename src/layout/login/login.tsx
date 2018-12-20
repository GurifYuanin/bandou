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
import Modal from '@material-ui/core/Modal';
import { Md5 } from 'ts-md5/dist/md5';
import './login.css';
import PropTypes from 'prop-types';

interface State {
  username: string;
  password: string;
  passwordAgain: string;
  isLogin: boolean;
  isModal: boolean;
  modalMessage: string;
}
export default class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  state: State = {
    username: '',
    password: '',
    passwordAgain: '',
    isLogin: true,
    isModal: false,
    modalMessage: ''
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
  onPasswordAgainChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      passwordAgain: e.target.value
    });
  }

  // 登录按钮
  onLoginClick = () => {
    if (this.state.isLogin) {
      if (this.state.username && this.state.password) {
        request({
          url: 'User/login',
          method: 'post',
          data: {
            username: this.state.username,
            password: Md5.hashStr(this.state.password)
          }
        }).then(response => {
          const data = response.data;
          if (data.status) {
            localStorage.setItem('username', this.state.username);
            this.context.router.history.replace('/bandou/home');
          } else {
            this.setState({
              modalMessage: data.message,
              isModal: true
            });
          }
        });
      } else {
        this.setState({
          isModal: true,
          modalMessage: '请输入用户名和密码'
        });
      }
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
      if (this.state.password !== this.state.passwordAgain) {
        this.setState({
          isModal: true,
          modalMessage: '密码不一致'
        });
        return;
      } else if (this.state.username && this.state.password && this.state.passwordAgain) {
        request({
          url: 'User/register',
          method: 'post',
          data: {
            username: this.state.username,
            password: Md5.hashStr(this.state.password)
          }
        }).then(response => {
          const data = response.data;
          localStorage.setItem('username', this.state.username);
          this.setState({
            modalMessage: data.message,
            isModal: true
          });
          if (data.status) {
            setTimeout(() => {
              this.context.router.history.replace('/bandou/home');
            }, 2000);
          }
        });
      } else {
        this.setState({
          isModal: true,
          modalMessage: '请输入用户和密码'
        });
      }
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
                onChange={this.onPasswordAgainChange}
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

        <Modal open={this.state.isModal} onClose={() => this.setState({ isModal: false })}>
          <div className="common-modal absolute-vertical-horizontal-center">{this.state.modalMessage}</div>
        </Modal>
      </article>
    );
  }
}