'use strict';

module.exports = app => {
  const { INTEGER, STRING, TEXT, DECIMAL } = app.Sequelize;
  const Law = app.model.define('law', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: STRING(128),
      allowNull: false,
    },
    name: {
      type: STRING(32),
      allowNull: false,
    },
    status_id: { // 案件当前状态ID
      type: INTEGER,
      allowNull: false,
    },
    base_info: { // 基本信息
      type: TEXT,
      allowNull: false,
    },
    type_id: { // 案件类型ID
      type: INTEGER,
      allowNull: false,
    },
    agency_word_id: { // 代理词ID
      type: INTEGER,
      allowNull: true,
    },
    final_report_id: { // 结案文书ID
      type: INTEGER,
      allowNull: true,
    },
    audit_user_id: {
      type: INTEGER,
      allowNull: true,
    },
    create_time: {
      type: STRING(32),
      allowNull: false,
    },
    end_time: {
      type: STRING(32),
      allowNull: true,
    },
    accuser: { // 原告
      type: STRING(32),
      allowNull: true,
    },
    defendant: {
      type: STRING(32),
      allowNull: true,
    },
    trial_level_id: { // 审级ID
      type: INTEGER,
      allowNull: true,
    },
    host_user_id: { // 主办人用户ID
      type: INTEGER,
      allowNull: true,
    },
    host_assist_scale: { // 主办人所分比例
      type: DECIMAL(3, 2),
      allowNull: true,
    },
    money: {
      type: DECIMAL(10, 2),
      allowNull: true,
    },
    remove_id: {
      type: INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  Law.associate = function() {};

  return Law;
};
