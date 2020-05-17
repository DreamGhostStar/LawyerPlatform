'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jurisdiction_id: {
      type: INTEGER,
      allowNull: false,
    },
    age: {
      type: INTEGER,
      allowNull: false,
    },
    sex: {
      type: STRING(32),
      allowNull: false,
    },
    password: {
      type: STRING(128),
      allowNull: false,
    },
    weixin_number: {
      type: STRING(32),
      allowNull: true,
    },
    phone_number: {
      type: STRING(32),
      allowNull: true,
    },
    name: { // 真实姓名
      type: STRING(32),
      allowNull: true,
    },
    lawyer_number: { // 律师号
      type: STRING(32),
      allowNull: true,
    },
    avatar: { // 头像
      type: STRING(128),
      allowNull: true,
    },
    driver_scan_image: { // 驾驶证扫描件
      type: STRING(32),
      allowNull: true,
    },
    lawyer_office_id: { // 所属律师事务所ID
      type: INTEGER,
      allowNull: true,
    },
    update_time: {
      type: STRING(32),
      allowNull: true,
    },
    create_time: {
      type: STRING(32),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'user',
    freezeTableName: true,
  });

  User.associate = function() {
    // 一个用户包含一个权限，一个权限包含多个用户（一对多）
    app.model.User.User.belongsTo(app.model.User.Jurisdiction, { foreignKey: 'jurisdiction_id' });

    // 一个用户属于一个律师事务所，一个事务所包含多个用户（一对多）
    app.model.User.User.belongsTo(app.model.User.LawyerOffice, { foreignKey: 'lawyer_office_id' });

    // 一个用户有多个金额（一对多）
    // app.model.User.User.hasMany(app.model.User.UserSalary, { foreignKey: 'user_id' });
    app.model.User.User.belongsToMany(app.model.Law.Law, {
      through: app.model.User.UserSalary,
      foreignKey: 'user_id',
      otherKey: 'law_id',
    });
  };

  return User;
};
