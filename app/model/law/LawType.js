'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const LawType = app.model.define('law_type', {
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

  LawType.associate = function() {};

  return LawType;
};
