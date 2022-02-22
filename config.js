'use strict'

const path = require('path')

module.exports = {
  port: '9633',
  secret: 'umep_app_secret',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
  mysql: {
    host: '192.168.10.181',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'office'
  }
}
