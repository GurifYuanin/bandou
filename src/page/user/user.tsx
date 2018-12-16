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

interface State {
  username: string;
  detail: string;
  isMale: boolean;
  up: number;
  down: number;
}
export default class Login extends React.Component {
  state: State = {
    username: '二狗子',
    detail: '喜欢狗狗',
    isMale: true,
    up: 0,
    down: 0
  }
  render() {
    return (
      // <form noValidate autoComplete="off">
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
          <Button color="primary" variant="contained">保存</Button>
        </div>
      </FormControl>
      // </form>
    );
  }
}