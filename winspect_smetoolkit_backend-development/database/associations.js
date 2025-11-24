module.exports = (sequelize) => {
  const {
    office,
    template,
    template_category,
    template_subcategory,
    template_about,
    template_remark,
    template_about_value,
    template_about_value_note,
    office_template,
    service,
    architectural_type,
    sme_user,
    user_template,
    user_template_category,
    user_template_subcategory,
    template_disclosure,
    template_definition,
    scheduled_order,
    order_inspector,
    order_service,
    template_location,
    template_subcategory_reminder,
    master_template,
    user,
    template_remark_frequency,
    template_remark_similarity,
    report,
    template_image,
    template_remark_image,
    office_included_remark,
    office_excluded_remark,
    report_about_value,
  } = sequelize.models;

  // Template
  template.belongsTo(sme_user, {
    foreignKey: {
      name: 'publishedBySme',
      allowNull: true,
    },
    as: 'publishedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: false,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template.hasMany(template_category, {
    foreignKey: 'templateId',
    targetKey: 'templateCategoryId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
  template_category.belongsTo(template, {
    foreignKey: {
      name: 'templateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_category.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_category.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: false,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_category.hasMany(template_subcategory, {
    foreignKey: 'templateCategoryId',
    targetKey: 'templateSubCategoryId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
  template_subcategory.belongsTo(template_category, {
    foreignKey: {
      name: 'templateCategoryId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_subcategory.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_subcategory.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: false,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_subcategory.hasMany(template_remark, {
    foreignKey: 'templateSubCategoryId',
    targetKey: 'templateRemarkId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
  template_remark.belongsTo(template_subcategory, {
    foreignKey: {
      name: 'templateSubCategoryId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: true,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_remark.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: true,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  // Template About
  template_about.belongsTo(template_subcategory, {
    foreignKey: {
      name: 'templateSubCategoryId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_about.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_about.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: false,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_subcategory.hasMany(template_about, {
    foreignKey: 'templateSubCategoryId',
    targetKey: 'templateAboutId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Template About Options
  template_about_value.belongsTo(template_about, {
    foreignKey: {
      name: 'templateAboutId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_about_value.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_about_value.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: false,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });


  template_about.hasMany(template_about_value, {
    foreignKey: {
      name: 'templateAboutId',
      allowNull: false,
    },
    targetKey: 'templateAboutValueId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Template About Value mapping with notes
  template_about_value_note.belongsTo(template_about_value, {
    foreignKey: {
      name: 'templateAboutValueId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_about_value_note.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_about_value_note.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: false,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });


  // Template About Value mapping with notes
  template_about_value.hasMany(template_about_value_note, {
    foreignKey: {
      name: 'templateAboutValueId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Office Template Mapping
  office_template.belongsTo(template, {
    foreignKey: {
      name: 'templateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  office_template.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template.hasMany(office_template, {
    foreignKey: 'templateId',
    targetKey: 'officeTemplateId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  office_template.belongsTo(office, {
    foreignKey: {
      name: 'officeId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  office.hasMany(office_template, {
    foreignKey: 'officeId',
    targetKey: 'officeTemplateId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template.belongsTo(service, {
    foreignKey: {
      name: 'serviceId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  service.hasMany(template, {
    foreignKey: 'serviceId',
    targetKey: 'templateId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Architectural Type Mapping
  architectural_type.belongsTo(template, {
    foreignKey: {
      name: 'templateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template.hasMany(architectural_type, {
    foreignKey: 'templateId',
    targetKey: 'architecturalTypeId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  architectural_type.belongsTo(template_about, {
    foreignKey: {
      name: 'templateAboutId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_about.hasOne(architectural_type, {
    foreignKey: 'templateAboutId',
    targetKey: 'architecturalTypeId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // User Template Mapping
  // user_template.belongsTo(user, {
  //   foreignKey: {
  //     name: 'userId',
  //     allowNull: false,
  //   },
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // });

  user_template.belongsTo(office_template, {
    foreignKey: {
      name: 'officeTemplateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  office_template.hasMany(user_template, {
    foreignKey: 'officeTemplateId',
    targetKey: 'userTemplateId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // User Template Category Mapping
  user_template_category.belongsTo(template_category, {
    foreignKey: {
      name: 'templateCategoryId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_category.hasOne(user_template_category, {
    foreignKey: 'templateCategoryId',
    targetKey: 'userTemplateCategoryId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  user_template_category.belongsTo(user_template, {
    foreignKey: {
      name: 'userTemplateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // User Template Sub Category Mapping
  user_template_subcategory.belongsTo(template_subcategory, {
    foreignKey: {
      name: 'templateSubCategoryId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_subcategory.hasOne(user_template_subcategory, {
    foreignKey: 'templateSubCategoryId',
    targetKey: 'userTemplateSubCategoryId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  user_template_subcategory.belongsTo(user_template_category, {
    foreignKey: {
      name: 'userTemplateCategoryId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Template Disclosure Mapping
  template_disclosure.belongsTo(template, {
    foreignKey: {
      name: 'templateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_disclosure.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_disclosure.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: false,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template.hasMany(template_disclosure, {
    foreignKey: 'templateId',
    targetKey: 'templateDisclosureId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Template Definition Mapping
  template_definition.belongsTo(template, {
    foreignKey: {
      name: 'templateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_definition.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_definition.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: false,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });


  template.hasMany(template_definition, {
    foreignKey: 'templateId',
    targetKey: 'templateDefinitionId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // REPORT WRITER ASSOCIATION
  order_inspector.belongsTo(scheduled_order, {
    foreignKey: {
      name: 'scheduledOrderId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  scheduled_order.hasMany(order_inspector, {
    foreignKey: 'scheduledOrderId',
    targetKey: 'orderInspectorId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  order_service.belongsTo(scheduled_order, {
    foreignKey: {
      name: 'scheduledOrderId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  scheduled_order.hasMany(order_service, {
    foreignKey: 'scheduledOrderId',
    targetKey: 'orderServiceId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // dummy association
  order_inspector.hasMany(order_inspector, {
    as: 'duplicateInspector',
    foreignKey: 'inspector_reference_id',
    sourceKey: 'inspectorRefId',
    constraints: false,
  });

  // dummy association
  order_service.hasMany(order_service, {
    as: 'duplicateService',
    foreignKey: 'service_reference_id',
    sourceKey: 'serviceRefId',
    constraints: false,
  });

  // Template Location Mapping
  template_location.belongsTo(template, {
    foreignKey: {
      name: 'templateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_location.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_location.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: false,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template.hasMany(template_location, {
    foreignKey: 'templateId',
    targetKey: 'templateLocationId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Template Location Mapping
  template_subcategory_reminder.belongsTo(template_subcategory, {
    foreignKey: {
      name: 'templateSubCategoryId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_subcategory_reminder.belongsTo(sme_user, {
    foreignKey: {
      name: 'createdBySme',
      allowNull: false,
    },
    as: 'createdBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_subcategory_reminder.belongsTo(sme_user, {
    foreignKey: {
      name: 'updatedBySme',
      allowNull: false,
    },
    as: 'updatedBy', // Add this alias to differentiate the association
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  template_subcategory.hasMany(template_subcategory_reminder, {
    foreignKey: 'templateSubCategoryId',
    targetKey: 'templateSubCategoryReminderId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Master Template
  template.belongsTo(master_template, {
    foreignKey: {
      name: 'masterTemplateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  master_template.hasMany(template, {
    foreignKey: 'masterTemplateId',
    targetKey: 'templateId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  service.belongsTo(master_template, {
    foreignKey: {
      name: 'masterTemplateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  master_template.hasMany(service, {
    foreignKey: 'masterTemplateId',
    targetKey: 'serviceId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Templates
  template.belongsTo(template, {
    as: 'oldTemplate',
    foreignKey: {
      name: 'oldTemplateId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  template_category.belongsTo(template_category, {
    foreignKey: {
      name: 'oldTemplateCategoryId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  template_subcategory.belongsTo(template_subcategory, {
    foreignKey: {
      name: 'oldTemplateSubCategoryId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  template_remark.belongsTo(template_remark, {
    as: 'oldTemplateRemark',
    foreignKey: {
      name: 'oldTemplateRemarkId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  template_remark.hasOne(template_remark, {
    as: 'newTemplateRemark',
    foreignKey: 'oldTemplateRemarkId',
    targetKey: 'templateRemarkId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_about.belongsTo(template_about, {
    foreignKey: {
      name: 'oldTemplateAboutId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  template_about_value.belongsTo(template_about_value, {
    foreignKey: {
      name: 'oldTemplateAboutValueId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  template_about_value_note.belongsTo(template_about_value_note, {
    foreignKey: {
      name: 'oldTemplateValueNoteId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  template_subcategory_reminder.belongsTo(template_subcategory_reminder, {
    foreignKey: {
      name: 'oldTemplateReminderId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  template_location.belongsTo(template_location, {
    foreignKey: {
      name: 'oldTemplateLocationId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  template_disclosure.belongsTo(template_disclosure, {
    foreignKey: {
      name: 'oldTemplateDisclosureId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  template_definition.belongsTo(template_definition, {
    foreignKey: {
      name: 'oldTemplateDefinitionId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  // Frequency
  template_remark.belongsTo(user, {
    foreignKey: {
      name: 'customRemarkAddedByUser',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });

  user.belongsTo(office, {
    foreignKey: {
      name: 'officeId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark_frequency.belongsTo(template_remark, {
    foreignKey: {
      name: 'templateRemarkId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark.hasMany(template_remark_frequency, {
    foreignKey: 'templateRemarkId',
    targetKey: 'templateRemarkFrequencyId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark_frequency.belongsTo(office, {
    foreignKey: {
      name: 'officeId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  office.hasMany(template_remark_frequency, {
    foreignKey: 'officeId',
    targetKey: 'templateRemarkFrequencyId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // similarity
  template_remark_similarity.belongsTo(template_remark, {
    as: 'nearestTemplateRemark',
    foreignKey: {
      name: 'nearestTemplateRemarkId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark_similarity.belongsTo(template_remark, {
    as: 'nearestRemark',
    foreignKey: {
      name: 'nearestRemarkId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark_similarity.belongsTo(template_remark, {
    foreignKey: {
      name: 'templateRemarkId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark.hasOne(template_remark_similarity, {
    foreignKey: 'templateRemarkId',
    targetKey: 'templateRemarkSimilarityId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Report

  // Report
  report.belongsTo(template, {
    foreignKey: {
      name: 'templateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template.hasOne(report, {
    foreignKey: 'templateId',
    targetKey: 'reportId',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  report.belongsTo(user, {
    foreignKey: {
      name: 'completedBy',
      allowNull: true,
    },
    as: 'completedByUser',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  report.belongsTo(order_service, {
    foreignKey: {
      name: 'orderServiceId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  order_service.hasOne(report, {
    foreignKey: 'orderServiceId',
    targetKey: 'reportId',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  // USER
  report.belongsTo(user, {
    foreignKey: {
      name: 'updatedBy',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  report.belongsTo(user, {
    foreignKey: {
      name: 'editedBy',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  report.belongsTo(user, {
    foreignKey: {
      name: 'createdBy',
      allowNull: true,
    },
    as: 'createdByUser',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  });

  service.hasMany(report, {
    foreignKey: 'serviceId',
    targetKey: 'reportId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Template Image
  template.belongsTo(template_image, {
    foreignKey: {
      name: 'templateId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark_image.belongsTo(template_image, {
    foreignKey: {
      name: 'templateImageId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_image.hasMany(template_remark_image, {
    foreignKey: 'templateImageId',
    targetKey: 'templateRemarkImageId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark_image.belongsTo(template_remark_frequency, {
    foreignKey: {
      name: 'templateRemarkFrequencyId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark_frequency.hasMany(template_remark_image, {
    foreignKey: 'templateRemarkFrequencyId',
    targetKey: 'templateRemarkImageId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  scheduled_order.belongsTo(office, {
    foreignKey: {
      name: 'officeId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  office.hasMany(scheduled_order, {
    foreignKey: 'officeId',
    targetKey: 'scheduledOrderId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // OFFICE INCLUDED
  office_included_remark.belongsTo(office, {
    foreignKey: {
      name: 'officeId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  office.hasMany(office_included_remark, {
    foreignKey: 'officeId',
    targetKey: 'officeIncludedRemarkId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  office_included_remark.belongsTo(template_remark, {
    foreignKey: {
      name: 'templateRemarkId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark.hasMany(office_included_remark, {
    foreignKey: 'templateRemarkId',
    targetKey: 'officeIncludedRemarkId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // OFFICE Excluded
  office_excluded_remark.belongsTo(office, {
    foreignKey: {
      name: 'officeId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  office.hasMany(office_excluded_remark, {
    foreignKey: 'officeId',
    targetKey: 'officeExcludedRemarkId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  office_excluded_remark.belongsTo(template_remark, {
    foreignKey: {
      name: 'templateRemarkId',
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  template_remark.hasMany(office_excluded_remark, {
    foreignKey: 'templateRemarkId',
    targetKey: 'officeExcludedRemarkId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  // Report About Value
  report_about_value.belongsTo(template_about_value, {
    foreignKey: {
      name: 'templateAboutValueId',
      allowNull: true,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  });
};
