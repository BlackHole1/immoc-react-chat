import React from 'react'
import { connect } from 'react-redux'
import { List, InputItem, WingBlank, WhiteSpace, Button,  Radio} from 'antd-mobile';
import Logo from '../../component/logo/logo'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';

@connect(
  state => state.user,
  {register}
)
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  handleRegister () {
    this.props.register(this.state)
  }
  toLogin () {
    this.props.history.push('/login')
  }
  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <WingBlank>
          <Logo></Logo>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem
              clear
              onChange={v => this.handleChange('user', v)}>
              用户
            </InputItem>
            <InputItem
              clear
              type='password'
              onChange={v => this.handleChange('pwd', v)}>
              密码
            </InputItem>
            <InputItem
              clear
              type='password'
              onChange={v => this.handleChange('repeatpwd', v)}>
              确认密码
            </InputItem>
            <RadioItem
              checked={this.state.type === 'genius'}
              onChange={() => this.handleChange('type', 'genius')}>
              牛人
            </RadioItem>
            <RadioItem
              checked={this.state.type === 'boss'}
              onChange={() => this.handleChange('type', 'boss')}>
              BOSS
            </RadioItem>
          </List>
        </WingBlank>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button
            type="primary"
            onClick={this.handleRegister}>
            注册
          </Button>
          <WhiteSpace></WhiteSpace>
          <Button
            type="primary"
            onClick={() => this.toLogin()}>
            返回登录界面
          </Button> 
        </WingBlank>
      </div>
    )
  }
}

export default Register
