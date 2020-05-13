'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Case = app.model.define('case', {
    case_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    value: STRING(255),
  }, {
    timestamps: false, // 关闭时间戳
    tableName: 'case', // 配置表名称
  });

  Case.associate = function() {};


  return Case;
};
