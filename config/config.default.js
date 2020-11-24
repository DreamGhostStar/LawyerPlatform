/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589345138749_9496';

  // add your middleware config here
  config.middleware = [ 'jwtErr' ];

  config.jwtErr = {
    ignore(ctx) {
      const url = ctx.request.url;
      if (url === '/') {
        return true;
      }
      const reg = /^\/api(\/login|\/public\/verificationCode)/;

      return reg.test(url);
    },
    secret: '123456', // 自定义 token 的加密条件字符串
  };

  config.jwt = {
    secret: '123456', // 自定义 token 的加密条件字符串
  };

  // 安全设置，当post请求为/api开头的话，就运行请求，否则就必须经过csrf验证
  config.security = {
    csrf: {
      enable: true,
      ignore: '/api',
    },
    domainWhiteList: [
      '*',
    ], // 允许访问接口的白名单
  };

  // 是否允许外网访问
  config.cluster = {
    listen: {
      path: '',
      port: 7003,
      hostname: '0.0.0.0',
    },
  };

  config.multipart = {
    fileExtensions: [ '.docx', '.txt' ], // 增加对 apk 扩展名的文件支持
  };

  config.redis = { // 单个redis
    client: {
      port: 6379,
      host: '106.14.174.206',
      password: '990308myc',
      db: 0,
    },
  };

  // 跨域设置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 错误处理
  config.onerror= {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = err;
      ctx.status = 500;
    },
    html(err, ctx) {
      // html hander
      ctx.body = err;
      ctx.status = 500;
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: err };
      ctx.status = 500;
    },
    jsonp(err, ctx) {
      // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};