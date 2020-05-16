'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);

  router.post('/admin', jwt, controller.admin.index);
  router.get('/login', controller.admin.login);
};
