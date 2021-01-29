'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 手机号和密码登录接口
  async loginInPassword() {
    const { ctx, service } = this;
    const res = await service.login.inPassword(ctx.request.body);
    ctx.body = res;
  }

  // 手机号和短信登录接口
  async loginInNote() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const res = await service.login.inNote(query.phoneNumber, query.verification_code);
    ctx.body = res;
  }

  // 修改密码接口
  async modifyPassword() {
    const { ctx, service } = this;
    const res = await service.user.modifyPassword.modifyPassword(ctx.request.body.new_password);
    ctx.body = res;
  }

  // 退出登录
  async exit() {
    const { ctx, service } = this;
    const res = await service.login.exit();
    ctx.body = res;
  }

  // 获取用户详细信息
  async getUserInfo() {
    const { ctx, service } = this;
    const jwtData = await service.jwt.getJWtData();

    if (!jwtData) {
      ctx.body = ctx.retrunInfo(-1, '', 'token错误');
    }

    const res = await service.user.info.detailInfo(jwtData.userID);
    ctx.body = res;
  }

  // 获取用户基本信息
  async getBaseUserInfo() {
    const { ctx, service } = this;
    const query = ctx.query
    const userID = query.userID
    const jwtData = await service.jwt.getJWtData();
    if (!jwtData) {
      ctx.body = ctx.retrunInfo(-1, '', 'token错误');
    }

    const res = await service.user.info.baseInfo(userID, jwtData.userID);
    ctx.body = res;
  }

  // 修改头像
  async modifyAvatar() {
    const { ctx, service } = this;
    const res = await service.reserveUrl.modifyAvatarUrl();
    ctx.body = res;
  }

  /**
   * @api {GET} /api/user/getCardInfo 获取用户电子名片信息
   */
  async getCardInfo() {
    const { ctx, service } = this;
    const jwtData = await service.jwt.getJWtData();
    if (!jwtData) {
      ctx.body = ctx.retrunInfo(-1, '', 'token错误');
    }
    const res = await service.user.card.getInfo(jwtData.userID);
    ctx.body = res;
  }

  // 获取通知消息列表
  async getMessageList() {
    const { ctx, service } = this;
    const jwtData = await service.jwt.getJWtData();
    if (!jwtData) {
      ctx.body = ctx.retrunInfo(-1, '', 'token错误');
    }
    const res = await service.message.getList.getMessageList(jwtData.userID);
    ctx.body = res;
  }

  // 获取通知消息详情
  async getMessageDetail() {
    const { ctx, service } = this;
    const query = ctx.query
    const informID = query.informID;
    if (ctx.isNull(informID)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '参数错误')
    } else {
      const res = await service.message.getDetail.getMessageDetail(informID);
      ctx.body = res;
    }
  }

  // 修改消息的状态
  async alterMessageStatus() {
    const { ctx, service } = this;
    const query = ctx.request.body
    const { informID, isWatched } = query;
    if (ctx.isNull(informID) || ctx.isNull(isWatched)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '参数错误')
    } else {
      const res = await service.message.alterStatus.alterStatus(informID, isWatched);
      ctx.body = res;
    }
  }

  // 修改消息的状态
  async removeMessage() {
    const { ctx, service } = this;
    const query = ctx.request.body
    const { informID } = query;
    if (ctx.isNull(informID)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '参数错误')
    } else {
      const res = await service.message.removeMessage.removeMessage(informID);
      ctx.body = res;
    }
  }

  /**
   * @api {GET} /api/user/getUnitList 获取单位
   */
  async getUnit() {
    const { ctx, service } = this;
    const res = await service.user.getUnit.getUnit();
    ctx.body = res;
  }

  /**
   * @api {GET} /api/user/getPhoneNumber 获取电话
   * @apiParam {number} unit_id 单位ID
   */
  async getPhone() {
    const { ctx, service } = this;
    const query = ctx.query
    const { unit_id } = query;
    const res = await service.user.getPhone.getPhoneList(unit_id);
    ctx.body = res;
  }

  /**
   * @api {POST} /api/user/alterInfo 修改用户信息
   * @apiParam {string} name 姓名
   * @apiParam {string} sex 性别
   * @apiParam {number} phoneNumber 电话
   * @apiParam {string} [lawyer_scan_Image] 律师证扫描件url
   * @apiParam {string} [driver_scan_Image] 驾驶证扫描件url
   */
  async alterInfo() {
    const { ctx, service } = this;
    const query = ctx.request.body
    const { name, sex, phoneNumber, lawyer_scan_Image, driver_scan_Image } = query;
    const res = await service.user.alterInfo.alterUserInfo(
      name,
      sex,
      phoneNumber,
      lawyer_scan_Image,
      driver_scan_Image
    );
    ctx.body = res;
  }

  // 管理员修改用户信息
  async adminAlterUserInfo() {
    const { ctx, service } = this;
    const query = ctx.request.body
    const { userID, name, phoneNumber, lawyer_number, weixin_number } = query;
    if (ctx.isNull(userID, name, phoneNumber, lawyer_number, weixin_number)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '参数错误')
    } else {
      const res = await service.user.alterInfo.adminAlterUserInfo(
        userID,
        name,
        phoneNumber,
        lawyer_number,
        weixin_number
      );
      ctx.body = res;
    }
  }

  // 生成账号
  async addUser() {
    const { ctx, service } = this;
    const query = ctx.request.body
    const {
      identify,
      lawyerNumber,
      identifyNumber,
      name,
      avatar,
      qualificationsNumber,
      phone,
      startTime,
      age,
      sex
    } = query;
    if (ctx.isNull(identify, lawyerNumber, identifyNumber,
        name, avatar, qualificationsNumber, startTime, age, sex)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '参数错误')
    } else {
      const res = await service.user.addUser.addUser(
        identify,
        lawyerNumber,
        identifyNumber,
        name,
        avatar,
        qualificationsNumber,
        phone,
        startTime,
        age,
        sex
      );
      ctx.body = res;
    }
  }

  // 修改用户身份
  async alterUserIdentity() {
    const { ctx, service } = this;
    const query = ctx.request.body
    const { userID, identifyID } = query;
    if (ctx.isNull(userID, identifyID)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '参数错误')
    } else {
      const res = await service.user.alterInfo.alterUserIdentity(
        userID,
        identifyID
      );
      ctx.body = res;
    }
  }

  // 查找数据库中相关用户
  async getUserInDatabase() {
    const { ctx, service } = this;
    const query = ctx.query
    const { value } = query;
    if (ctx.isNull(value)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '参数错误')
    } else {
      const res = await service.user.info.getUserInDatabase(value);
      ctx.body = res;
    }
  }

  // 获取用户列表
  async getUserList() {
    const { ctx, service } = this;
    const res = await service.user.info.getUserList();
    ctx.body = res;
  }

  // 管理员获取用户详细信息
  async adminGetUserDetail() {
    const { ctx, service } = this;
    const query = ctx.query
    const { userID } = query;
    if (ctx.isNull(userID)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '参数错误')
    } else {
      const res = await service.user.info.adminGetUserDetail(parseInt(userID));
      ctx.body = res;
    }
  }

  // 管理员获取用户详细信息
  async resetPassword() {
    const { ctx, service } = this;
    const query = ctx.request.body
    const { userID, password } = query;
    if (ctx.isNull(userID, password)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '参数错误')
    } else {
      const res = await service.user.alterInfo.resetPassword(parseInt(userID), password);
      ctx.body = res;
    }
  }
}

module.exports = UserController;
