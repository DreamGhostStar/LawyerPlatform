'use strict';

module.exports = app => {
  const { INTEGER, STRING, DECIMAL } = app.Sequelize;
  const LawyerOffice = app.model.define('lawyer_office', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lawyer_office_address: {
      type: STRING(32),
      allowNull: false,
    },
    lawyer_office_name: {
      type: STRING(32),
      allowNull: false,
    },
    lawyer_office_scale: {
      type: DECIMAL(3, 2),
      allowNull: false,
    },
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
  });

  LawyerOffice.associate = function() {
    // app.model.Lession.belongsToMany(app.model.Student, {
    //   through: app.model.LessionStudent,
    //   foreignKey: 'lession_id',
    //   otherKey: 'student_id',
    // });
  };

  return LawyerOffice;
};
