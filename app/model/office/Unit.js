'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Unit = app.model.define('unit', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lawyer_office_id: {
      type: INTEGER,
      allowNull: false,
    },
    unit_id: {
      type: INTEGER,
      allowNull: true,
    },
    name: {
      type: STRING(32),
      allowNull: false,
    },
    address: {
      type: STRING(32),
      allowNull: true,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  Unit.associate = function() {
    // 一个单位属于一个律师事务所，一个事务所包含多个单位（多对一）
    app.model.Office.Unit.belongsTo(app.model.User.LawyerOffice, { foreignKey: 'lawyer_office_id' });

    // 一个单位包含多个联系电话（一对多）
    app.model.Office.Unit.hasMany(app.model.Office.DailyPhone, { foreignKey: 'unit_id' });
  };

  return Unit;
};
