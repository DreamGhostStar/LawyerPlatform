'use strict';

module.exports = app => {
  const { INTEGER, DECIMAL, BOOLEAN, STRING } = app.Sequelize;

  const UserSalary = app.model.define('user_salary', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DECIMAL(10, 2),
      allowNull: false,
    },
    user_id: { // 该条金额属于哪个用户
      type: INTEGER,
      allowNull: false,
    },
    user_type: { // 该条金额属于主办还是协办
      type: STRING(32),
      allowNull: false,
    },
    year: {
      type: INTEGER,
      allowNull: false,
    },
    law_id: { // 该条金额属于哪个案件
      type: INTEGER,
      allowNull: false,
    },
    is_pay: {
      type: BOOLEAN,
      allowNull: false,
    },
    scale: {
      type: DECIMAL(3, 2),
      allowNull: false,
    },
  }, {
    timestamps: false, // 关闭时间戳
    tableName: 'user_salary', // 配置表名称
  });

  UserSalary.associate = function() {
    // console.log(UserSalary);
    // 一个用户金额属于一个用户，一个用户有多个金额（一对一）
    // app.model.UserSalary.belongsTo(app.model.User, { foreignKey: 'user_id' });
  };


  return UserSalary;
};
