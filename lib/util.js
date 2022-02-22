const jwt = require('jsonwebtoken')
const OSS = require('ali-oss')
const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAI5tSVCiLtVtAuTdPRGwXj',
  accessKeySecret: 'Sdd1UvlKU7O1fURsvFVhKgIy837J5r',
  bucket: 'blog-umep'
})
module.exports.client = client

module.exports.util = {
  /**
   * 格式化输出数据
   * @param data
   * @param code
   * @param message
   * @returns {{reslut, code: *, message: string}}
   */
  formatResult: (data, code, message = '') => {
    if (data.affectedRows < 1 && data.insertId < 1) code = 3306
    message = code === 200 ? '成功' : 'DB失败'
    return {
      result: data,
      code: code,
      msg: message
    }
  }
}
