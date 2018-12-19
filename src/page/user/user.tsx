import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import request from '../../util/request';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

interface State {
  username: string;
  detail: string;
  isMale: boolean;
  up: number;
  down: number;
  isModal: boolean;
  modalMessage: string;
}
export default class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  state: State = {
    username: localStorage.getItem('username') || '',
    detail: '',
    isMale: true,
    up: 0,
    down: 0,
    isModal: false,
    modalMessage: ''
  }

  componentWillMount() {
    if (!this.state.username) {
      this.context.router.history.replace('/bandou/');
      return;
    }
    request({
      method: 'post',
      url: 'User/getUserInfo',
      data: {
        username: this.state.username
      }
    }).then(response => {
      const data = response.data;
      if (data.status) {
        this.setState({
          username: data.info.username,
          isMale: data.info.is_male === 1,
          detail: data.info.detail,
          up: data.info.up,
          down: data.info.down
        });
      } else {
        this.setState({
          isModal: true,
          modalMessage: data.message
        });
      }
    })
  }
  updateUserInfo = () => {
    request({
      method: 'post',
      url: 'User/updateUserInfo',
      data: {
        username: this.state.username,
        detail: this.state.detail,
        is_male: this.state.isMale ? 1 : 0
      }
    }).then(response => {
      const data = response.data;
      this.setState({
        isModal: true,
        modalMessage: data.message
      });
    });
  }
  render() {
    return (
      // <form noValidate autoComplete="off">
      <>
        <FormControl style={{
          display: 'flex',
          padding: '5px'
        }}>
          <TextField
            label="用户名"
            style={{ margin: 8 }}
            placeholder="输入用户名"
            value={this.state.username}
            fullWidth
            variant="filled"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => this.setState({
              username: e.target.value
            })}
          />
          <TextField
            label="简介"
            style={{ margin: 8 }}
            placeholder="输入简介"
            value={this.state.detail}
            fullWidth
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => this.setState({
              detail: e.target.value
            })}
          />

          <FormLabel>性别</FormLabel>
          <RadioGroup
            value={this.state.isMale ? 'male' : 'female'}
            onChange={(event: React.ChangeEvent<{}>, value: string) => this.setState({
              isMale: value === 'male'
            })}
            style={{
              flexDirection: 'row'
            }}
          >
            <FormControlLabel value="female" control={<Radio color="primary" />} label="女" />
            <FormControlLabel value="male" control={<Radio color="primary" />} label="男" />
          </RadioGroup>

          <div>
            <div>
              <ArrowDropUpIcon style={{ verticalAlign: 'middle' }}></ArrowDropUpIcon>获得赞数：{this.state.up}
            </div>
            <div>
              <ArrowDropDownIcon style={{ verticalAlign: 'middle' }}></ArrowDropDownIcon>获得踩数：{this.state.down}
            </div>
          </div>
          <div style={{
            margin: 'auto',
            textAlign: 'center'
          }}>
            <Button color="primary" variant="contained" onClick={this.updateUserInfo}>保存</Button>
          </div>
        </FormControl>
        <Modal open={this.state.isModal} onClose={() => this.setState({ isModal: false })}>
          <div className="common-modal absolute-vertical-horizontal-center">{this.state.modalMessage}</div>
        </Modal>
      </>
      // </form>
    );
  }
}