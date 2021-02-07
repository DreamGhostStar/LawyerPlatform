'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs')
const fs = require('fs')

class SystemLogService extends Service {
  async add(msg, url) {
    const { ctx } = this
    const data = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ` ${url} ` +
      JSON.stringify(msg) + '\n'
    fs.appendFileSync(ctx.app.baseDir + '/logs/system.log', data)
  }
}

module.exports = SystemLogService;
