module.exports = async function (sequelize) {
  await sequelize.models.template_subcategory.bulkCreate([
    {
      templateSubCategoryId: 1,
      name: 'Roof General',
      orderNumber: 1,
      templateCategoryId: 1,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 2,
      name: 'Cover Condition',
      orderNumber: 2,
      templateCategoryId: 1,
    },
    {
      templateSubCategoryId: 3,
      name: 'Flashing, Penetrations, Valleys & Ridges',
      orderNumber: 3,
      templateCategoryId: 1,
    },
    {
      templateSubCategoryId: 4,
      name: 'Gutters, Downspouts, Drainage',
      orderNumber: 4,
      templateCategoryId: 1,
    },
    {
      templateSubCategoryId: 5,
      name: 'Skylight(s), Chimney(s), Other Accessories',
      orderNumber: 5,
      templateCategoryId: 1,
    },
    {
      templateSubCategoryId: 6,
      name: 'Attic General',
      orderNumber: 1,
      templateCategoryId: 2,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 7,
      name: 'Insulation / Ventilation',
      orderNumber: 2,
      templateCategoryId: 2,
    },
    {
      templateSubCategoryId: 8,
      name: 'Framing / Sheathing / Evidence of Leaks',
      orderNumber: 3,
      templateCategoryId: 2,
    },
    {
      templateSubCategoryId: 9,
      name: 'Ducting/Piping',
      orderNumber: 4,
      templateCategoryId: 2,
    },
    {
      //
      templateSubCategoryId: 10,
      name: 'General',
      orderNumber: 1,
      templateCategoryId: 3,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 11,
      name: 'Wall, Ceiling, Floor',
      orderNumber: 2,
      templateCategoryId: 3,
    },
    {
      templateSubCategoryId: 12,
      name: 'Foundation',
      orderNumber: 3,
      templateCategoryId: 3,
    },
    {
      templateSubCategoryId: 13,
      name: 'Basement / Crawl Space',
      orderNumber: 4,
      templateCategoryId: 3,
    },
    {
      templateSubCategoryId: 14,
      name: 'Garage',
      orderNumber: 5,
      templateCategoryId: 3,
    },
    {
      templateSubCategoryId: 15,
      name: 'Lead / Asbestos / Mold',
      orderNumber: 6,
      templateCategoryId: 3,
    },
    {
      templateSubCategoryId: 16,
      name: 'Evidence of Pest & Insects',
      orderNumber: 7,
      templateCategoryId: 3,
    },
    {
      templateSubCategoryId: 17,
      name: 'Interior Ventillation Method',
      orderNumber: 8,
      templateCategoryId: 3,
    },
    {
      templateSubCategoryId: 18,
      name: 'Remodeling or Repairs',
      orderNumber: 9,
      templateCategoryId: 3,
    },
    {
      templateSubCategoryId: 19,
      name: 'Site Paving and Patios General',
      orderNumber: 1,
      templateCategoryId: 4,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 20,
      name: 'Surface(s), Structure',
      orderNumber: 2,
      templateCategoryId: 4,
    },
    {
      templateSubCategoryId: 21,
      name: 'Steps, Handrails, Guardrails',
      orderNumber: 3,
      templateCategoryId: 4,
    },
    {
      templateSubCategoryId: 22,
      name: 'Lighting, Weather Protected Outlets',
      orderNumber: 4,
      templateCategoryId: 4,
    },
    {
      templateSubCategoryId: 23,
      name: 'Plumbing General',
      orderNumber: 1,
      templateCategoryId: 5,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 24,
      name: 'Waste pipes', // Waste pipes
      orderNumber: 2,
      templateCategoryId: 5,
    },
    {
      templateSubCategoryId: 25,
      name: 'Evidence of Leaks',
      orderNumber: 3,
      templateCategoryId: 5,
    },
    {
      templateSubCategoryId: 26,
      name: 'Interior Water Flow',
      orderNumber: 4,
      templateCategoryId: 5,
    },
    {
      templateSubCategoryId: 27,
      name: 'Exterior Water Pressure / Flow', // comma
      orderNumber: 5,
      templateCategoryId: 5,
    },
    {
      templateSubCategoryId: 28,
      name: 'Surge Bangs / Encrustations / Mineral Deposits', // comma
      orderNumber: 6,
      templateCategoryId: 5,
    },
    {
      templateSubCategoryId: 29,
      name: 'Fixtures / Water Temperature', // comma
      orderNumber: 7,
      templateCategoryId: 5,
    },
    {
      templateSubCategoryId: 30,
      name: 'Sump Pumps, Waste Ejectors, Drainage', // change
      orderNumber: 8,
      templateCategoryId: 5,
    },
    {
      templateSubCategoryId: 31,
      name: 'HVAC General',
      orderNumber: 1,
      templateCategoryId: 6,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 32,
      name: 'System Operation / Temperature Split',
      orderNumber: 2,
      templateCategoryId: 6,
    },
    {
      templateSubCategoryId: 33,
      name: 'Condensing Coil Condition / Power Disconnect',
      orderNumber: 3,
      templateCategoryId: 6,
    },
    {
      templateSubCategoryId: 34,
      name: 'Filter Size & Condition / Service Notes',
      orderNumber: 4,
      templateCategoryId: 6,
    },
    {
      templateSubCategoryId: 35,
      name: 'Duct Work / Non-Conditioned Areas',
      orderNumber: 5,
      templateCategoryId: 6,
    },
    {
      templateSubCategoryId: 36,
      name: 'Electrical General',
      orderNumber: 1,
      templateCategoryId: 7,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 37,
      name: 'Breakers & Fuses',
      orderNumber: 2,
      templateCategoryId: 7,
    },
    {
      templateSubCategoryId: 38,
      name: 'Grounding / Bonding',
      orderNumber: 3,
      templateCategoryId: 7,
    },
    {
      templateSubCategoryId: 39,
      name: 'Outlets, Switches, Junction Boxes, Lighting',
      orderNumber: 4,
      templateCategoryId: 7,
    },
    {
      templateSubCategoryId: 40,
      name: 'G.F.C.I. & A.F.C.I.',
      orderNumber: 5,
      templateCategoryId: 7,
    },
    {
      templateSubCategoryId: 41,
      name: 'Smoke Detectors, Carbon Monoxide Detectors, other',
      orderNumber: 6,
      templateCategoryId: 7,
    },
    {
      templateSubCategoryId: 42,
      name: 'Water Heater General',
      orderNumber: 1,
      templateCategoryId: 8,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 43,
      name: 'Safety Valve, Discharge Pipe, drip pan',
      orderNumber: 2,
      templateCategoryId: 8,
    },
    {
      templateSubCategoryId: 44,
      name: 'Encrustations, Leaks',
      orderNumber: 3,
      templateCategoryId: 8,
    },
    {
      templateSubCategoryId: 45,
      name: 'Tie-downs',
      orderNumber: 4,
      templateCategoryId: 8,
    },
    {
      templateSubCategoryId: 46,
      name: 'Installation, Vents / Flues',
      orderNumber: 6,
      templateCategoryId: 8,
    },
    {
      templateSubCategoryId: 47,
      name: 'General',
      orderNumber: 1,
      templateCategoryId: 9,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 48,
      name: 'Driveways, Walkways & Steps',
      orderNumber: 2,
      templateCategoryId: 9,
    },
    {
      templateSubCategoryId: 49,
      name: 'Siding & Trim',
      orderNumber: 3,
      templateCategoryId: 9,
    },
    {
      templateSubCategoryId: 50,
      name: 'Caulk & Paint',
      orderNumber: 4,
      templateCategoryId: 9,
    },
    {
      templateSubCategoryId: 51, // Change (check remarks)
      name: 'Grading, Vegeation, & Retaining Walls',
      orderNumber: 5,
      templateCategoryId: 9,
    },

    /*
     * {
     *   templateSubCategoryId: 52, // Change (check remarks)
     *   name: 'Vegetation',
     *   orderNumber: 6,
     *   templateCategoryId: 9,
     * },
     */
    {
      templateSubCategoryId: 53,
      name: 'Eaves, Soffits & Fascia',
      orderNumber: 6,
      templateCategoryId: 9,
    },
    {
      templateSubCategoryId: 54,
      name: 'Exterior Doors',
      orderNumber: 7,
      templateCategoryId: 9,
    },
    {
      templateSubCategoryId: 55,
      name: 'Bathrooms',
      orderNumber: 2,
      templateCategoryId: 10,
    },
    {
      templateSubCategoryId: 78,
      name: 'Interior General', // attach about
      orderNumber: 1,
      templateCategoryId: 10,
    },

    /*
     * {
     *   templateSubCategoryId: 56,
     *   name: 'Kitchen', // remove
     *   orderNumber: 2,
     *   templateCategoryId: 10,
     * },
     */
    {
      templateSubCategoryId: 57,
      name: 'Laundry Room',
      orderNumber: 3,
      templateCategoryId: 10,
    },
    {
      templateSubCategoryId: 58,
      name: 'Other Rooms',
      orderNumber: 4,
      templateCategoryId: 10,
    },
    {
      templateSubCategoryId: 59,
      name: 'Bedrooms',
      orderNumber: 5,
      templateCategoryId: 10,
    },
    {
      templateSubCategoryId: 60,
      name: 'Walls, Cielings, & Doors',
      orderNumber: 6,
      templateCategoryId: 10,
    },
    {
      templateSubCategoryId: 61,
      name: 'Windows',
      orderNumber: 7,
      templateCategoryId: 10,
    },
    {
      templateSubCategoryId: 62,
      name: 'Cabinets & Countertops',
      orderNumber: 8,
      templateCategoryId: 10,
    },
    {
      templateSubCategoryId: 63,
      name: 'Stairways, handrails, guardrails',
      orderNumber: 9,
      templateCategoryId: 10,
    },
    {
      templateSubCategoryId: 64,
      name: 'General',
      orderNumber: 1,
      templateCategoryId: 11,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 65,
      name: 'Firebox',
      orderNumber: 2,
      templateCategoryId: 11,
    },
    {
      templateSubCategoryId: 66,
      name: 'Flue Condion & Dampers',
      orderNumber: 3,
      templateCategoryId: 11,
    },
    {
      templateSubCategoryId: 67,
      name: 'Insert',
      orderNumber: 4,
      templateCategoryId: 11,
    },
    {
      templateSubCategoryId: 68,
      name: 'Solid Fuel/Gas Logs/Gas Appliance',
      orderNumber: 5,
      templateCategoryId: 11,
    },
    {
      templateSubCategoryId: 69,
      name: 'General',
      orderNumber: 1,
      templateCategoryId: 12,
    },
    {
      templateSubCategoryId: 70,
      name: 'Dryer, Dryer Vent',
      orderNumber: 2,
      templateCategoryId: 12,
    },
    {
      templateSubCategoryId: 71,
      name: 'Dishwasher',
      orderNumber: 3,
      templateCategoryId: 12,
    },
    {
      templateSubCategoryId: 72,
      name: 'Garbage Disposal',
      orderNumber: 4,
      templateCategoryId: 12,
    },
    {
      templateSubCategoryId: 73,
      name: 'Microwave',
      orderNumber: 5,
      templateCategoryId: 12,
    },
    {
      templateSubCategoryId: 74,
      name: 'Oven/Range/Cooktop',
      orderNumber: 6,
      templateCategoryId: 12,
    },
    {
      templateSubCategoryId: 75,
      name: 'Refrigerator',
      orderNumber: 7,
      templateCategoryId: 12,
    },
    {
      templateSubCategoryId: 76,
      name: 'Other',
      orderNumber: 8,
      templateCategoryId: 12,
    },
    {
      templateSubCategoryId: 77,
      name: 'Washing Machine / hookup',
      orderNumber: 9,
      templateCategoryId: 12,
    },

    /*
     * taken 78
     * detached structure subcategory
     */
    {
      templateSubCategoryId: 79,
      name: 'General',
      orderNumber: 1,
      templateCategoryId: 13,
      isGeneral: 1,
    },
    {
      templateSubCategoryId: 80,
      name: 'Exterior',
      orderNumber: 2,
      templateCategoryId: 13,
    },
    {
      templateSubCategoryId: 81,
      name: 'Exterior Doors',
      orderNumber: 3,
      templateCategoryId: 13,
    },
    {
      templateSubCategoryId: 82,
      name: 'Openers & Safety Features',
      orderNumber: 4,
      templateCategoryId: 13,
    },
    {
      templateSubCategoryId: 83,
      name: 'Roof',
      orderNumber: 5,
      templateCategoryId: 13,
    },
    {
      templateSubCategoryId: 84,
      name: 'Interior',
      orderNumber: 6,
      templateCategoryId: 13,
    },
    {
      templateSubCategoryId: 85,
      name: 'HVAC',
      orderNumber: 7,
      templateCategoryId: 13,
    },
    {
      templateSubCategoryId: 86,
      name: 'Appliances',
      orderNumber: 8,
      templateCategoryId: 13,
    },
    {
      templateSubCategoryId: 87,
      name: 'Structure',
      orderNumber: 9,
      templateCategoryId: 13,
    },
    {
      templateSubCategoryId: 88,
      name: 'Electrical',
      orderNumber: 10,
      templateCategoryId: 13,
    },
    // {
    //   templateSubCategoryId: 89,
    //   name: 'Plumbing',
    //   orderNumber: 11,
    //   templateCategoryId: 13,
    // },
  ]);
};
