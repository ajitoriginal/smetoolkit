module.exports = async function (sequelize) {
  await sequelize.models.template_about.bulkCreate([
    {
      templateAboutId: 1,
      aboutTitle: 'Pitch',
      templateSubCategoryId: 1,
    },
    {
      templateAboutId: 2,
      aboutTitle: 'Layers',
      templateSubCategoryId: 1,
    },
    {
      templateAboutId: 3,
      aboutTitle: 'Evaluation Method',
      templateSubCategoryId: 1,
    },

    {
      templateAboutId: 4,
      aboutTitle: 'Material', // Material (change values) (done)
      templateSubCategoryId: 2,
    },

    /*
     * {
     *   templateAboutId: 5,
     *   aboutTitle: 'Type', // Remove type (and values)
     *   templateSubCategoryId: 4,
     * },
     */
    {
      templateAboutId: 6,
      aboutTitle: 'Access Location',
      templateSubCategoryId: 6,
    },
    {
      templateAboutId: 7,
      aboutTitle: 'Attic Evaluated By',
      templateSubCategoryId: 6,
    },
    {
      templateAboutId: 8,
      aboutTitle: 'Attic Equipment',
      templateSubCategoryId: 6,
    },
    {
      templateAboutId: 9,
      aboutTitle: 'Insulation Type',
      templateSubCategoryId: 7,
    },
    {
      templateAboutId: 10,
      aboutTitle: 'Wall Material',
      templateSubCategoryId: 11,
    },
    {
      templateAboutId: 11,
      aboutTitle: 'Ceiling Material',
      templateSubCategoryId: 11,
    },
    {
      templateAboutId: 12,
      aboutTitle: 'Floor Covering',
      templateSubCategoryId: 11,
    },
    {
      templateAboutId: 13,
      aboutTitle: 'Foundation type', // Foundation type (and about values) (done)
      templateSubCategoryId: 11, // change this (done)
    },
    {
      templateAboutId: 14,
      aboutTitle: 'Garage Type', // Garage type (done)
      templateSubCategoryId: 14,
    },

    /*
     * {
     *   templateAboutId: 15,
     *   aboutTitle: 'Inspection by', // remove (and about values) (done)
     *   templateSubCategoryId: 14,
     * },
     */
    {
      templateAboutId: 16,
      aboutTitle: 'Type of Door Operation',
      templateSubCategoryId: 14,
    },
    {
      templateAboutId: 17,
      aboutTitle: 'Door Material',
      templateSubCategoryId: 14,
    },
    // Replace Appurtenance and Material with Gas Service, electrical, Cover/Enclosure (and change values) (done)
    {
      templateAboutId: 18,
      aboutTitle: 'Gas Service', // patios
      templateSubCategoryId: 19,
    },
    {
      templateAboutId: 19,
      aboutTitle: 'Electrical', // patios
      templateSubCategoryId: 19,
    },
    {
      templateAboutId: 41,
      aboutTitle: 'Cover/Enclosure', // patios
      templateSubCategoryId: 19,
    },
    {
      templateAboutId: 20,
      aboutTitle: 'Source', // (change about values) done
      templateSubCategoryId: 31,
    },
    {
      templateAboutId: 21,
      aboutTitle: 'Heating Method', // (change about values) done
      templateSubCategoryId: 31,
    },
    {
      templateAboutId: 22,
      aboutTitle: 'Cooling Method', // (change about values) done
      templateSubCategoryId: 31,
    },
    {
      templateAboutId: 23,
      aboutTitle: 'Duck Work', // Duck  (done)
      templateSubCategoryId: 31, // change
    },

    // Panel cover removed (and about values)
    {
      templateAboutId: 42,
      aboutTitle: 'Panel cover removed', // (change about values)
      templateSubCategoryId: 36,
    },

    {
      templateAboutId: 24,
      aboutTitle: 'Panel Locations', // (change about values) (done)
      templateSubCategoryId: 36,
    },
    {
      templateAboutId: 25,
      aboutTitle: 'Panel Capacity', // (change about values) (done)
      templateSubCategoryId: 36,
    },

    /*
     * {
     *   templateAboutId: 31,
     *   aboutTitle: 'Sub Panel Location', // remove (done)
     *   templateSubCategoryId: 36,
     * },
     */
    {
      templateAboutId: 51,
      aboutTitle: 'Electrical Service', // Electrical service (done)
      templateSubCategoryId: 36,
    },
    {
      templateAboutId: 52,
      aboutTitle: 'Wiring Method', // (change about values) (done)
      templateSubCategoryId: 36,
    },
    {
      templateAboutId: 26,
      aboutTitle: 'Type', // change values (done)
      templateSubCategoryId: 49,
    },

    /*
     * {
     *   templateAboutId: 27,
     *   aboutTitle: 'Type',
     *   templateSubCategoryId: 61,
     * },
     * {
     *   templateAboutId: 28,
     *   aboutTitle: 'Cabinetry',
     *   templateSubCategoryId: 62,
     * },
     * {
     *   templateAboutId: 29,
     *   aboutTitle: 'Countertop Material',
     *   templateSubCategoryId: 62,
     * },
     */
    {
      templateAboutId: 30,
      aboutTitle: 'Type', // change values (Done)
      templateSubCategoryId: 64,
    },
    {
      templateAboutId: 43,
      aboutTitle: 'Location',
      templateSubCategoryId: 64,
    },

    // roof penetration (done)
    {
      templateAboutId: 31,
      aboutTitle: 'Roof Penetrations',
      templateSubCategoryId: 1,
    },

    // Add all plumbing (and values) (done)
    {
      templateAboutId: 32,
      aboutTitle: 'Water Source',
      templateSubCategoryId: 23,
    },
    {
      templateAboutId: 33,
      aboutTitle: 'Material',
      templateSubCategoryId: 23,
    },
    {
      templateAboutId: 34,
      aboutTitle: 'Gas Service',
      templateSubCategoryId: 23,
    },
    {
      templateAboutId: 35,
      aboutTitle: 'Water Service Size',
      templateSubCategoryId: 23,
    },
    {
      templateAboutId: 36,
      aboutTitle: 'Water Meter Location',
      templateSubCategoryId: 23,
    },
    {
      templateAboutId: 37,
      aboutTitle: 'Water Shutoff',
      templateSubCategoryId: 23,
    },
    {
      templateAboutId: 38,
      aboutTitle: 'Gas line material',
      templateSubCategoryId: 23,
    },
    {
      templateAboutId: 39,
      aboutTitle: 'Waste Pipe Material',
      templateSubCategoryId: 23,
    },
    {
      templateAboutId: 40,
      aboutTitle: 'Sanitary Cleanout Location',
      templateSubCategoryId: 23,
    },

    // 41, 42, 43 (taken)

    // add fireplace location (and values) (done)

    // Water heater about (and values) (done)
    {
      templateAboutId: 44,
      aboutTitle: 'Location',
      templateSubCategoryId: 42,
    },
    {
      templateAboutId: 45,
      aboutTitle: 'Age',
      templateSubCategoryId: 42,
    },
    {
      templateAboutId: 46,
      aboutTitle: 'Type',
      templateSubCategoryId: 42,
    },
    // Appliances about (and values) (done)

    {
      templateAboutId: 47,
      aboutTitle: 'Dryer',
      templateSubCategoryId: 69,
    },
    {
      templateAboutId: 48,
      aboutTitle: 'Oven',
      templateSubCategoryId: 69,
    },
    {
      templateAboutId: 49,
      aboutTitle: 'Stove',
      templateSubCategoryId: 69,
    },
    {
      templateAboutId: 50,
      aboutTitle: 'Water for refrigerator',
      templateSubCategoryId: 69,
    },

    // 51, 52 (taken)

    // Interior general (values) done
    {
      templateAboutId: 53,
      aboutTitle: 'Bathroom Locations',
      templateSubCategoryId: 78,
    },
    {
      templateAboutId: 54,
      aboutTitle: 'Window Type',
      templateSubCategoryId: 78,
    },

    // Detached Structure (and values) done

    {
      templateAboutId: 55,
      aboutTitle: 'Structure Type',
      templateSubCategoryId: 79,
    },
    {
      templateAboutId: 56,
      aboutTitle: 'Foundation Type',
      templateSubCategoryId: 79,
    },
    {
      templateAboutId: 57,
      aboutTitle: 'Siding Material',
      templateSubCategoryId: 79,
    },
    {
      templateAboutId: 58,
      aboutTitle: 'Roof Cover Material',
      templateSubCategoryId: 79,
    },
  ]);
};
