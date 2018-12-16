import React from 'react';
import Item from '../../component/item/item';
import TablePagination from '@material-ui/core/TablePagination';

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
}

export default class Login extends React.Component {

  state: State = {
    items: [
      {
        username: '二狗子',
        detail: '喜欢狗狗',
        up: 0,
        down: 0,
        isUped: false,
        isDowned: false,
        isMale: true
      },
      {
        username: '三狗子',
        detail: '喜欢狗狗',
        up: 0,
        down: 0,
        isUped: false,
        isDowned: false,
        isMale: true
      },
      {
        username: '四狗子',
        detail: '喜欢狗狗',
        up: 0,
        down: 0,
        isUped: false,
        isDowned: false,
        isMale: true
      },
      {
        username: '五狗子',
        detail: '喜欢狗狗',
        up: 0,
        down: 0,
        isUped: false,
        isDowned: false,
        isMale: true
      },
    ],
    rowsPerPage: 10,
    currentPage: 1
  }

  componentWillMount() {

  }

  onChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    this.setState({
      currentPage: page
    });
  }

  onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      rowsPerPage: event.target.value
    });
  }

  onUpClick = (el: User) => {
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
  }

  onDownClick = (el: User) => {
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