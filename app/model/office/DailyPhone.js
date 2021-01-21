'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const DailyPhone = app.model.define('daily_phone', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(32),
      allowNull: false,
    },
    phone_number: {
      type: STRING(32),
      allowNull: false,
    },
    unit_id: {
      type: INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  DailyPhone.associate = function() {
    // 一个联系电话包含一个单位，一个单位包含多个联系电话（一对多）
    app.model.Office.DailyPhone.belongsTo(app.model.Office.Unit, { foreignKey: 'unit_id' });
  };

  return DailyPhone;
};
