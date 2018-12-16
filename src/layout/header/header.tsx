import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { createHashHistory } from 'history'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


interface Props {
  match: {
    path: string,
    url: string
  }
}

class Header extends React.Component {
  path: string = '/bandou/home/';
  history = createHashHistory()
  onLogoutClick = () => {

  }
  onButtonNavChange = (event: React.ChangeEvent<{}>, value: string) => {
    if (this.path !== value) {
      this.path = value;
      this.history.push(value);
    }
    // this.path = value;
  }
  render() {
    return (
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            欢迎来到瓣豆
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