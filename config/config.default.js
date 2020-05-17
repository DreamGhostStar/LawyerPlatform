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

  config.redis = { // 单个redis
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '990308myc',
      db: 0,
    },
  };

  config.sessionRedis = {
    key: 'EGG_SESSION',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  };

  // 跨域设置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '106.14.174.206',
    port: 3306,
    database: 'lawyer',
    username: 'root',
    password: '990308myc',
    timezone: '+08:00',
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
