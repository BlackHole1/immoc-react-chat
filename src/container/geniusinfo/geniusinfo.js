import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WingBlank, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      avatar: ''
    }
    this.saveInfo = this.savaInfo.bind(this)
  }

  onChange (key, val) {
    this.setState({
      [key]: val
    })
  }

  savaInfo () {
    this.setState({
      'avatar': this.state.avatar || 'boy'
    }, () => this.props.update(this.state))
  }
 
  render () {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar
          mode="dark">
          牛人完善信息页面
        </NavBar>
        <AvatarSelector
          selectAvatar={v => this.onChange('avatar', v)}/>
        <InputItem
          clear
          onChange={v => this.onChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          title='个人简介'
          rows={3}
          autoHeight
          onChange={v => this.onChange('desc', v)}>
        </TextareaItem>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button
            onClick={this.saveInfo}
            type='primary'>保存</Button>
        </WingBlank>
      </div>
    )
  }
}

export default GeniusInfo
