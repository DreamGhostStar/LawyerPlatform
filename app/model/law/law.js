'use strict';

module.exports = app => {
  const { INTEGER, STRING, TEXT, DECIMAL } = app.Sequelize;
  const Law = app.model.define('law', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: STRING(128),
      allowNull: false,
    },
    name: {
      type: STRING(32),
      allowNull: false,
    },
    status_id: { // 案件当前状态ID
      type: INTEGER,
      allowNull: false,
    },
    base_info: { // 基本信息
      type: TEXT,
      allowNull: false,
    },
    type_id: { // 案件类型ID
      type: INTEGER,
      allowNull: false,
    },
    agency_word_id: { // 代理词ID
      type: INTEGER,
      allowNull: true,
    },
    final_report_id: { // 结案文书ID
      type: INTEGER,
      allowNull: true,
    },
    audit_user_id: {
      type: INTEGER,
      allowNull: true,
    },
    create_time: {
      type: STRING(32),
      allowNull: false,
    },
    end_time: {
      type: STRING(32),
      allowNull: true,
    },
    accuser: { // 原告
      type: STRING(32),
      allowNull: true,
    },
    defendant: {
      type: STRING(32),
      allowNull: true,
    },
    trial_level_id: { // 审级ID
      type: INTEGER,
      allowNull: true,
    },
    host_user_id: { // 主办人用户ID
      type: INTEGER,
      allowNull: true,
    },
    host_assist_scale: { // 主办人所分比例
      type: DECIMAL(3, 2),
      allowNull: true,
    },
    money: {
      type: DECIMAL(10, 2),
      allowNull: true,
    },
    remove_time: {
      type: STRING(32),
      allowNull: true,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  Law.associate = function() {
    // 多对多，案件通过协办人表连接用户
    app.model.Law.Law.belongsToMany(app.model.User.User, {
      through: app.model.Law.LawAssistant,
      foreignKey: 'law_id',
      otherKey: 'assist_id',
    });

    // 一对一，案件有一个代理词
    app.model.Law.Law.belongsTo(app.model.Law.AgencyWord, { foreignKey: 'agency_word_id' });

    // 一对一，案件有一个结案文书
    app.model.Law.Law.belongsTo(app.model.Law.FinalReport, { foreignKey: 'final_report_id' });

    // 一对一，案件有一个案件类型
    app.model.Law.Law.belongsTo(app.model.Law.LawType, { foreignKey: 'type_id' });

    // 一对一，案件有一个案件状态
    app.model.Law.Law.belongsTo(app.model.Law.LawStatus, { foreignKey: 'status_id' });

    // 一对一，案件有一个案件状态
    app.model.Law.Law.belongsTo(app.model.Law.LawAudit, { foreignKey: 'trial_level_id' });
  };

  return Law;
};
