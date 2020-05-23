'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const LogRemove = app.model.define('log_remove', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    remove_time: {
      type: STRING(32),
      allowNull: false,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  LogRemove.associate = function() {};

  return LogRemove;
};
