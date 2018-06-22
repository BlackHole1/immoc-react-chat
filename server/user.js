const express = require('express')
const utils = require('utility')
const model = require('./model')
const Router = express.Router()
const User = model.getModel('user')

Router.get('/list', function (req, resp) {
  User.find({}, function (err, doc) {
    return resp.json(doc)
  })
})

Router.post('/register', function (req, resp) {
  const { user, pwd, repeatpwd, type } = req.body

  if (!user || !pwd || !repeatpwd || !type) {
    return resp.json({
      code: 0,
      msg: '用户名密码类型必须填写'
    })
  }

  if (pwd !== repeatpwd) {
    return resp.json({
      code: 0,
      msg: '两次密码不一样'
    })
  }

  User.findOne({
    user
  }, function (err, doc) {
    if (err) {
      return resp.json({
        code: 0,
        msg: '数据库查询出错'
      })
    }

    if (doc) {
      return resp.json({
        code: 0,
        msg: '用户名已经存在'
      })
    }

    User.create({
      user,
      pwd: md5Pwd(pwd),
      type
    }, function (err, doc) {
      if (err) {
        return resp.json({
          code: 0,
          msg: '数据库创建出错'
        })
      }

      return resp.json({
        code: 1
      })
    })
  })
})

Router.get('/info', function (req, resp) {
  return resp.json({
    code: 0
  })
})


function md5Pwd (pwd) {
  const salt = 'black-hole_1a1a1a~'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
