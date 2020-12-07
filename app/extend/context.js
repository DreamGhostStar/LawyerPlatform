'use strict';

module.exports = {
  retrunInfo(code, data, message) {
    return {
      code,
      data,
      message,
    };
  },
  isNull() { // 判断是否为空
    let res = false
    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i] === null || arguments[i] === undefined) {
        res = true
        return res
      }
    }

    return res
  },
};
