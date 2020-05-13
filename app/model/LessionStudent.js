'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const LessionStudent = app.model.define('lession_student', {
    lession_student_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    out_student_id: {
      type: INTEGER,
    },
    out_lession_id: {
      type: INTEGER,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  return LessionStudent;
};
