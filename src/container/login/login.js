import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo'
import { login } from '../../redux/user.redux'

@connect(
  state => state.user,
  {login}
)
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      user: '',
      pwd: ''
    }
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  handleLogin () {
    this.props.login(this.state)
  }
  render () {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem
              clear
              onChange={v => this.handleChange('user', v)}>
              用户
            </InputItem>
            <InputItem
              clear
              onChange={v => this.handleChange('pwd', v)}>
              密码
            </InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button
            type="primary"
            onClick={this.handleLogin}>
            登陆
          </Button>
          <WhiteSpace></WhiteSpace>
          <Button
            type="primary"
            onClick={this.register}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }

  register () {
    this.props.history.push('/register')
  }
}

export default Login
