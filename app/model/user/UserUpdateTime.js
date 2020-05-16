'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const UserUpdateTime = app.model.define('user_update_time', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    update_time: {
      type: STRING(32),
      allowNull: false,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  UserUpdateTime.associate = function() {
    // 一个用户更新时间属于一个用户，一个用户有多个用户更新时间（一对一）
    // app.model.UserUpdateTime.belongsTo(app.model.User, { foreignKey: 'user_id' });
  };

  return UserUpdateTime;
};
