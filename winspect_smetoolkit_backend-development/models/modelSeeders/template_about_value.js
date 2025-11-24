module.exports = async function (sequelize) {
  await sequelize.models.template_about_value.bulkCreate([
    {
      templateAboutValueId: 1,
      value: 'Pitched',
      templateAboutId: 1,
    },
    {
      templateAboutValueId: 2,
      value: 'Low Pitch',
      templateAboutId: 1,
    },
    {
      templateAboutValueId: 3,
      value: 'Pitched & Low Pitched',
      templateAboutId: 1,
    },
    {
      templateAboutValueId: 4,
      value: 'Flat',
      templateAboutId: 1,
    },
    {
      templateAboutValueId: 5,
      value: 'Flat & Low Pitched',
      templateAboutId: 1,
    },
    {
      templateAboutValueId: 6,
      value: 'Flat & Pitched',
      templateAboutId: 1,
    },
    {
      templateAboutValueId: 7,
      value: 'Parapet',
      templateAboutId: 1,
    },
    {
      templateAboutValueId: 8,
      value: '1 Layer',
      templateAboutId: 2,
    },
    {
      templateAboutValueId: 9,
      value: '2 Layers',
      templateAboutId: 2,
    },
    {
      templateAboutValueId: 10,
      value: '3 Layers',
      templateAboutId: 2,
    },
    {
      templateAboutValueId: 11,
      value: 'Multiple Layers',
      templateAboutId: 2,
    },
    {
      templateAboutValueId: 12,
      value: 'Not Visible',
      templateAboutId: 2,
    },
    {
      templateAboutValueId: 13,
      value: 'Walk Surface',
      templateAboutId: 3,
    },
    {
      templateAboutValueId: 14,
      value: 'Drone',
      templateAboutId: 3,
    },
    {
      templateAboutValueId: 15,
      value: 'Ground',
      templateAboutId: 3,
    },
    {
      templateAboutValueId: 16,
      value: 'Roof Edge',
      templateAboutId: 3,
    },
    {
      templateAboutValueId: 17,
      value: 'Combination',
      templateAboutId: 3,
    },
    {
      templateAboutValueId: 18,
      value: 'Composition Shingle',
      templateAboutId: 4,
    },
    {
      templateAboutValueId: 19,
      value: 'Wood Shake/Shingle',
      templateAboutId: 4,
    },
    {
      templateAboutValueId: 20,
      value: 'Slate',
      templateAboutId: 4,
    },
    {
      templateAboutValueId: 21,
      value: 'Metal',
      templateAboutId: 4,
    },
    {
      templateAboutValueId: 22,
      value: 'Tile',
      templateAboutId: 4,
    },
    {
      templateAboutValueId: 23,
      value: 'EDPM',
      templateAboutId: 4,
    },
    {
      templateAboutValueId: 24,
      value: 'Synthetic',
      templateAboutId: 4,
    },
    {
      templateAboutValueId: 25,
      value: 'Rolled Roofing',
      templateAboutId: 4,
    },

    /*
     * {
     *   templateAboutValueId: 26,
     *   value: 'Vinyl',
     *   templateAboutId: 5,
     * },
     * {
     *   templateAboutValueId: 27,
     *   value: 'Aluminum',
     *   templateAboutId: 5,
     * },
     * {
     *   templateAboutValueId: 28,
     *   value: 'Copper',
     *   templateAboutId: 5,
     * },
     * {
     *   templateAboutValueId: 29,
     *   value: 'Integral Gutters',
     *   templateAboutId: 5,
     * },
     */
    {
      templateAboutValueId: 30,
      value: 'Second Floor',
      templateAboutId: 6,
    },
    {
      templateAboutValueId: 31,
      value: 'Primary Bedroom',
      templateAboutId: 6,
    },
    {
      templateAboutValueId: 32,
      value: 'Garage',
      templateAboutId: 6,
    },
    {
      templateAboutValueId: 33,
      value: 'Main Hall',
      templateAboutId: 6,
    },
    {
      templateAboutValueId: 34,
      value: 'Main Floor',
      templateAboutId: 6,
    },
    {
      templateAboutValueId: 35,
      value: 'Second Bedroom',
      templateAboutId: 6,
    },
    {
      templateAboutValueId: 36,
      value: 'Third bedroom',
      templateAboutId: 6,
    },
    {
      templateAboutValueId: 37,
      value: 'Fourth Bedroom',
      templateAboutId: 6,
    },
    {
      templateAboutValueId: 38,
      value: 'None Visible',
      templateAboutId: 6,
    },
    {
      templateAboutValueId: 39,
      value: 'NA - Vaulted Ceilings',
      templateAboutId: 6,
    },
    {
      templateAboutValueId: 40,
      value: 'Entrance',
      templateAboutId: 7,
    },
    {
      templateAboutValueId: 41,
      value: 'Head & Shoulder',
      templateAboutId: 7,
    },
    {
      templateAboutValueId: 42,
      value: 'Partial Entrance',
      templateAboutId: 7,
    },
    {
      templateAboutValueId: 43,
      value: 'Not Accessible',
      templateAboutId: 7,
    },
    {
      templateAboutValueId: 44,
      value: 'Ladder',
      templateAboutId: 8,
    },
    {
      templateAboutValueId: 45,
      value: 'HVAC',
      templateAboutId: 8,
    },
    {
      templateAboutValueId: 46,
      value: 'Water Heater',
      templateAboutId: 8,
    },
    {
      templateAboutValueId: 47,
      value: 'Cat walk',
      templateAboutId: 8,
    },
    {
      templateAboutValueId: 48,
      value: 'Light',
      templateAboutId: 8,
    },
    {
      templateAboutValueId: 49,
      value: 'Batt',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 50,
      value: 'Blown',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 51,
      value: 'Cellulose',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 52,
      value: 'Fiberglass',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 53,
      value: 'Foam-board',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 54,
      value: 'Foiled-faced',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 55,
      value: 'Loose-fill',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 56,
      value: 'Mineral Wool',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 57,
      value: 'None',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 58,
      value: 'Spray Foam',
      templateAboutId: 9,
      //  templateAboutValueNoteId: 1,
    },
    {
      templateAboutValueId: 59,
      value: 'Vermiculite',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 60,
      value: 'Unknown',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 61,
      value: 'Vaulted Ceilings',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 62,
      value: 'Sealed',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 63,
      value: 'N/A - Vaulted Ceilings',
      templateAboutId: 9,
    },
    {
      templateAboutValueId: 64,
      value: 'Brick',
      templateAboutId: 10,
    },
    {
      templateAboutValueId: 65,
      value: 'Compressed Board',
      templateAboutId: 10,
    },
    {
      templateAboutValueId: 66,
      value: 'Drywall',
      templateAboutId: 10,
    },
    {
      templateAboutValueId: 67,
      value: 'Gypsum Board',
      templateAboutId: 10,
    },
    {
      templateAboutValueId: 68,
      value: 'Paneling',
      templateAboutId: 10,
    },
    {
      templateAboutValueId: 69,
      value: 'Plaster',
      templateAboutId: 10,
    },
    {
      templateAboutValueId: 70,
      value: 'Tile',
      templateAboutId: 10,
    },
    {
      templateAboutValueId: 71,
      value: 'Unfinished',
      templateAboutId: 10,
    },
    {
      templateAboutValueId: 72,
      value: 'Wallpaper',
      templateAboutId: 10,
    },
    {
      templateAboutValueId: 73,
      value: 'Wood',
      templateAboutId: 10,
    },
    {
      templateAboutValueId: 320,
      value: 'Ceiling Tiles',
      templateAboutId: 11,
    },
    {
      templateAboutValueId: 74,
      value: 'Compressed Board',
      templateAboutId: 11,
    },
    {
      templateAboutValueId: 75,
      value: 'Gypsum Board',
      templateAboutId: 11,
    },
    {
      templateAboutValueId: 76,
      value: 'Plaster',
      templateAboutId: 11,
    },
    {
      templateAboutValueId: 77,
      value: 'Popcorn',
      templateAboutId: 11,
    },
    {
      templateAboutValueId: 78,
      value: 'Suspended Ceiling Panels',
      templateAboutId: 11,
    },
    {
      templateAboutValueId: 79,
      value: 'Unfinished',
      templateAboutId: 11,
    },
    {
      templateAboutValueId: 80,
      value: 'Wallpaper',
      templateAboutId: 11,
    },
    {
      templateAboutValueId: 81,
      value: 'Wood',
      templateAboutId: 11,
    },
    {
      templateAboutValueId: 82,
      value: 'Bamboo',
      templateAboutId: 12,
    },
    {
      templateAboutValueId: 83,
      value: 'Brick',
      templateAboutId: 12,
    },
    {
      templateAboutValueId: 84,
      value: 'Carpet',
      templateAboutId: 12,
    },
    {
      templateAboutValueId: 85,
      value: 'Concrete',
      templateAboutId: 12,
    },
    {
      templateAboutValueId: 86,
      value: 'Engineered Wood',
      templateAboutId: 12,
    },
    {
      templateAboutValueId: 87,
      value: 'Hardwood',
      templateAboutId: 12,
    },
    {
      templateAboutValueId: 88,
      value: 'Laminate',
      templateAboutId: 12,
    },
    {
      templateAboutValueId: 89,
      value: 'Linoleum',
      templateAboutId: 12,
    },
    {
      templateAboutValueId: 90,
      value: 'Tile',
      templateAboutId: 12,
    },
    {
      templateAboutValueId: 91,
      value: 'Vinyl',
      templateAboutId: 12,
    },
    {
      templateAboutValueId: 92,
      value: 'Concrete',
      templateAboutId: 13,
    },
    {
      templateAboutValueId: 93,
      value: 'Masonry Block',
      templateAboutId: 13,
    },
    {
      templateAboutValueId: 94,
      value: 'Brick',
      templateAboutId: 13,
    },
    {
      templateAboutValueId: 95,
      value: 'Stone',
      templateAboutId: 13,
    },
    {
      templateAboutValueId: 96,
      value: 'Rock',
      templateAboutId: 13,
    },
    {
      templateAboutValueId: 97,
      value: 'Other',
      templateAboutId: 13,
    },
    {
      templateAboutValueId: 101,
      value: 'slab',
      templateAboutId: 13,
    },
    {
      templateAboutValueId: 98,
      value: 'Attached',
      templateAboutId: 14,
    },
    {
      templateAboutValueId: 99,
      value: 'Detached',
      templateAboutId: 14,
    },
    {
      templateAboutValueId: 100,
      value: 'Carpot',
      templateAboutId: 14,
    },

    /*
     * {
     *   templateAboutValueId: 101,
     *   value: 'Ground',
     *   templateAboutId: 15,
     * },
     * {
     *   templateAboutValueId: 102,
     *   value: 'Ladder',
     *   templateAboutId: 15,
     * },
     * {
     *   templateAboutValueId: 103,
     *   value: 'Roof',
     *   templateAboutId: 15,
     * },
     * {
     *   templateAboutValueId: 104,
     *   value: 'Drone',
     *   templateAboutId: 15,
     * },
     */
    {
      templateAboutValueId: 105,
      value: 'Manual',
      templateAboutId: 16,
    },
    {
      templateAboutValueId: 106,
      value: 'Opener',
      templateAboutId: 16,
    },
    {
      templateAboutValueId: 107,
      value: 'Sliding',
      templateAboutId: 16,
    },
    {
      templateAboutValueId: 108,
      value: 'Metal',
      templateAboutId: 17,
    },
    {
      templateAboutValueId: 109,
      value: 'Insulated',
      templateAboutId: 17,
    },
    {
      templateAboutValueId: 110,
      value: 'Non-insulated',
      templateAboutId: 17,
    },
    {
      templateAboutValueId: 111,
      value: 'Steel',
      templateAboutId: 17,
    },
    {
      templateAboutValueId: 112,
      value: 'Aluminum',
      templateAboutId: 17,
    },
    {
      templateAboutValueId: 113,
      value: 'Wood',
      templateAboutId: 17,
    },
    {
      templateAboutValueId: 114,
      value: 'Wood Composite',
      templateAboutId: 17,
    },
    {
      templateAboutValueId: 115,
      value: 'Fiberglass',
      templateAboutId: 17,
    },
    {
      templateAboutValueId: 116,
      value: 'Vinyl',
      templateAboutId: 17,
    },
    {
      templateAboutValueId: 117,
      value: 'Glass',
      templateAboutId: 17,
    },
    {
      templateAboutValueId: 118,
      value: 'Yes',
      templateAboutId: 18,
    },
    {
      templateAboutValueId: 119,
      value: 'No',
      templateAboutId: 18,
    },
    {
      templateAboutValueId: 120,
      value: 'Yes',
      templateAboutId: 19,
    },
    {
      templateAboutValueId: 121,
      value: 'No',
      templateAboutId: 19,
    },
    {
      templateAboutValueId: 122,
      value: 'Yes',
      templateAboutId: 41,
    },
    {
      templateAboutValueId: 123,
      value: 'No',
      templateAboutId: 41,
    },
    {
      templateAboutValueId: 124,
      value: 'porch roof',
      templateAboutId: 41,
    },
    {
      templateAboutValueId: 125,
      value: 'three season room',
      templateAboutId: 41,
    },

    /*
     * {
     *   templateAboutValueId: 118,
     *   value: 'Front Porch',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 119,
     *   value: 'Deck',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 120,
     *   value: 'Covered Porch',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 121,
     *   value: 'Retaining Wall',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 122,
     *   value: 'Deck with Steps',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 123,
     *   value: 'Hot Tub',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 124,
     *   value: 'Patio',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 125,
     *   value: 'Sidewalk',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 126,
     *   value: 'Sunroom',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 127,
     *   value: 'Pool',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 128,
     *   value: 'Balcony',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 129,
     *   value: 'Shed',
     *   templateAboutId: 18,
     * },
     * {
     *   templateAboutValueId: 130,
     *   value: 'Composite',
     *   templateAboutId: 19,
     * },
     * {
     *   templateAboutValueId: 131,
     *   value: 'Concrete',
     *   templateAboutId: 19,
     * },
     * {
     *   templateAboutValueId: 132,
     *   value: 'Wood',
     *   templateAboutId: 19,
     * },
     */
    {
      templateAboutValueId: 133,
      value: 'Gas',
      templateAboutId: 20,
    },
    {
      templateAboutValueId: 134,
      value: 'Oil',
      templateAboutId: 20,
    },

    /*
     * {
     *   templateAboutValueId: 135,
     *   value: 'Heat Pump',
     *   templateAboutId: 20,
     * },
     */
    {
      templateAboutValueId: 136,
      value: 'Electric',
      templateAboutId: 20,
    },

    /*
     * {
     *   templateAboutValueId: 137,
     *   value: 'Propane',
     *   templateAboutId: 20,
     * },
     * {
     *   templateAboutValueId: 138,
     *   value: 'Solar',
     *   templateAboutId: 20,
     * },
     * {
     *   templateAboutValueId: 139,
     *   value: 'Wood',
     *   templateAboutId: 20,
     * },
     * {
     *   templateAboutValueId: 140,
     *   value: 'Coal',
     *   templateAboutId: 20,
     * },
     */
    {
      templateAboutValueId: 141,
      value: 'Radiant Heat',
      templateAboutId: 21,
    },
    {
      templateAboutValueId: 142,
      value: 'Heat Pump',
      templateAboutId: 21,
    },
    {
      templateAboutValueId: 143,
      value: 'Electric Baseboard',
      templateAboutId: 21,
    },
    {
      templateAboutValueId: 144,
      value: 'Electric Wall Heater',
      templateAboutId: 21,
    },
    {
      templateAboutValueId: 145,
      value: 'Steam Boiler',
      templateAboutId: 21,
    },
    {
      templateAboutValueId: 146,
      value: 'Forced Air',
      templateAboutId: 21,
    },

    /*
     * {
     *   templateAboutValueId: 147,
     *   value: 'Space Heater',
     *   templateAboutId: 21,
     * },
     * {
     *   templateAboutValueId: 148,
     *   value: 'Gas-Fired Heat',
     *   templateAboutId: 21,
     * },
     */
    {
      templateAboutValueId: 149,
      value: 'Hydronic',
      templateAboutId: 21,
    },
    {
      templateAboutValueId: 150,
      value: 'Geothermal',
      templateAboutId: 21,
    },

    /*
     * {
     *   templateAboutValueId: 151,
     *   value: 'Electric',
     *   templateAboutId: 22,
     * },
     * {
     *   templateAboutValueId: 152,
     *   value: 'Ceiling Fan',
     *   templateAboutId: 22,
     * },
     * {
     *   templateAboutValueId: 153,
     *   value: 'Gas',
     *   templateAboutId: 22,
     * },
     * {
     *   templateAboutValueId: 154,
     *   value: 'Whole House Fan',
     *   templateAboutId: 22,
     * },
     * {
     *   templateAboutValueId: 155,
     *   value: 'Window AC',
     *   templateAboutId: 22,
     * },
     */
    {
      templateAboutValueId: 156,
      value: 'Heat Pump',
      templateAboutId: 22,
    },
    {
      templateAboutValueId: 157,
      value: 'Central Air Conditioner',
      templateAboutId: 22,
    },
    {
      templateAboutValueId: 158,
      value: 'Swamp Cooler',
      templateAboutId: 22,
    },

    /*
     * {
     *   templateAboutValueId: 159,
     *   value: 'Oil',
     *   templateAboutId: 22,
     * },
     * {
     *   templateAboutValueId: 160,
     *   value: 'Attic Fan',
     *   templateAboutId: 22,
     * },
     */
    {
      templateAboutValueId: 161,
      value: 'Insulated',
      templateAboutId: 23,
    },
    {
      templateAboutValueId: 162,
      value: 'Non-insulated',
      templateAboutId: 23,
    },
    {
      templateAboutValueId: 159,
      value: 'Yes',
      templateAboutId: 42,
    },
    {
      templateAboutValueId: 160,
      value: 'No',
      templateAboutId: 42,
    },
    {
      templateAboutValueId: 163,
      value: 'Exterior',
      templateAboutId: 24,
    },
    {
      templateAboutValueId: 164,
      value: 'Garage',
      templateAboutId: 24,
    },
    {
      templateAboutValueId: 165,
      value: 'Basement',
      templateAboutId: 24,
    },
    {
      templateAboutValueId: 166,
      value: 'Utlity Room',
      templateAboutId: 24,
    },
    {
      templateAboutValueId: 167,
      value: 'Laundry Room',
      templateAboutId: 24,
    },
    {
      templateAboutValueId: 287,
      value: 'Multiple Locations',
      templateAboutId: 24,
    },
    {
      templateAboutValueId: 288,
      value: 'Bedroom',
      templateAboutId: 24,
    },
    {
      templateAboutValueId: 289,
      value: 'Other',
      templateAboutId: 24,
    },

    /*
     * {
     *   templateAboutValueId: 168,
     *   value: 'Exterior',
     *   templateAboutId: 31,
     * },
     * {
     *   templateAboutValueId: 169,
     *   value: 'Garage',
     *   templateAboutId: 31,
     * },
     * {
     *   templateAboutValueId: 170,
     *   value: 'Second Floor',
     *   templateAboutId: 31,
     * },
     * {
     *   templateAboutValueId: 171,
     *   value: 'Laundry room',
     *   templateAboutId: 31,
     * },
     * {
     *   templateAboutValueId: 172,
     *   value: 'Main floor',
     *   templateAboutId: 31,
     * },
     * {
     *   templateAboutValueId: 173,
     *   value: 'Utility Room',
     *   templateAboutId: 31,
     * },
     */
    {
      templateAboutValueId: 174,
      value: 'Overhead',
      templateAboutId: 51,
    },
    {
      templateAboutValueId: 175,
      value: 'Underground',
      templateAboutId: 51,
    },
    {
      templateAboutValueId: 176,
      value: '60 amps',
      templateAboutId: 25,
    },
    {
      templateAboutValueId: 177,
      value: '100 amps',
      templateAboutId: 25,
    },
    {
      templateAboutValueId: 290,
      value: '150 amps',
      templateAboutId: 25,
    },
    {
      templateAboutValueId: 178,
      value: '200 amps',
      templateAboutId: 25,
    },
    {
      templateAboutValueId: 179,
      value: 'Conduit',
      templateAboutId: 52,
    },
    {
      templateAboutValueId: 180,
      value: 'BX Armored Cable',
      templateAboutId: 52,
    },
    {
      templateAboutValueId: 181,
      value: 'Non-metallic Sheathed (romex)',
      templateAboutId: 52,
    },
    {
      templateAboutValueId: 182,
      value: 'Knob and Tube',
      templateAboutId: 52,
    },
    {
      templateAboutValueId: 183,
      value: 'Combination',
      templateAboutId: 52,
    },
    {
      templateAboutValueId: 291,
      value: 'Other',
      templateAboutId: 52,
    },
    {
      templateAboutValueId: 184,
      value: 'Various Materials',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 185,
      value: 'Brick',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 186,
      value: 'Stucco',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 187,
      value: 'Vinyl',
      templateAboutId: 26,
    },

    /*
     * {
     *   templateAboutValueId: 188,
     *   value: 'Stone Veneer', //
     *   templateAboutId: 26,
     * },
     */
    {
      templateAboutValueId: 189,
      value: 'Masonry',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 190,
      value: 'Stone',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 191,
      value: 'Wood',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 192,
      value: 'Aluminum',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 193,
      value: 'Asbestos',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 194,
      value: 'Asphalt',
      templateAboutId: 26,
    },

    /*
     * {
     *   templateAboutValueId: 195,
     *   value: 'Concrete', //
     *   templateAboutId: 26,
     * },
     */
    {
      templateAboutValueId: 196,
      value: 'Engineered Wood',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 197,
      value: 'Fiber Cement',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 198,
      value: 'Logs',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 199,
      value: 'Metal',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 200,
      value: 'Plastic',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 201,
      value: 'Shingles',
      templateAboutId: 26,
    },
    {
      templateAboutValueId: 202,
      value: 'Masonry Veneer',
      templateAboutId: 26,
    },

    /*
     * {
     *   templateAboutValueId: 203,
     *   value: 'Casement',
     *   templateAboutId: 27,
     * },
     * {
     *   templateAboutValueId: 204,
     *   value: 'Double-hung',
     *   templateAboutId: 27,
     * },
     * {
     *   templateAboutValueId: 205,
     *   value: 'Drop-down',
     *   templateAboutId: 27,
     * },
     * {
     *   templateAboutValueId: 206,
     *   value: 'Single Pane',
     *   templateAboutId: 27,
     * },
     * {
     *   templateAboutValueId: 207,
     *   value: 'Single-hung',
     *   templateAboutId: 27,
     * },
     * {
     *   templateAboutValueId: 208,
     *   value: 'Sliders',
     *   templateAboutId: 27,
     * },
     * {
     *   templateAboutValueId: 209,
     *   value: 'Storm',
     *   templateAboutId: 27,
     * },
     * {
     *   templateAboutValueId: 210,
     *   value: 'Thermal',
     *   templateAboutId: 27,
     * },
     * {
     *   templateAboutValueId: 211,
     *   value: 'Laminate',
     *   templateAboutId: 28,
     * },
     * {
     *   templateAboutValueId: 212,
     *   value: 'Metal',
     *   templateAboutId: 28,
     * },
     * {
     *   templateAboutValueId: 213,
     *   value: 'Plastic',
     *   templateAboutId: 28,
     * },
     * {
     *   templateAboutValueId: 214,
     *   value: 'Wood',
     *   templateAboutId: 28,
     * },
     * {
     *   templateAboutValueId: 215,
     *   value: 'Composite',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 216,
     *   value: 'Concrete',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 217,
     *   value: 'Corian',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 218,
     *   value: 'Granite',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 219,
     *   value: 'Laminate',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 220,
     *   value: 'Marble',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 221,
     *   value: 'Metal',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 222,
     *   value: 'Porcelain',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 223,
     *   value: 'Quartz',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 224,
     *   value: 'Recycled Glass',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 225,
     *   value: 'Stainless Steel',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 226,
     *   value: 'Tile',
     *   templateAboutId: 29,
     * },
     * {
     *   templateAboutValueId: 227,
     *   value: 'Wood Butcher Block',
     *   templateAboutId: 29,
     * },
     */
    {
      templateAboutValueId: 228,
      value: 'Masonry',
      templateAboutId: 30,
      /// /  templateAboutValueNoteId: 5,
    },
    {
      templateAboutValueId: 229,
      value: 'Factory',
      templateAboutId: 30,
      /// /  templateAboutValueNoteId: 5,
    },
    {
      templateAboutValueId: 230,
      value: 'Gas Log',
      templateAboutId: 30,
      /// /  templateAboutValueNoteId: 5,
    },
    {
      templateAboutValueId: 231,
      value: 'Insert',
      templateAboutId: 30,
      /// /  templateAboutValueNoteId: 5,
    },
    {
      templateAboutValueId: 232,
      value: 'Pellet Stove',
      templateAboutId: 30,
      //  templateAboutValueNoteId: 5,
    },
    {
      templateAboutValueId: 233,
      value: 'Wood Stove',
      templateAboutId: 30,
      //  templateAboutValueNoteId: 5,
    },
    {
      templateAboutValueId: 292,
      value: 'Living room',
      templateAboutId: 43,
    },
    {
      templateAboutValueId: 293,
      value: 'family room',
      templateAboutId: 43,
    },
    {
      templateAboutValueId: 294,
      value: 'bedroom',
      templateAboutId: 43,
    },
    {
      templateAboutValueId: 295,
      value: 'basement',
      templateAboutId: 43,
    },
    {
      templateAboutValueId: 296,
      value: 'four season room',
      templateAboutId: 43,
    },
    {
      templateAboutValueId: 234,
      value: 'Skylights',
      templateAboutId: 31,
    },
    {
      templateAboutValueId: 235,
      value: 'Chimneys',
      templateAboutId: 31,
    },

    {
      templateAboutValueId: 236,
      value: 'Private',
      templateAboutId: 32,
      //  templateAboutValueNoteId: 2,
    },
    {
      templateAboutValueId: 237,
      value: 'Public',
      templateAboutId: 32,
      //  templateAboutValueNoteId: 2,
    },

    {
      templateAboutValueId: 238,
      value: 'Copper',
      templateAboutId: 33,
    },
    {
      templateAboutValueId: 239,
      value: 'Galvanized Steel',
      templateAboutId: 33,
    },
    {
      templateAboutValueId: 240,
      value: 'Pex',
      templateAboutId: 33,
    },
    {
      templateAboutValueId: 241,
      value: 'CPVC',
      templateAboutId: 33,
    },
    {
      templateAboutValueId: 242,
      value: 'Polybutylene',
      templateAboutId: 33,
    },
    {
      templateAboutValueId: 243,
      value: 'Combination',
      templateAboutId: 33,
    },

    {
      templateAboutValueId: 244,
      value: 'Natural Gas',
      templateAboutId: 34,
    },
    {
      templateAboutValueId: 245,
      value: 'Propane',
      templateAboutId: 34,
    },

    {
      templateAboutValueId: 246,
      value: '3/4',
      templateAboutId: 35,
    },
    {
      templateAboutValueId: 247,
      value: '1/2',
      templateAboutId: 35,
    },
    {
      templateAboutValueId: 248,
      value: '1"',
      templateAboutId: 35,
    },
    {
      templateAboutValueId: 249,
      value: '1 1/4',
      templateAboutId: 35,
    },
    {
      templateAboutValueId: 250,
      value: '1 1/2',
      templateAboutId: 35,
    },

    {
      templateAboutValueId: 251,
      value: 'Basement',
      templateAboutId: 36,
    },
    {
      templateAboutValueId: 252,
      value: 'Front of house',
      templateAboutId: 36,
    },
    {
      templateAboutValueId: 253,
      value: 'Crawl Space',
      templateAboutId: 36,
    },
    {
      templateAboutValueId: 254,
      value: 'Near Street',
      templateAboutId: 36,
    },
    {
      templateAboutValueId: 255,
      value: 'Utility Closet',
      templateAboutId: 36,
    },
    {
      templateAboutValueId: 256,
      value: 'Side of home',
      templateAboutId: 36,
    },
    {
      templateAboutValueId: 257,
      value: 'Garage',
      templateAboutId: 36,
    },

    {
      templateAboutValueId: 258,
      value: 'At meter',
      templateAboutId: 37,
    },
    {
      templateAboutValueId: 259,
      value: 'exterior',
      templateAboutId: 37,
    },
    {
      templateAboutValueId: 260,
      value: 'hall closet',
      templateAboutId: 37,
    },
    {
      templateAboutValueId: 261,
      value: 'utility room',
      templateAboutId: 37,
    },
    {
      templateAboutValueId: 262,
      value: 'basement',
      templateAboutId: 37,
    },
    {
      templateAboutValueId: 263,
      value: 'crawl space',
      templateAboutId: 37,
    },
    {
      templateAboutValueId: 264,
      value: 'laundry room',
      templateAboutId: 37,
    },
    {
      templateAboutValueId: 265,
      value: 'garage',
      templateAboutId: 37,
    },

    {
      templateAboutValueId: 266,
      value: 'Black iron',
      templateAboutId: 38,
      //  templateAboutValueNoteId: 3,
    },
    {
      templateAboutValueId: 267,
      value: 'CSST',
      templateAboutId: 38,
      //  templateAboutValueNoteId: 3,
    },
    {
      templateAboutValueId: 268,
      value: 'Galvanized',
      templateAboutId: 38,
      //  templateAboutValueNoteId: 3,
    },

    {
      templateAboutValueId: 269,
      value: 'PVC',
      templateAboutId: 39,
    },
    {
      templateAboutValueId: 270,
      value: 'ABS',
      templateAboutId: 39,
    },
    {
      templateAboutValueId: 271,
      value: 'Cast Iron',
      templateAboutId: 39,
      //  templateAboutValueNoteId: 4,
    },
    {
      templateAboutValueId: 272,
      value: 'Brass',
      templateAboutId: 39,
    },
    {
      templateAboutValueId: 273,
      value: 'Copper',
      templateAboutId: 39,
    },
    {
      templateAboutValueId: 274,
      value: 'Galvanized',
      templateAboutId: 39,
    },
    {
      templateAboutValueId: 275,
      value: 'Lead',
      templateAboutId: 39,
    },
    {
      templateAboutValueId: 276,
      value: 'Clay',
      templateAboutId: 39,
    },

    {
      templateAboutValueId: 277,
      value: 'Front of home',
      templateAboutId: 40,
    },
    {
      templateAboutValueId: 278,
      value: 'Side of home',
      templateAboutId: 40,
    },
    {
      templateAboutValueId: 279,
      value: 'Back of home',
      templateAboutId: 40,
    },
    {
      templateAboutValueId: 280,
      value: 'Crawl space',
      templateAboutId: 40,
    },
    {
      templateAboutValueId: 281,
      value: 'Near street',
      templateAboutId: 40,
    },
    {
      templateAboutValueId: 282,
      value: 'Near Driveway',
      templateAboutId: 40,
    },
    {
      templateAboutValueId: 283,
      value: 'Basement',
      templateAboutId: 40,
    },
    {
      templateAboutValueId: 284,
      value: 'Garage',
      templateAboutId: 40,
    },
    {
      templateAboutValueId: 285,
      value: 'Laundry room',
      templateAboutId: 40,
    },
    {
      templateAboutValueId: 286,
      value: 'Utility Room',
      templateAboutId: 40,
    },

    // 287, 289, 289, 290, 291 - 296 (taken)

    {
      templateAboutValueId: 297,
      value: 'Garage, , , , , ',
      templateAboutId: 44,
    },
    {
      templateAboutValueId: 298,
      value: 'Basement',
      templateAboutId: 44,
    },
    {
      templateAboutValueId: 299,
      value: 'Attic',
      templateAboutId: 44,
    },
    {
      templateAboutValueId: 300,
      value: 'Crawl space',
      templateAboutId: 44,
    },
    {
      templateAboutValueId: 301,
      value: 'Utility Room',
      templateAboutId: 44,
    },
    {
      templateAboutValueId: 302,
      value: 'Multiple locations',
      templateAboutId: 44,
    },

    {
      templateAboutValueId: 303,
      value: '0-7 years',
      templateAboutId: 45,
      //  templateAboutValueNoteId: 8,
    },
    {
      templateAboutValueId: 304,
      value: '8-12 years',
      templateAboutId: 45,
      //  templateAboutValueNoteId: 8,
    },
    {
      templateAboutValueId: 305,
      value: '12+ years',
      templateAboutId: 45,
      //  templateAboutValueNoteId: 8,
    },

    {
      templateAboutValueId: 306,
      value: 'Gas',
      templateAboutId: 46,
    },
    {
      templateAboutValueId: 307,
      value: 'Electric',
      templateAboutId: 46,
    },
    {
      templateAboutValueId: 308,
      value: 'Gas Tankless',
      templateAboutId: 46,
    },
    {
      templateAboutValueId: 309,
      value: 'Electric Tankless',
      templateAboutId: 46,
    },

    {
      templateAboutValueId: 310,
      value: '240v',
      templateAboutId: 47,
    },
    {
      templateAboutValueId: 311,
      value: 'Gas',
      templateAboutId: 47,
    },
    {
      templateAboutValueId: 312,
      value: '240v & Gas',
      templateAboutId: 47,
    },

    {
      templateAboutValueId: 313,
      value: 'Gas',
      templateAboutId: 48,
    },
    {
      templateAboutValueId: 314,
      value: 'Electric',
      templateAboutId: 48,
    },

    {
      templateAboutValueId: 315,
      value: 'Gas',
      templateAboutId: 49,
    },
    {
      templateAboutValueId: 316,
      value: 'Electric',
      templateAboutId: 49,
    },

    {
      templateAboutValueId: 317,
      value: 'Yes',
      templateAboutId: 50,
    },
    {
      templateAboutValueId: 318,
      value: 'No',
      templateAboutId: 50,
    },
    {
      templateAboutValueId: 319,
      value: 'Not visible',
      templateAboutId: 50,
    },

    // 320 (taken)
    {
      templateAboutValueId: 321,
      value: 'Primary',
      templateAboutId: 53,
      //  templateAboutValueNoteId: 6,
    },

    {
      templateAboutValueId: 322,
      value: 'Hallway',
      templateAboutId: 53,
      //  templateAboutValueNoteId: 6,
    },
    {
      templateAboutValueId: 323,
      value: '1/2',
      templateAboutId: 53,
      //  templateAboutValueNoteId: 6,
    },

    {
      templateAboutValueId: 324,
      value: 'Main Floor',
      templateAboutId: 53,
      //  templateAboutValueNoteId: 6,
    },
    {
      templateAboutValueId: 325,
      value: 'Basement',
      templateAboutId: 53,
      //  templateAboutValueNoteId: 6,
    },
    {
      templateAboutValueId: 326,
      value: 'Multiple Locations',
      templateAboutId: 53,
      //  templateAboutValueNoteId: 6,
    },

    {
      templateAboutValueId: 327,
      value: 'Casement',
      templateAboutId: 54,
    },

    {
      templateAboutValueId: 328,
      value: 'Single Pane',
      templateAboutId: 54,
    },
    {
      templateAboutValueId: 329,
      value: 'Storm',
      templateAboutId: 54,
    },

    {
      templateAboutValueId: 330,
      value: 'Double-hung',
      templateAboutId: 54,
    },
    {
      templateAboutValueId: 331,
      value: 'single-hung',
      templateAboutId: 54,
    },
    {
      templateAboutValueId: 332,
      value: 'slider',
      templateAboutId: 54,
    },
    {
      templateAboutValueId: 333,
      value: 'multiple types',
      templateAboutId: 54,
    },

    // detached
    {
      templateAboutValueId: 334,
      value: 'Pole barn',
      templateAboutId: 55,
    },
    {
      templateAboutValueId: 335,
      value: 'garage',
      templateAboutId: 55,
    },
    {
      templateAboutValueId: 336,
      value: 'poolhouse',
      templateAboutId: 55,
    },
    {
      templateAboutValueId: 337,
      value: 'workshop',
      templateAboutId: 55,
    },
    {
      templateAboutValueId: 338,
      value: 'in-law suite',
      templateAboutId: 55,
    },

    {
      templateAboutValueId: 339,
      value: 'Concrete',
      templateAboutId: 56,
    },
    {
      templateAboutValueId: 340,
      value: 'slab',
      templateAboutId: 56,
    },
    {
      templateAboutValueId: 341,
      value: 'Masonry Block',
      templateAboutId: 56,
    },
    {
      templateAboutValueId: 342,
      value: 'Brick',
      templateAboutId: 56,
    },
    {
      templateAboutValueId: 343,
      value: 'Stone',
      templateAboutId: 56,
    },
    {
      templateAboutValueId: 344,
      value: 'Rock',
      templateAboutId: 56,
    },
    {
      templateAboutValueId: 345,
      value: 'Other',
      templateAboutId: 56,
    },

    {
      templateAboutValueId: 346,
      value: 'Various Materials',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 347,
      value: 'Brick',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 348,
      value: 'Stucco',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 349,
      value: 'Vinyl',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 350,
      value: 'Masonry',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 351,
      value: 'Stone',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 352,
      value: 'Wood',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 353,
      value: 'Aluminum',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 354,
      value: 'Asbestos',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 355,
      value: 'Asphalt',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 356,
      value: 'Engineered Wood',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 357,
      value: 'Fiber Cement',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 358,
      value: 'Logs',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 359,
      value: 'Metal',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 360,
      value: 'Plastic',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 361,
      value: 'Shingles',
      templateAboutId: 57,
    },
    {
      templateAboutValueId: 362,
      value: 'Masonry Veneer',
      templateAboutId: 57,
    },

    {
      templateAboutValueId: 363,
      value: 'Composition Shingle',
      templateAboutId: 58,
    },
    {
      templateAboutValueId: 364,
      value: 'Wood Shake/Shingle',
      templateAboutId: 58,
    },
    {
      templateAboutValueId: 365,
      value: 'Slate',
      templateAboutId: 58,
    },
    {
      templateAboutValueId: 366,
      value: 'Metal',
      templateAboutId: 58,
    },
    {
      templateAboutValueId: 367,
      value: 'Tile',
      templateAboutId: 58,
    },
    {
      templateAboutValueId: 368,
      value: 'EDPM',
      templateAboutId: 58,
    },
    {
      templateAboutValueId: 369,
      value: 'Synthetic',
      templateAboutId: 58,
    },
    {
      templateAboutValueId: 370,
      value: 'Rolled Roofing',
      templateAboutId: 58,
    },
  ]);
};
