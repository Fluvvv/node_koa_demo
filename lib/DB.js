const mysql = require('mysql')
const { util } = require('./util')
const config = require('../config')

// 建立链接
let pool = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
})

exports.query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(util.formatResult(err, false))
      } else {
        connection.query(sql, values, (err, fields) => {
          if (err) resolve(util.formatResult(err, 3306))
          else {
            resolve(util.formatResult(fields, 200))
          }
          connection.release()
        })
      }
    })
  })
}
