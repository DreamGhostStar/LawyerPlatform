'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 通过手机号获取用户基本信息
  async getUserDataByPhone(phoneNumber) {
    const { ctx } = this;
    let userData = await ctx.service.cache.get('user'); // 调用缓存

    if (!userData || userData.phone_number !== phoneNumber) { // 如果缓存中国没有用户数据或用户数据中的phone_number不一致，则重新调用数据库获取数据
      userData = await ctx.model.User.User.findOne({
        where: {
          phone_number: phoneNumber,
        },
        attributes: [ 'id', 'phone_number', 'password' ],
      });
    }
    if (userData) { // 如果该用户存在，将其调入缓存
      await this.ctx.service.cache.set('user', userData, 60 * 60);
    }

    return userData;
  }

  // 获取用户详细信息
  async getUserInfo(userID) {
    const { ctx } = this;
    const userInfo = await ctx.model.User.User.findAll({
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
      weixinNumber: userInfo[0].weixin_number,
      avatar: userInfo[0].avatar,
      name: userInfo[0].name, // 真实姓名
      sex: userInfo[0].sex,
      age: userInfo[0].age,
      phoneNumber: userInfo[0].phone_number,
      lawyer_number: userInfo[0].lawyer_number, // 律师证号
      lawyer_office_address: userInfo[0].lawyer_office.lawyer_office_address, // // 律师所地址
      lawyer_office_name: userInfo[0].lawyer_office.lawyer_office_name,
      weixin_code: 'xxx', // 微信二维码
      lawyer_scan_Image: 'xxx', // 律师证扫描件图片
      driver_scan_Image: userInfo[0].driver_scan_image, // 驾驶证扫描件
    };

    return {
      code: 0,
      data: resUserInfo,
      message: '',
    };
  }
}

module.exports = UserService;
