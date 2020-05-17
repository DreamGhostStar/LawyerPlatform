'use strict';

const Service = require('egg').Service;

class UserService extends Service {
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
