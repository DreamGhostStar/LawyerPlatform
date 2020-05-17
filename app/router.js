'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/login/password', controller.user.loginInpassword);
  router.get('/api/user/getInfo', controller.user.getUserInfo);

  router.get('/api/public/verificationCode/image', controller.home.getImageVeriyCode);
};
