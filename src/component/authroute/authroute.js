import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component {
  componentDidMount () {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.includes(pathname)) {
      return true
    }

    axios.get('user/info')
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data.code === 1) {
            //  登陆成功
          } else {
            this.props.history.push('/login')
          }
        }
      })
  }

  render () {
    return null
  }
}

export default AuthRoute
