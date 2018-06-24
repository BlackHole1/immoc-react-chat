const express = require('express')
const utils = require('utility')
const model = require('./model')
const Router = express.Router()
const User = model.getModel('user')
const _filter = {
  'pwd': 0,
  '__v': 0
}

Router.get('/list', function (req, resp) {
  User.find({}, function (err, doc) {
    return resp.json(doc)
  })
})

Router.post('/login', function (req, resp) {
  const { user, pwd } = req.body
  if (!user || !pwd) {
    return resp.json({
      code: 0,
      msg: '用户名密码必须填写'
    })
  }
  
  User.findOne({
    user,
    pwd: md5Pwd(pwd)
  }, _filter, function (err, doc) {
    if (err) {
      return resp.json({
        code: 0,
        msg: '数据库查询出错'
      })
    }
    
    if (!doc) {
      return resp.json({
        code: 0,
        msg: '没有此用户，请检查后重新登录'
      })
    }

    resp.cookie('userid', doc._id)

    return resp.json({
      code: 1,
      data: doc
    })
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

    const userModel = new User({
      user,
      pwd: md5Pwd(pwd),
      type
    })

    userModel.save(function(err, doc) {
      if (err) {
        return resp.json({
          code: 0,
          msg: '数据库创建出错'
        })
      }

      const { user, type, _id } = doc
      resp.cookie('userid', _id)

      return resp.json({
        code: 1,
        data: {
          user,
          type,
          _id
        }
      })
    })
  })
})

Router.get('/info', function (req, resp) {
  const { userid } = req.cookies
  if (!userid) {
    return resp.json({
      code: 0,
      msg: '请先登录'
    })
  }
  
  User.findOne({
    _id: userid
  }, _filter, function (err, doc) {
    if (err) {
      return resp.json({
        code:0,
        msg: '数据库查询失败'
      })
    }
    
    if (!doc) {
      return resp.json({
        code: 0,
        msg: '找不到当前用户，请重新检查cookie'
      })
    }

    return resp.json({
      code: 1,
      data: doc
    })
  })
})

function md5Pwd (pwd) {
  const salt = 'black-hole_1a1a1a~'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
