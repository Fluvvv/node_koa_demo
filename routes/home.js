'use strict'

const Router = require('koa-router')
const userRouter = new Router()
const controllers = require('../controllers')
const jwtMiddleware = require('../middlewares/jwt')

userRouter.post('/home', controllers.home.home)
// userRouter.post('/home', jwtMiddleware, controllers.home.home)

module.exports = userRouter.routes()
