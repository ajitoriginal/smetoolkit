const { Sequelize, Model } = require('sequelize');
const { models } = require('../database/index');

const TemplateSubCategory = (sequelize) => {
  /* Extending the TemplateSubCategory model from the sequilize Model class */
  class TemplateSubCategoryModel extends Model {}

  /* initiating the TemplateSubCategory model schema */

  const DT = Sequelize.DataTypes;

  TemplateSubCategoryModel.init(
    {
      templateSubCategoryId: {
        type: DT.UUID,
        field: 'template_sub_category_id',
        primaryKey: true,
        defaultValue: DT.UUIDV4,
      },
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      orderNumber: {
        type: DT.INTEGER,
        field: 'order_number',
        allowNull: false,
      },
      isGeneral: {
        type: DT.BOOLEAN,
        field: 'is_general',
        allowNull: false,
        defaultValue: 0,
      },
      print: {
        type: DT.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
      noOfCopies: {
        type: DT.INTEGER,
        field: 'no_of_copies',
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'template_subcategory',
      timestamps: true,
      paranoid: true,
    }
  );
  // Define hook for delete cascade with paranoid mode
  TemplateSubCategoryModel.addHook('beforeDestroy', async (instance, options) => {
    const abouts = await instance.getTemplate_abouts();

    const remarks = await instance.getTemplate_remarks();

    // Delete associated abouts
    if (abouts.length !== 0) await Promise.all(abouts.map((about) => about.destroy()));

    // Delete associated remarks
    if (remarks.length !== 0) await Promise.all(remarks.map((remark) => remark.destroy()));
  });

  // Define hook for delete cascade with paranoid mode
  TemplateSubCategoryModel.addHook('beforeRestore', async (instance, options) => {
    const abouts = await instance.getTemplate_abouts({ paranoid: false });

    const remarks = await instance.getTemplate_remarks({ paranoid: false });

    // Delete associated abouts
    if (abouts.length !== 0) await Promise.all(abouts.map((about) => about.restore()));

    // Delete associated remarks
    if (remarks.length !== 0) await Promise.all(remarks.map((remark) => remark.restore()));
  });
};

module.exports = TemplateSubCategory;
