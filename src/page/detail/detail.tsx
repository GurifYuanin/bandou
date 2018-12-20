import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import request from '../../util/request';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import './detail.css';

interface User {
  username: string;
  up: number;
  down: number;
  isMale: boolean;
  comments: string[];
  detail: string;
}
interface State {
  user: User;
  commentList: Comment[];
  comment: Comment;
  username: string;
  isModal: boolean;
  modalMessage: string;
}
interface Props {
  match: {
    params: {
      username: string
    }
  }
}
export interface Comment {
  operationer: string;
  content: string;
}

export interface ServerComment {
  operationer: string;
  be_operationer: string;
  content: string;
  create_time: string;
}

export default class Detail extends React.Component<Props, State> {
  static contextTypes = {
    router: PropTypes.object
  };
  state: State = {
    username: localStorage.getItem('username') || '',
    commentList: [],
    user: {
      username: this.props.match.params.username,
      up: 0,
      down: 0,
      isMale: true,
      comments: [],
      detail: ''
    },
    comment: {
      operationer: localStorage.getItem('username') || '',
      content: ''
    },
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
        username: this.state.user.username
      }
    }).then(response => {
      const data = response.data;
      if (data.status) {
        this.setState((preState: State) => {
          preState.user.up = data.info.up;
          preState.user.down = data.info.down;
          preState.user.detail = data.info.detail || '暂无';
          preState.user.isMale = data.info.is_male === 1;
          return preState;
        });
      }
    });
    this.getAllComment();
  }

  getAllComment = () => {
    request({
      method: 'post',
      url: 'Comment/getAllComment',
      data: {
        be_operationer: this.state.user.username
      }
    }).then(response => {
      const data = response.data;
      if (data.status) {
        this.setState({
          commentList: data.list.map((el: ServerComment) => ({
            operationer: el.operationer,
            content: el.content
          }))
        });
      }
    });
  }

  // 发表评论
  addCommentClickHandler = () => {
    if (this.state.comment.content) {
      request({
        method: 'post',
        url: 'Comment/addComment',
        data: {
          operationer: this.state.username,
          be_operationer: this.state.user.username,
          content: this.state.comment.content
        }
      }).then(response => {
        const data = response.data;
        if (data.status) {
          this.getAllComment();
          this.setState((preState: State) => {
            preState.comment.content = ''
            return preState;
          });
        }
      });
    } else {
      this.setState({
        isModal: true,
        modalMessage: '请输入评论内容'
      });
    }
  }

  render() {
    const user: User = this.state.user;
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto'
      }}>
        <Card style={{
          width: '100%',
          display: 'flex',
          minHeight: '200px',
        }} >
          <div style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: '50%',
            height: '100%',
            minHeight: '200px',
          }}>
            <Avatar style={{
              backgroundColor: user.isMale ? 'blue' : 'pink',
            }}>
              {user.isMale ? 'M' : 'F'}
            </Avatar>
          </div>
          <div className="user-detail-info">
            <div style={{
              fontSize: '22px',
              fontWeight: 500
            }}>{user.username}</div>
            <div style={{
              color: 'gray',
              fontSize: '14px',
              padding: '10px 0'
            }}>{user.detail}</div>
            <div>获得赞数：{user.up}</div>
            <div>获得踩数：{user.down}</div>
          </div>
        </Card>
        <Card style={{ width: '100%' }} >
          <CardHeader title="评论列表"></CardHeader>
          <CardContent>
            {this.state.commentList.length === 0 && <div>暂无评论</div>}
            {this.state.commentList.map((el: Comment, index: number) =>
              <div key={index} style={{ marginBottom: '10px' }}>
                {el.operationer}
                评论说：
                {el.content}
              </div>
            )}
          </CardContent>

          <FormControl style={{
            display: 'flex',
            padding: '5px'
          }}>
            <TextField
              label="评论内容"
              placeholder="输入评论内容"
              value={this.state.comment.content}
              fullWidth
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => {
                const value = e.target.value;
                this.setState((preState: State) => {
                  preState.comment.content = value;
                  return preState;
                });
              }}
            />
          </FormControl>
          <CardActions style={{
            margin: 'auto',
            textAlign: 'center',
            justifyContent: 'center'
          }}>
            <Button color="primary" variant="contained" onClick={this.addCommentClickHandler}>发表评论</Button>
          </CardActions>
        </Card>
        <Modal open={this.state.isModal} onClose={() => this.setState({ isModal: false })}>
          <div className="common-modal absolute-vertical-horizontal-center">{this.state.modalMessage}</div>
        </Modal>
      </div>
    );
  }
}