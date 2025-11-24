const { Sequelize, Model } = require('sequelize');

const TemplateRemarkSimilarity = (sequelize) => {
  /* Extending the TemplateRemarkSimilarity model from the sequilize Model class */
  class TemplateRemarkSimilarityModel extends Model {}

  /* initiating the TemplateRemarkSimilarity model schema */

  const DT = Sequelize.DataTypes;

  TemplateRemarkSimilarityModel.init(
    {
      templateRemarkSimilarityId: {
        type: DT.UUID,
        field: 'template_remark_similarity_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      nearestTemplateScore: {
        type: DT.DECIMAL(10, 2),
        field: 'nearest_template_score',
        allowNull: false,
      },
      nearestRemarkScore: {
        type: DT.DECIMAL(10, 2),
        field: 'nearest_remark_score',
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'template_remark_similarity',
      timestamps: true,
      paranoid: true,
    }
  );
};

module.exports = TemplateRemarkSimilarity;
