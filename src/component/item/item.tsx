import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { User } from '../../page/home/home';
import Paper from '@material-ui/core/Paper';
import './item.css';

interface Props {
  user: User;
  onUpClick: (el: User) => void;
  onDownClick: (el: User) => void
}

export default class Item extends React.Component<Props> {
  render() {
    const user = this.props.user;
    return (
      <Paper>
        <div style={{
          display: 'flex',
          width: '100vw',
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#f7f7f7'
        }}>
          <Avatar style={{
            backgroundColor: user.isMale ? 'blue' : 'pink',
            marginRight: '10px'
          }}>
            {user.isMale ? 'M' : 'F'}
          </Avatar>
          <div>
            <div style={{
              fontSize: '18px',
              fontWeight: 500
            }}>{user.username}</div>
            <div style={{
              fontSize: '14px',
              padding: '10px 0',
              color: 'gray',
              height: '50px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{user.detail}</div>
            <div>
              <Fab className="plain-shadow-fab" disabled={user.isDowned} color={user.isUped ? 'primary' : 'default'} size="small" onClick={el => this.props.onUpClick(user)}>
                {user.up}
                <ArrowDropUpIcon />
              </Fab>
              <Fab className="plain-shadow-fab" disabled={user.isUped} color={user.isDowned ? 'primary' : 'default'} size="small" onClick={el => this.props.onDownClick(user)}>
                {user.down}
                <ArrowDropDownIcon />
              </Fab>
              <Fab className="plain-shadow-fab" size="small" style={{
                width: '88px'
              }} variant="extended">
                <Link to={`/bandou/home/user/${user.username}`} className="plain-text">查看详情</Link>
              </Fab>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}