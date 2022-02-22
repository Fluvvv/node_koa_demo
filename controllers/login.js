'use strict'

const userRouter = {}
const crypto = require('crypto')
const DB = require('../lib/DB.js')
const config = require('../config')
const jwt = require('jsonwebtoken')

let routesModel = {
  insert: (value, username) => {
    let _sql =
      `insert into user (username,password) select ?,? from dual where not exists(select * from user where username = ` +
      "'" +
      username +
      "'" +
      ')'
    return DB.query(_sql, value)
  },
  login: (value, params) => {
    let _sql = `select * from user where username = '${params.username}' and password='${params.psdMd5}'`
    return DB.query(_sql, value)
  },
  remove: (value, id) => {
    let _sql = `DELETE FROM article where id='${id}'`
    return DB.query(_sql, value)
  },
  conditionQuery: (value, params) => {
    let _sql = `select * from user where username = '${params.username}' `
    return DB.query(_sql, value)
  }
}
/***
 * 注册用户
 */
userRouter.register = async (ctx) => {
  const { username = '', password = '' } = ctx.request.body
  const psdMd5 = crypto.createHash('md5').update(password).digest('hex')
  const createTime = new Date()
  let hasUser = await routesModel.conditionQuery([], { username })
  if (hasUser.result.length > 0)
    return (ctx.body = { code: false, message: '用户名已存在！' })
  let data = ({ result, success, message } = await routesModel.insert(
    [username, psdMd5, createTime],
    username
  ))
  const user = await routesModel.conditionQuery([], { username })
  const payload = { user: user.result[0] } //存储user到token
  const token = jwt.sign(payload, config.secret, { expiresIn: '1h' }) //过期时间
  data.token = token
  ctx.body = data
}

userRouter.login = async (ctx) => {
  const { username = '', password = '' } = ctx.request.body
  const psdMd5 = crypto.createHash('md5').update(password).digest('hex')
  let hasUser = await routesModel.conditionQuery([], { username })

  if (!hasUser.result.length)
    return (ctx.body = { code: false, message: '用户名不存在！' })

  let resData = await routesModel.login([], {
    username,
    psdMd5
  })
  if (!resData.result.length)
    return (ctx.body = { code: false, message: '密码错误！' })

  const user = await routesModel.conditionQuery([], { username })
  const payload = { user: user.result[0] } //存储user到token
  const token = jwt.sign(payload, config.secret, { expiresIn: '1h' }) //过期时间
  resData.token = token
  ctx.body = resData
}

module.exports = userRouter
