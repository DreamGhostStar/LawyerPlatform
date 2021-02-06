'use strict';
// 代理词

module.exports = app => {
  const { INTEGER, STRING, TEXT } = app.Sequelize;
  const AgencyWord = app.model.define('agency_word', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: { // 协办人用户ID
      type: STRING(128),
      allowNull: true,
    },
    value: {
      type: TEXT,
      allowNull: true,
    }
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  AgencyWord.associate = function() {};

  return AgencyWord;
};
