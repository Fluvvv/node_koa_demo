'use strict'

const Router = require('koa-router')
const userRouter = new Router()
const controllers = require('../controllers')

userRouter.post('/login', controllers.login.login)

module.exports = userRouter.routes()
