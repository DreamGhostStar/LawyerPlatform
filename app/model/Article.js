'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Article = app.model.define('article', {
    article_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(255),
    case_id: INTEGER,
  }, {
    timestamps: false,
    tableName: 'article',
    freezeTableName: true,
  });

  Article.associate = function() {
    // 1对1
    app.model.Article.belongsTo(app.model.Case, { foreignKey: 'case_id' });

  };

  return Article;
};
