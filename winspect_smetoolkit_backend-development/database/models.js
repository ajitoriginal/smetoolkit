module.exports = (sequelize) => {
  const modelDefiners = [
    require('../models/office'),
    require('../models/user'),
    require('../models/sme_user'),

    // RW
    require('../models/scheduled_order'),
    require('../models/order_inspector'),
    require('../models/order_service'),

    // Master Template
    require('../models/master_template'),

    // Service
    require('../models/service'),

    // Template
    require('../models/template'),
    require('../models/template_image'),
    require('../models/template_category'),
    require('../models/template_subcategory'),
    require('../models/template_about'),
    require('../models/template_about_value_note'),
    require('../models/template_about_value'),
    require('../models/template_remark'),
    require('../models/template_remark_image'),
    require('../models/template_remark_frequency'),
    require('../models/template_remark_similarity'),
    require('../models/architectural_type'),

    // Office/User Template
    require('../models/office_template'),
    require('../models/user_template'),
    require('../models/user_template_category'),
    require('../models/user_template_subcategory'),

    // Office Remark
    require('../models/office_included_remark'),
    require('../models/office_excluded_remark'),

    // Disclosure & Definition
    require('../models/template_disclosure'),
    require('../models/template_definition'),

    // Template Location
    require('../models/template_location'),

    // Template Subcategory Reminder
    require('../models/template_subcategory_reminder'),

    // Report
    require('../models/report'),
    require('../models/report_about_value'),

    // Win Policy
    require('../models/win_policy')
  ];

  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
  }
};
