module.exports = async function (sequelize) {
  await sequelize.models.template_about_value_note.bulkCreate([
    {
      templateAboutValueNoteId: 1,
      note: 'Spray Polyurethane Foam Insulation (SPF) has been applied in the attic. Some homeowners have reported adverse health effects from this type of insulation, which may be related to the off-gassing of the material, and additional research on this material prior to closing is recommended.',
      templateAboutValueId: 58,
    },
    {
      templateAboutValueNoteId: 2,
      note: 'We recommend you verify the water source for this property. The inspector utilizes information given and/or knowledge of the area in determining the type of water source; however, the inspector may not be able to verify the source.',
      templateAboutValueId: 236,
    },
    {
      templateAboutValueNoteId: 3,
      note: 'The gas lines for the property are not tested for gas leaks unless an adverse condition is detected by the inspector. If corrosion exists on the visible lines, or as part of an annual preventative inspection, we recommend contacting your utility supplier for a thorough inspection. Note 1: The gas appliances, such as the water heater and/or heating system, may be installed without the benefit of a ""Sediment Trap"". Sediment traps are installed in the natural gas service lines to catch and protect systems from debris and/or moisture. In addition to manufacturers\' installation guidelines, a sediment trap shall be installed downstream of the appliance shut-off valve as close to the inlet of the appliance as practical at the time of appliance installation. Note 2: Some municipalities may require the installation of automatic gas shut-off devices which may include excess flow and/or earthquake-actuated shut-off valves. Check with the local building department, municipality, and/or PG&E for current installation recommendations and requirements. Note 3: Direct bonding is required for gas piping systems incorporating standard (yellow) or uncoated CSST whether or not the connected gas equipment is electrically powered. If CSST piping is present, we recommend you contact a licensed electrician to determine if proper bonding is present.',
      templateAboutValueId: 266,
    },
    {
      templateAboutValueNoteId: 4,
      note: 'The structure is equipped with cast iron waste and drain pipes. When the pipes wear, rust corrodes the pipe and causes leaks and/or restricts flow. Also, deterioration or damage due to tree root systems can exist. A video investigation/sewer lateral inspection of your waste system is recommended to determine if any obstructions or damage exists inside the waste line.',
      templateAboutValueId: 271,
    },
    {
      templateAboutValueNoteId: 5,
      note: 'This inspection does not cover code clearances or improper installation. Also, any pre-fabricated or manufactured fireplace systems may require additional inspections by a certified chimney inspection company. In some jurisdictions, a Level II chimney inspection may be required. For additional information and if certification is desired, contact a fireplace inspection service.',
      templateAboutValueId: 228,
    },
    {
      templateAboutValueNoteId: 6,
      note: 'The water was run for 1-3 minutes and the toilets were flushed 2-3 times at the time of the inspection. The inspector does not provide a warranty for undiscovered or undisclosed clogs in the drain/waste system.',
      templateAboutValueId: 321,
    },
    {
      templateAboutValueNoteId: 8,
      note: 'Safety relief valves should be re-inspected at least once every three years by a licensed plumbing contractor or authorized trade, to ensure the product has not been affected by corrosive water conditions and to ensure that the valve and discharge line have not been altered or tampered with illegally. Certain naturally occurring conditions may corrode the valve or its components over time, rendering the valve inoperative. Such conditions are not detectable unless the valve and its components are physically removed and inspected. This inspection must only be conducted by a plumbing contractor or authorized trade – not by the owner. Failure to re-inspect the relief valve as directed could result in unsafe pressure buildup, which can result in severe personal injury, substantial property damage, etc.',
      templateAboutValueId: 303,
    },
  ]);
};
