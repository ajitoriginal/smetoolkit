const express = require('express');
const serviceRoutes = require('./service');
const authRoutes = require('./auth');
const templateRoutes = require('./template');
const templateCategoryRoutes = require('./template_category');
const templateSubCategoryRoutes = require('./template_subcategory');
const templateAboutRoutes = require('./template_about');
const templateAboutValueRoutes = require('./template_about_value');
const templateAboutValueNoteRoutes = require('./template_about_value_note');
const templateRemarkRoutes = require('./template_remark');
const officeRoutes = require('./office');
const architecturalTypeRoutes = require('./architectural_type');
const templateLocationRoutes = require('./template_location');
const templateSubCategoryReminderRoutes = require('./template_subcategory_reminder');
const winPolicyRoutes = require('./win_policy');

module.exports = (app) => {
  const routes = [
    {
      basePath: `${process.env.BASE_PATH}/service`,
      routes: serviceRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/auth`,
      routes: authRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/template`,
      routes: templateRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/template/categories`,
      routes: templateCategoryRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/template/sub-categories`,
      routes: templateSubCategoryRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/template/about`,
      routes: templateAboutRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/template/about-value`,
      routes: templateAboutValueRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/template/about-value/note`,
      routes: templateAboutValueNoteRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/template/remark`,
      routes: templateRemarkRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/office`,
      routes: officeRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/architectural-type`,
      routes: architecturalTypeRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/template/location`,
      routes: templateLocationRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/template/sub-categories/reminders`,
      routes: templateSubCategoryReminderRoutes,
    },
    {
      basePath: `${process.env.BASE_PATH}/policies`,
      routes: winPolicyRoutes,
    }
  ];

  for (const route of routes) {
    app.use(route.basePath, route.routes(express.Router()));
  }
};
