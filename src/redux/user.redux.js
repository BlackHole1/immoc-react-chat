import axios from "axios"
import { getRedirectPath } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

// reducer
export function user (state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        redirectTo: getRedirectPath(action.payload),
        msg: '',
        ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        isAuth: false
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

function authSuccess (data) {
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

function errorMsg (msg) {
  return {
    msg: msg,
    type: ERROR_MSG
  }
}

export function loadData (userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo
  }
}

export function register ({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !repeatpwd || !type) {
    return errorMsg('用户名密码必须输入')
  }

  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不一样')
  }

  return dispatch => {
    axios.post('user/register', {
      user,
      pwd,
      repeatpwd,
      type
    })
      .then(resp => {
        if (resp.status === 200 && resp.data.code === 1) {
          dispatch(authSuccess({
            user,
            type
          }))
        } else {
          dispatch(errorMsg(resp.data.msg))
        }
      })
  }
}

export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }

  return dispatch => {
    axios.post('user/login', {
      user,
      pwd
    })
      .then(resp => {
        if (resp.status === 200 && resp.data.code === 1) {
          dispatch(authSuccess(resp.data.data))
        } else {
          dispatch(errorMsg(resp.data.msg))
        }
      })
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(resp => {
        if (resp.status === 200 && resp.data.code === 1) {
          dispatch(authSuccess(resp.data.data))
        } else {
          dispatch(errorMsg(resp.data.msg))
        }
      })
  }
}
