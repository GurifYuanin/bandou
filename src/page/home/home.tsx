import React from 'react';
import Item from '../../component/item/item';
import TablePagination from '@material-ui/core/TablePagination';
import request from '../../util/request';
import PropTypes from 'prop-types';
import './home.css';


export interface User {
  username: string;
  detail: string;
  up: number;
  down: number;
  isUped: boolean;
  isDowned: boolean;
  isMale: boolean;
}

interface State {
  items: User[];
  rowsPerPage: number;
  currentPage: number;
  username: string | null;
}

interface ServerUser {
  operationer: string;
  be_operationer: string;
  is_male: number;
  down: number;
  up: number;
  is_uped: number;
  is_downed: number;
  detail: string | null;
}

export default class Login extends React.Component<{}, State> {
  static contextTypes = {
    router: PropTypes.object
  };
  state: State = {
    username: localStorage.getItem('username'),
    items: [],
    rowsPerPage: 10,
    currentPage: 1
  }

  componentWillMount() {
    if (!this.state.username) {
      this.context.router.history.replace('/bandou/');
      return;
    }
    this.getAllComment();
  }

  getAllComment = () => {
    request({
      method: 'get',
      url: 'Operation/getOperationList',
      params: {
        username: this.state.username,
        size: this.state.rowsPerPage,
        page: this.state.currentPage
      }
    }).then(response => {
      const data = response.data;
      this.setState({
        items: data.list.map((el: ServerUser) => ({
          username: el.be_operationer,
          detail: el.detail || '暂无',
          up: el.up,
          down: el.down,
          isUped: el.is_uped === 1,
          isDowned: el.is_downed === 1,
          isMale: el.is_male === 1
        }))
      });
    });
  }
  onChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    this.setState({
      currentPage: page
    });
    setTimeout(this.getAllComment, 40);
  }

  onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      rowsPerPage: Number.parseInt(event.target.value)
    });
    setTimeout(this.getAllComment, 40);
  }

  onUpClick = (el: User) => {
    request({
      method: 'post',
      url: 'Operation/up',
      data: {
        operationer: this.state.username,
        be_operationer: el.username
      }
    }).then(response => {
      const data = response.data;
      if (data.status) {
        this.setState((preState: State) => {
          if (el.isUped) {
            el.up--;
            el.isUped = false;
          } else {
            el.up++;
            el.isUped = true;
          }
          return preState;
        });
      } else {

      }
    })

  }

  onDownClick = (el: User) => {
    request({
      method: 'post',
      url: 'Operation/down',
      data: {
        operationer: this.state.username,
        be_operationer: el.username
      }
    }).then(response => {
      const data = response.data;
      if (data.status) {
        this.setState((preState: State) => {
          if (el.isDowned) {
            el.down--;
            el.isDowned = false;
          } else {
            el.down++;
            el.isDowned = true;
          }
          return preState;
        });
      } else {

      }
    })

  }
  render() {
    return (
      <div style={{
        overflow: 'auto',
        position: 'absolute',
        top: 0,
        bottom: 0
      }}>
        {this.state.items.map((el: User) =>
          <Item
            key={el.username}
            user={el}
            onUpClick={this.onUpClick}
            onDownClick={this.onDownClick}
          />
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          colSpan={3}
          count={this.state.items.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.currentPage}
          SelectProps={{
            native: true,
          }}
          onChangePage={this.onChangePage}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
          style={{
            display: 'block'
          }}
        />
      </div>
    );
  }
}