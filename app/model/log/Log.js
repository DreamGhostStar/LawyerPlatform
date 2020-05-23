'use strict';

module.exports = app => {
  const { INTEGER, TEXT, STRING, BOOLEAN } = app.Sequelize;
  const Log = app.model.define('log', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    content: {
      type: TEXT,
      allowNull: false,
    },
    lawyer_id: { // 所属案件ID
      type: INTEGER,
      allowNull: true,
    },
    create_time: {
      type: STRING(32),
      allowNull: false,
      defaultValue: new Date().getTime(),
    },
    update_time: {
      type: STRING(32),
      allowNull: false,
      defaultValue: new Date().getTime(),
    },
    select_time: {
      type: STRING(32),
      allowNull: false,
      defaultValue: new Date().getTime(),
    },
    remove_id: { // 日志删除ID
      type: INTEGER,
      allowNull: true,
    },
    create_user_id: { // 创建者的userID
      type: INTEGER,
      allowNull: false,
    },
    year: {
      type: INTEGER,
      allowNull: false,
    },
    month: {
      type: INTEGER,
      allowNull: false,
    },
    date: {
      type: INTEGER,
      allowNull: false,
    },
    log_type_id: { // 日志类型ID
      type: INTEGER,
      allowNull: false,
    },
    is_alter: { // 是否可以被修改
      type: BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  Log.associate = function() {
    // 一对多，一个日志有多条修改记录
    app.model.Log.Log.hasMany(app.model.Log.LogAlterTime, { foreignKey: 'log_id' });

    // 一对一，案件有一个代理词
    app.model.Log.Log.belongsTo(app.model.Log.LogType, { foreignKey: 'log_type_id' });
  };

  return Log;
};
