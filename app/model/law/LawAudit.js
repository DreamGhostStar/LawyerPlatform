'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const LawAudit = app.model.define('law_audit', {
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

  LawAudit.associate = function() {};

  return LawAudit;
};
