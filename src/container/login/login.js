import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import Logo from '../../component/logo/logo'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
  }

  render () {
    return (
      <div>
        <Logo></Logo>
        <h2>我是登陆页面</h2>
        <WingBlank>
          <List>
            <InputItem clear>用户</InputItem>
            <InputItem clear>密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type="primary">登陆</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }

  register () {
    this.props.history.push('/register')
  }
}

export default Login
