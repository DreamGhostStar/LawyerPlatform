'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const LogAlterTime = app.model.define('log_alter_time', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(32),
      allowNull: false,
    },
    modify_time: {
      type: STRING(32),
      allowNull: false,
      defaultValue: new Date().getTime(),
    },
    content: {
      type: STRING(32),
      allowNull: true,
    },
    select_time: {
      type: STRING(32),
      allowNull: true,
    },
    log_id: {
      type: INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  LogAlterTime.associate = function() {};

  return LogAlterTime;
};
