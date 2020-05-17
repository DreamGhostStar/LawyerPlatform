'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * @description 通过手机号获取用户基本信息
   * @param {string} phoneNumber 电话号码
   * @return {object} 是否成功，成功则返回用户基本信息
   * @memberof UserService
   */
  async getUserDataByPhone(phoneNumber) {
    const { ctx } = this;
    let userData = {};
    let userDataList = await ctx.service.cache.get('user'); // 调用缓存

    if (!userDataList) { // 如果缓存中国没有用户数据或用户数据中的phone_number不一致，则重新调用数据库获取数据
      userDataList = await ctx.model.User.User.findAll({
        attributes: [ 'id', 'phone_number', 'password' ],
      });
    }
    if (userDataList) { // 如果该用户存在，将其调入缓存
      await this.ctx.service.cache.set('user', userDataList, 60 * 60);
    }

    for (let index = 0; index < userDataList.length; index++) {
      if (userDataList[index].phone_number === phoneNumber) {
        userData = userDataList[index];
        break;
      }
    }

    return userData;
  }

  /**
   * @description 修改密码
   * @param {string} password 密码
   * @return {object} 是否成功
   * @memberof UserService
   */
  async modifyPassword(password) {
    const { service, ctx } = this;
    if (!password) {
      return {
        code: -1,
        data: '',
        message: '新密码不能为空',
      };
    }

    const jwtData = await service.common.getJWtData();

    const userInfo = await ctx.model.User.User.findByPk(jwtData.userID);
    userInfo.update({ password });
    return {
      code: 0,
      data: '',
      message: '密码修改成功',
    };
  }

  /**
   * @description 获取用户详细信息
   * @param {Number} userID 用户ID
   * @return {object} 是否成功
   * @memberof UserService
   */
  async getUserInfo(userID) {
    const { ctx } = this;
    const userInfo = await ctx.model.User.User.findOne({
      include: [
        {
          model: ctx.model.User.Jurisdiction,
        },
        {
          model: ctx.model.User.LawyerOffice,
        },
      ],
      where: {
        id: userID,
      },
    });

    const resUserInfo = {
      weixinNumber: userInfo.weixin_number,
      avatar: userInfo.avatar,
      name: userInfo.name, // 真实姓名
      sex: userInfo.sex,
      age: userInfo.age,
      phoneNumber: userInfo.phone_number,
      lawyer_number: userInfo.lawyer_number, // 律师证号
      lawyer_office_address: userInfo.lawyer_office.lawyer_office_address, // // 律师所地址
      lawyer_office_name: userInfo.lawyer_office.lawyer_office_name,
      driver_scan_Image: userInfo.driver_scan_image, // 驾驶证扫描件
    };

    return {
      code: 0,
      data: resUserInfo,
      message: '',
    };
  }

  /**
   * @description 退出登录
   * @return {object} 是否成功
   * @memberof UserService
   */
  async exit() {
    const { service } = this;
    const jwtData = await service.common.getJWtData();
    const jwtWhiteList = await service.cache.get('jwtWhiteList');

    if (jwtWhiteList.length === 0 || !jwtWhiteList) {
      return {
        code: -1,
        data: '',
        message: 'token已失效，需重新获取',
      };
    }

    const newWhiteList = [];
    for (let index = 0; index < jwtWhiteList.length; index++) {
      const jwtWhiteData = jwtWhiteList[index];
      if (jwtWhiteData.userID !== jwtData.userID) { // 如果是当前用户，则不加
        newWhiteList.push(jwtWhiteData);
      }
    }

    await service.cache.set('jwtWhiteList', newWhiteList);
    return {
      code: 0,
      data: '',
      message: '退出成功',
    };
  }
}

module.exports = UserService;
