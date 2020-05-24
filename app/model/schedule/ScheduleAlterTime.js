'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const ScheduleAlterTime = app.model.define('schedule_alter_time', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(32),
      allowNull: false,
    },
    content: {
      type: STRING(32),
      allowNull: true,
    },
    warn_time: {
      type: STRING(32),
      allowNull: true,
    },
    modify_time: {
      type: STRING(32),
      allowNull: false,
      defaultValue: new Date().getTime(),
    },
    schedule_id: {
      type: INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  ScheduleAlterTime.associate = function() {};

  return ScheduleAlterTime;
};
