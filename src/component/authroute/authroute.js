import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
  null,
  {loadData}
)
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
            this.props.loadData(resp.data.data)
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
