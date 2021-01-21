'use strict';

module.exports = app => {
  const { INTEGER, STRING, TEXT } = app.Sequelize;
  const ResultRequest = app.model.define('result_request', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    word_url: {
      type: STRING(128),
      allowNull: true,
    },
    value: {
      type: STRING(1024),
      allowNull: true,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  ResultRequest.associate = function() {};

  return ResultRequest;
};
