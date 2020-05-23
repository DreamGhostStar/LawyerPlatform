'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const LawStatus = app.model.define('law_status', {
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

  LawStatus.associate = function() {};

  return LawStatus;
};
