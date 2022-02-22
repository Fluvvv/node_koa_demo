'use strict'

const userRouter = {}
const DB = require('../lib/DB.js')
const { InvalidQueryError } = require('../lib/error')

let routesModel = {
  conditionQuery: (value, params) => {
    let _sql = `select * from user where username = '${params.username}' `
    return DB.query(_sql, value)
  },
  bannerQuery: (value, params) => {
    let _sql = `select * from banner where username = '${params.username}' `
    return DB.query(_sql, value)
  }
}

userRouter.home = async (ctx) => {
  const { who = '' } = ctx.request.body

  if (!who) {
    throw new InvalidQueryError('查询banner参数错误！')
  }

  try {
    const res = await routesModel.conditionQuery([], {})
    res.imgUrl =
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg10.51tietu.net%2Fpic%2F20191029%2F0leqidil4f10leqidil4f1.jpg&refer=http%3A%2F%2Fimg10.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647239045&t=7c52452d1d2090bb9c10ff751d6090ab'
    ctx.body = res
  } catch (error) {
    throw new InvalidQueryError('查询banner接口异常！')
  }
}
module.exports = userRouter
