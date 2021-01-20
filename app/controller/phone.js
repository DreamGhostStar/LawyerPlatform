'use strict';

const Controller = require('egg').Controller;

class PhoneController extends Controller {
  // 增加日常电话或单位
  async add() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const { unitID, type, value, address, phone_number } = query
    if (ctx.isNull(unitID, type, value)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
    } else {
      let res = null;
      if (type === 'unit') {
        res = await service.phone.addPhone.addUnit(unitID, value, address);
      }
      if (type === 'phone') {
        res = await service.phone.addPhone.addPhone(unitID, value, phone_number);
      }
      ctx.body = res;
    }
  }

  // 删除日常电话或单位
  async remove() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const { id, type } = query
    if (ctx.isNull(type, id)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
    } else {
      let res = null;
      if (type === 'unit') {
        res = await service.phone.removePhone.removeUnit(id);
      }
      if (type === 'phone') {
        res = await service.phone.removePhone.removePhone(id);
      }
      ctx.body = res;
    }
  }

  // 修改日常电话或单位
  async alter() {
    const { ctx, service } = this;
    const query = ctx.request.body;
    const { id, type, value, address, phone_number } = query
    if (ctx.isNull(id, type, value)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
    } else {
      let res = null;
      if (type === 'unit') {
        res = await service.phone.alterPhone.aletrUnit(id, value, address);
      }
      if (type === 'phone') {
        res = await service.phone.alterPhone.aletrPhone(id, value, phone_number);
      }
      ctx.body = res;
    }
  }

  // 获取日常电话和单位
  async get() {
    const { ctx, service } = this;
    const query = ctx.query;
    const { unitID } = query
    if (ctx.isNull(unitID)) {
      ctx.status = 400;
      ctx.body = ctx.retrunInfo(-1, '', '请求参数错误');
    } else {
      const res = await service.phone.getPhone.getUnitAndPhone(unitID)
      ctx.body = res;
    }
  }
}

module.exports = PhoneController;
