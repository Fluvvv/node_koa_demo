'use strict'

const Router = require('koa-router')
const routers = new Router()

const fs = require('fs')
const files = fs.readdirSync(__dirname).filter((file) => file !== 'index.js')

for (const file of files) {
  if (file.toLowerCase().endsWith('js')) {
    routers.use(require(`./${file}`))
  }
}
module.exports = routers
