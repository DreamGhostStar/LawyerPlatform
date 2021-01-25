'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  alinode: {
    enable: false,
    package: 'egg-alinode',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  io: {
    enable: false,
    package: 'egg-socket.io',
  },
  auth: {
    enable: true,
    package: 'egg-router-auth',
  },
};
