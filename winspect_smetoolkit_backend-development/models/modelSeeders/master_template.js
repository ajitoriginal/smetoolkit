module.exports = async function (sequelize) {
  await sequelize.models.master_template.bulkCreate([
    {
      masterTemplateId: 1,
      name: 'Master Full Home Inspection Template',
    },
    {
      masterTemplateId: 2,
      name: 'Sewer Scope Template',
    },
    {
      masterTemplateId: 3,
      name: 'Radon Test Template',
    },
    {
      masterTemplateId: 4,
      name: 'WDO/WDI (Pest) Inspection Template',
    },
    {
      masterTemplateId: 5,
      name: 'TREC Inspection Template',
    },
    {
      masterTemplateId: 6,
      name: '4-Point Inspection Template',
    },
    {
      masterTemplateId: 7,
      name: 'Well Flow Test Template',
    },
    {
      masterTemplateId: 8,
      name: 'Meth Test Template',
    },
    {
      masterTemplateId: 9,
      name: 'Radon-in-Water Test Template',
    },
    {
      masterTemplateId: 10,
      name: 'Draw Inspection Template',
    },
    {
      masterTemplateId: 11,
      name: 'Mold Surface Test Template',
    },
    {
      masterTemplateId: 12,
      name: 'Mold Air Test Template',
    },
    {
      masterTemplateId: 13,
      name: 'Water Quality Test Template',
    },
    {
      masterTemplateId: 14,
      name: 'Lead Test Template',
    },
    {
      masterTemplateId: 15,
      name: 'Pre-Drywall Inspection Template',
    },
    {
      masterTemplateId: 16,
      name: 'Wind Mitigation Inspection Template',
    },
    {
      masterTemplateId: 17,
      name: 'Asbestos Test Template',
    },
    {
      masterTemplateId: 18,
      name: 'Septic Inspection Template',
    },
    {
      masterTemplateId: 19,
      name: 'Air Quality Test Template',
    },
    {
      masterTemplateId: 20,
      name: 'Pool and Spa Inspection Template',
    },
    {
      masterTemplateId: 21,
      name: 'Fireplace and Chimney Inspection Test Template',
    },
    {
      masterTemplateId: 22,
      name: 'Deck Inspection Template',
    },
    {
      masterTemplateId: 23,
      name: 'Infrared (IR) Scan Template',
    },
    {
      masterTemplateId: 24,
      name: 'Home Energy Score Template',
    },
    {
      masterTemplateId: 25,
      name: 'Healthy Home Check Template',
    },
    {
      masterTemplateId: 26,
      name: 'Pre-Offer Inspection Template',
    },
    {
      masterTemplateId: 27,
      name: 'Commercial Inspection Template',
    },
    // {
    //   masterTemplateId: 28,
    //   name: 'Manufactured Home Inspection Template',
    // },
    // {
    //   masterTemplateId: 29,
    //   name: 'Mobile Home Inspection Template',
    // },
    {
      masterTemplateId: 30,
      name: 'Appliance Recall Template',
    },
    {
      masterTemplateId: 31,
      name: 'Remaining Template',
    },
    {
      masterTemplateId: 32,
      name: 'Boat Lift and Dock Inspection Template',
    },
    {
      masterTemplateId: 33,
      name: 'Construction Phase Inspection Template',
    },
    {
      masterTemplateId: 34,
      name: 'Gas Line Inspection Template',
    },
    {
      masterTemplateId: 35,
      name: 'Irrigation Inspection Template',
    },
    {
      masterTemplateId: 36,
      name: 'Home Buyer Consultation Template',
    },
    {
      masterTemplateId: 37,
      name: 'Verbal Inspection Template',
    },
    {
      masterTemplateId: 38,
      name: 'WIN360 3D Virtual Tour and 2D Floor Plan Template',
    },
    {
      masterTemplateId: 39,
      name: 'Home Seller Consultation Template',
    },
  ]);
};
