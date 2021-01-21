'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
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
    create_time: {
      type: STRING(32),
      allowNull: false,
      defaultValue: new Date().getTime(),
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  FinalReport.associate = function() {};

  return FinalReport;
};
