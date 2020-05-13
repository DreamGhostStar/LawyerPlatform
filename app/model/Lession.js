'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Lession = app.model.define('lession', {
    lession_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lession_name: {
      type: STRING(255),
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  return Lession;
};
