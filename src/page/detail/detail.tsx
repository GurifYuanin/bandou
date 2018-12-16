import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  comment: Comment;

}
interface Comment {
  content: string;
}

export default class Detail extends React.Component {
  state: State = {
    user: {
      username: '二狗子',
      up: 0,
      down: 0,
      isMale: true,
      comments: [],
      detail: '喜欢狗狗'
    },
    comment: {
      content: ''
    }
  }
  componentWillMount() {

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
          <div>
            <div>{user.username}</div>
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
            {user.comments.map((el: string) =>
              <div>{el}</div>
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
              onChange={e => this.setState({
                comment: { content: e.target.value }
              })}
            />
          </FormControl>
          <CardActions style={{
            margin: 'auto',
            textAlign: 'center',
            justifyContent: 'center'
          }}>
            <Button color="primary" variant="contained">发表评论</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}