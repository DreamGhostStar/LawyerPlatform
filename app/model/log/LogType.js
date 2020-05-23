'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const LogType = app.model.define('log_type', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: STRING(32),
      allowNull: false,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  LogType.associate = function() {};

  return LogType;
};
