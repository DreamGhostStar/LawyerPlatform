'use strict';
// 代理词

module.exports = app => {
  const { INTEGER, TEXT, STRING } = app.Sequelize;
  const AgencyWord = app.model.define('agency_word', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: TEXT,
      allowNull: false,
    },
    url: { // 协办人用户ID
      type: STRING(128),
      allowNull: true,
    },
    create_time: {
      type: STRING(32),
      allowNull: false,
      defaultValue: new Date().getTime(),
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  AgencyWord.associate = function() {};

  return AgencyWord;
};
