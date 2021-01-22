'use strict';

const Service = require('egg').Service;

class JwtService extends Service {
  /**
   * @description 获取jwt中传递的数据
   * @return {Object} jwt中传递的数据
   * @memberof JwtService
   */
  async getJWtData() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization.replace('Bearer ', '');
    const secret = app.config.jwt.secret;
    const tokenData = app.jwt.verify(token, secret);

    return tokenData;
  }

  /**
   * @description 获取jwt生成的token
   * @param {Object} storeData 将要在token中存储的数据
   * @param {Object} options 额外设置
   * @return {string} token字符串
   * @memberof JwtService
   */
  async getToken(storeData, options) {
    const { app, ctx } = this;
    const token = app.jwt.sign(storeData, app.config.jwt.secret, options);

    if (!ctx.isNull(storeData.userID)) {
      await this.updateJWTWhiteList(storeData.userID);
    }

    return token;
  }

  /**
   * @description 验证redis白名单中是否有该userID
   * @param {Number} userID 用户ID
   * @return {Boolean} 是否拥有该userID
   * @memberof JwtService
   */
  async verifyJWtWhite(userID) {
    const { service } = this;
    const jwtWhiteList = await service.cache.get('jwtWhiteList');
    let result = false;
    if (!jwtWhiteList || jwtWhiteList.length === 0) {
      return result;
    }
    for (let index = 0; index < jwtWhiteList.length; index++) {
      const jwtWhiteData = jwtWhiteList[index];
      if (jwtWhiteData.userID === userID) {
        result = true;
        break;
      }
    }

    return result;
  }

  /**
   * @description 设置jwt的时候将对应的userID储存到redis中
   * @param {Number} userID 用户ID
   * @memberof JwtService
   */
  async updateJWTWhiteList(userID) {
    const { service } = this;
    const whiteList = await service.cache.get('jwtWhiteList');
    const nowDate = new Date().getTime();

    if (!whiteList || whiteList.length === 0) {
      await service.cache.set('jwtWhiteList', [
      {
        userID,
        createTime: nowDate,
      }, ]);

      return;
    }

    const newWhiteList = [];
    let isInsert = false;
    console.log(userID)
    for (let index = 0; index < whiteList.length; index++) {
      const jwtData = whiteList[index];
      if (jwtData.userID === userID) {
        jwtData.createTime = nowDate;
        isInsert = true;
      }
      // 如果创建时间大于7天
      if ((nowDate - jwtData.createTime) < 60 * 60 * 24 * 1000 * 7) {
        if (jwtData.userID > userID && !isInsert) {
          newWhiteList.push({
            userID,
            createTime: nowDate,
          });
          isInsert = true;
        }
        newWhiteList.push(jwtData);
      }
    }
    if(!isInsert){
      newWhiteList.push({
        userID,
        createTime: nowDate,
      });
    }

    await service.cache.set('jwtWhiteList', newWhiteList);
  }
}

module.exports = JwtService;
