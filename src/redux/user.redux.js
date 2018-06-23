import axios from "axios"
import { getRedirectPath } from '../util'

const LOGINSUCCESS = 'LOOGINSUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  redirectTo: '',
  isAuth: '',
  msg: '',
  user: '',
  pwd: '',
  repeatpwd: '',
  type: ''
}

// reducer
export function user (state = initState, action) {
  switch (action.type) {
    case LOGINSUCCESS:
      return {
        ...state,
        redirectTo: getRedirectPath(action.payload),
        msg: '',
        isAuth: true,
        ...action.payload
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        redirectTo: getRedirectPath(action.payload),
        msg: '',
        isAuth: true,
        ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        isAuth: false
      }
    default:
      return state
  }
}

function loginSuccess (data) {
  return {
    type: LOGINSUCCESS,
    payload: data
  }
}

function registerSuccess (data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

function errorMsg (msg) {
  return {
    msg: msg,
    type: ERROR_MSG
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
          dispatch(registerSuccess({
            user,
            pwd,
            repeatpwd,
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
          dispatch(loginSuccess(resp.data.data))
        } else {
          dispatch(errorMsg(resp.data.msg))
        }
      })
  }
}