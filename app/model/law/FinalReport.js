'use strict';

module.exports = app => {
  const { INTEGER, STRING, TEXT } = app.Sequelize;
  const FinalReport = app.model.define('final_report', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: { // 协办人用户ID
      type: STRING(128),
      allowNull: true,
    },
    value: { // 输入的文本框内容
      type: TEXT,
      allowNull: true,
    }
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  FinalReport.associate = function() {};

  return FinalReport;
};
