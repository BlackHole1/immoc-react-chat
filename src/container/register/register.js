import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button,  Radio} from 'antd-mobile';
import Logo from '../../component/logo/logo'

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'genius'
    }
  }
  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <WingBlank>
          <Logo></Logo>
          <List>
            <InputItem>用户</InputItem>
            <InputItem>密码</InputItem>
            <InputItem>确认密码</InputItem>
            <RadioItem checked={this.state.type === 'genius'}>
              牛人
            </RadioItem>
            <RadioItem checked={this.state.type === 'boss'}>
              BOSS
            </RadioItem>
          </List>
        </WingBlank>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
