'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = async (ctx, next) => {
  //取出来源 来源为admin请求的需要token校验
  //   const { from = null } = ctx.request.query
  //   if (!from) return await next()
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    jwt.verify(token, config.secret, {}, (err, dec) => {
      if (err) {
        const error = JSON.parse(JSON.stringify(err))
        if (error.name === 'TokenExpiredError') {
          throw { permissions: false, message: `用户token过期，请重新登录` }
        }
        if (error.name === 'JsonWebTokenError') {
          throw { permissions: false, message: `无效token，请重新登录` }
        }
      } else {
        return dec
      }
    })
  } catch (err) {
    if (!err.permissions) {
      ctx.throw({ code: 401, message: err.message })
    }
    ctx.throw(401, '用户未登录')
  }
  await next()
}
