const dayjs = require('dayjs')
const fs = require('fs')

module.exports = options => {
  return async (ctx, next) => {
    await next();
    const nowDate = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    const req = ctx.request;
    const res = ctx.response.body
    const { code } = res
    const phone = req.body.phoneNumber
    const userData = await ctx.service.user.userUtil.getUserDataByPhone(phone)
    const type = req.url === '/api/user/exit' ? '退出登录' : '登录'
    const info = {
      userID: userData.id,
      name: userData.name,
    }

    if(code === 0){
        const data = nowDate + ` [ ${type} ] ` + JSON.stringify(info) + '\n'
        fs.appendFileSync(ctx.app.baseDir + '/logs/login.log', data)
    }
  }
}
