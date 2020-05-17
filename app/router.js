'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const verifyPhoneNumber = middleware.verifyPhoneNumber(); // 验证手机号的中间件
  const imageVerifyCode = middleware.imageVerifyCode(); // 验证图片验证码正确性的中间件
  // const noteVerifyCode = middleware.noteVerifyCode(); // 验证短信验证码正确性的中间件

  router.get('/', controller.home.index);
  router.post('/api/login/password', imageVerifyCode, verifyPhoneNumber, controller.user.loginInpassword);
  router.get('/api/user/getInfo', controller.user.getUserInfo);

  router.get('/api/public/verificationCode/image', controller.home.getImageVeriyCode);
  router.post('/api/public/verificationCode/note', verifyPhoneNumber, controller.home.getNoteVerifyCode);
};
