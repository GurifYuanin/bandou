import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { createHashHistory } from 'history'
import SvgIcon from '@material-ui/core/SvgIcon';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


interface Props {
  match: {
    path: string,
    url: string
  }
}

function HomeIcon() {
  return (
    <SvgIcon>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class Header extends React.Component {
  path: string = '/bandou/home/';
  history = createHashHistory()
  onLogoutClick = () => {
    localStorage.removeItem('username');
  }

  render() {
    return (
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            欢迎来到瓣豆
          </Typography>
          <Typography className="plain-text" style={{ color: 'inherit' }}>
            欢迎登录，{localStorage.getItem('username') || '用户'}
          </Typography>
          <Button color="inherit" onClick={this.onLogoutClick}>
            <Link to="/bandou/" className="plain-text">登出</Link>
          </Button>
        </Toolbar>
        <Card
          style={{
            width: '100%',
            textAlign: 'center'
          }}
        >
          <Button size="large"><Link to="/bandou/home/" className="plain-text nav-button">首页</Link></Button>
          <Button size="large"><Link to="/bandou/home/user" className="plain-text nav-button">个人中心</Link></Button>
        </Card>
      </AppBar>
    );
  }
}
export default Header;