'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const https = require('https');
const qs = require('querystring');

class VerifyCodeService extends Service {
  // 生成图片验证码
  async generateImage() {
    const { ctx } = this;
    const captcha = svgCaptcha.create({
      size: 6,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#f00',
    });

    let res = {
      code: 0,
      data: captcha.data,
      message: '请求成功',
    };

    if (!captcha.data) {
      res = {
        code: 403,
        data: '',
        message: '请求验证图片错误',
      };
    }

    ctx.session.maxAge = 1000 * 60 * 5; // 5分钟
    ctx.session.renew = false; // 设置在连续访问的时候不刷新剩余时间
    ctx.session.imageVerifyCode = captcha.text;
    return res;
  }

  // 发送短信验证码
  // TODO: 在应用上线后将下面注释掉的部分给删去
  async sendNote(phoneNumber) {
    const { service, ctx } = this;
    const noteVerifyCode = await service.common.createNoteVerifyCode(); // 短信随机验证码
    // const apikey = '8827fe520def731402e28ae100abb679';
    // const mobile = phoneNumber; // 修改为您要发送的手机号码，多个号码用逗号隔开
    // const text = `【贵州君上杰律师事务所】您的验证码是${noteVerifyCode}，请尽快验证`; // 修改为您要发送的短信内容
    // const send_sms_uri = '/v2/sms/single_send.json'; // 智能匹配模板发送https地址

    // const result = await this.send_sms(send_sms_uri, apikey, mobile, text);

    // if (result.code === 0) {
    ctx.session.maxAge = 1000 * 60 * 5; // 5分钟
    ctx.session.renew = false; // 设置在连续访问的时候不刷新剩余时间
    const obj = {
      verifyCode: noteVerifyCode,
      phoneNumber,
    };
    ctx.session.noteVerifyCode = obj;
    return {
      code: 0,
      data: '',
      message: '发送成功',
    };
    // }
    // return {
    //   code: result.code,
    //   data: '',
    //   message: result.msg,
    // };
  }

  // 发送单条短信的配置
  async send_sms(uri, apikey, mobile, text) {
    const sms_host = 'sms.yunpian.com';
    // 这是需要提交的数据
    const post_data = {
      apikey,
      mobile,
      text,
    };
    const content = qs.stringify(post_data);
    const result = await this.post(uri, content, sms_host);
    return result;
  }

  // 发送单条短信
  async post(uri, content, host) {
    const options = {
      hostname: host,
      port: 443,
      path: uri,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };

    return new Promise(resolve => {
      const req = https.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          resolve(JSON.parse(chunk));
        });
      });
      req.write(content);

      req.end();
    });
  }
}

module.exports = VerifyCodeService;
