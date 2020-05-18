'use strict';

module.exports = app => {
  const { INTEGER, DECIMAL } = app.Sequelize;
  const LawAssistant = app.model.define('law_assistant', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    law_id: {
      type: INTEGER,
      allowNull: false,
    },
    assist_id: { // 协办人用户ID
      type: INTEGER,
      allowNull: false,
    },
    scale: {
      type: DECIMAL(3, 2),
      allowNull: false,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  LawAssistant.associate = function() {};

  return LawAssistant;
};
