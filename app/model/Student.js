'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Student = app.model.define('student', {
    student_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_name: {
      type: STRING(255),
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  Student.associate = function() {
    app.model.Student.belongsToMany(app.model.Lession, {
      through: app.model.LessionStudent,
      foreignKey: 'out_student_id',
      otherKey: 'out_lession_id',
    });
  };

  return Student;
};
