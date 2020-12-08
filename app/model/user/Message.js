'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Message = app.model.define('message', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    form_user_id: {
      type: INTEGER,
      allowNull: false,
    },
    to_user_id: {
      type: INTEGER,
      allowNull: false,
    },
    law_id: {
      type: INTEGER,
      allowNull: false,
    },
    remark: {
      type: STRING(1024),
      allowNull: true,
    },
    is_watched: { // 用户是否已阅
      type: BOOLEAN,
      allowNull: false,
    },
    is_agree: { // 用户是否同意
      type: BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'message',
    freezeTableName: true,
  });

  Message.associate = function() {
    // 一个消息有一个案件ID，一个案件ID包含多个消息（一对多）
    app.model.User.Message.belongsTo(app.model.Law.Law, { foreignKey: 'law_id' });
    
    // 一个消息有一个to_user_id，一个用户有多个消息
    app.model.User.Message.belongsTo(app.model.User.User, { foreignKey: 'form_user_id' });
  };

  return Message;
};
