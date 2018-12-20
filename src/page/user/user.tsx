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
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import { Comment, ServerComment } from '../detail/detail';
import './user.css';

interface State {
  username: string;
  detail: string;
  isMale: boolean;
  up: number;
  down: number;
  isModal: boolean;
  modalMessage: string;
  commentList: Comment[];
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
    modalMessage: '',
    commentList: []
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
    });
    this.getAllComment();
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

  getAllComment = () => {
    request({
      method: 'post',
      url: 'Comment/getAllComment',
      data: {
        be_operationer: this.state.username
      }
    }).then(response => {
      const data = response.data;
      if (data.status) {
        this.setState({
          commentList: data.list.map((el: ServerComment) => ({
            operationer: el.operationer,
            content: el.content,
            create_time: el.create_time
          }))
        });
      }
    });
  }
  render() {
    return (
      // <form noValidate autoComplete="off">
      <>
        <FormControl style={{
          display: 'flex',
          padding: '5px',
          boxShadow: '0 0 5px .5px grey',
          margin: '10px auto'
        }}>
          <h4 style={{ textAlign: 'center' }}>修改个人资料</h4>
          <Tooltip title="用户名字一旦创建便无法更改">
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
            />
          </Tooltip>
          <Tooltip title="用一段话介绍一下你自己(100字内)">
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
          </Tooltip>

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

          <div style={{
            margin: 'auto',
            textAlign: 'center'
          }}>
            <Button color="primary" variant="contained" onClick={this.updateUserInfo}>保存</Button>
          </div>
        </FormControl>

        <Card>
          <CardContent>
            <h4 style={{ textAlign: 'center' }}>当前局势</h4>
            <div>
              <ArrowDropUpIcon style={{ verticalAlign: 'middle' }}></ArrowDropUpIcon>获得赞数：{this.state.up}
            </div>
            <div>
              <ArrowDropDownIcon style={{ verticalAlign: 'middle' }}></ArrowDropDownIcon>获得踩数：{this.state.down}
            </div>
            <div style={{ color: this.state.up - this.state.down < 0 ? 'red' : 'rgb(64, 83, 175)' }}>
              <ThreeSixtyIcon style={{ verticalAlign: 'middle' }} />综合得分：{this.state.up - this.state.down}
            </div>
            <h4 style={{ textAlign: 'center' }}>对我的评论</h4>
            {this.state.commentList.length === 0 && <div>暂无评论</div>}
            {this.state.commentList.map((el: Comment) =>
              (<div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{el.operationer}说：{el.content}</div>
                <div style={{ fontSize: '12px', color: 'gray' }}>{el.create_time}</div>
              </div>))}
          </CardContent>
        </Card>
        <Modal open={this.state.isModal} onClose={() => this.setState({ isModal: false })}>
          <div className="common-modal absolute-vertical-horizontal-center">{this.state.modalMessage}</div>
        </Modal>
      </>
      // </form>
    );
  }
}