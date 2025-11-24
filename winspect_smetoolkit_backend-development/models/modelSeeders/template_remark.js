module.exports = async function (sequelize) {
  await sequelize.models.template_remark.bulkCreate([
    {
      templateRemarkId: 1,
      remark:
        'The roof was evalauted from the ground. Issues may exist that were not visible at the time of the inspection. For a more detailed inspection, we recommend contacting a qualified roofer. ',
      templateSubCategoryId: 1,
      type: 'Limitation',
      title: 'Evaluated From Ground',
    },
    {
      templateRemarkId: 2,
      remark:
        'The roof cover was evaluated from the roof edge, due to the inspector not being able to walk the roof.  Issues may exist that were not visible atthe time of the inspection. For a more detailed inspection, we recommend contactng a qualified roofing contractor.',
      templateSubCategoryId: 1,
      type: 'Limitation',
      title: 'Roof Edge',
    },
    {
      templateRemarkId: 3,
      remark:
        'The inspection has revealed multiple layers of roofing material. Multiple layers decrease the life expectancy of the top roof covering, as well as put a strain on the roof structure. Recovering the roof again is not advisable or may not be possible according to local ordinances. ',
      templateSubCategoryId: 1,
      type: 'Condition',
      title: 'Multiple Layers',
    },
    {
      templateRemarkId: 4,
      remark:
        "The pitch of the current roof may not be sufficient for the manufacturer to warrant this type of roofing system. The roof coverings' life expectancy may be shortened due to the lack of proper pitch for this type of material.",
      templateSubCategoryId: 1,
      type: 'Condition',
      title: 'Low Pitch - Improper Material',
    },
    {
      templateRemarkId: 5,
      remark:
        'Composition Shingles - Today, asphalt shingles are classified by the warranty offered by the manufacturer. Known as: 20 year, 25 year, 30 year, 40 year, and 50 year shingles. Periodic inspections of the material and roof flashing/caulking will be necessary in order to prevent leaks and deterioration.',
      templateSubCategoryId: 1,
      type: 'Note',
    },
    {
      templateRemarkId: 6,
      remark:
        'Concrete/Slate/ Spanish/Clay/Light Weight - Tile roofing systems have a life expectancy of 35-50+ years. Periodic inspections of the material and roof flashing/caulking will be necessary in order to prevent leaks and deterioration',
      templateSubCategoryId: 1,
      type: 'Note',
    },
    {
      templateRemarkId: 7,
      remark:
        'Rolled Roofing - Rolled roofing material is often used on roofs that are low-sloped or flat. Rolled roofing is typically considered an economic roofing choice, and easier to install for homeowners, than other types of roofing systems. Compared to composite shingles, whose life span is roughly 20 years or more, rolled roofing does not last nearly as long — typically 5-10 years. If your roof pitch declines up to 1 inch vertically for every 12 inches horizontally (1:12 pitch), it is a good candidate for rolled roofing as long as the nail method of fastening is properly concealed.',
      templateSubCategoryId: 1,
      type: 'Note',
    },

    {
      templateRemarkId: 8,
      remark:
        'Wood Shakes/Shingles-The life expectancy of a wood shake/shingle roof is generally [25 to 35:selected;20 to 30] years. Routine maintenance, such as cleaning debris/moss, replacing damaged shakes, and/or roof restorations, will be necessary in order to extend the life of the roof',
      templateSubCategoryId: 1,
      type: 'Note',
    },
    {
      templateRemarkId: 9,
      remark:
        'EPDM Roofing Membrane White or Black - EPDM (Ethylene Propylene Diene Monomer) roofing membrane is a flexible rubber material available in 60 mil (about the thickness of a quarter). With its superior flexibility and high strength, EPDM can easily contour to unusual roof shapes. EPDM roofs have a life expectancy of approximately 15-30 years from installation date.',
      templateSubCategoryId: 1,
      type: 'Note',
    },
    {
      templateRemarkId: 10,
      remark:
        'Slate tile roofing systems have a life - expectancy of 50+ years. Periodic inspections of the material and roof flashing/caulking will be necessary in order to prevent leaks and deterioration.',
      templateSubCategoryId: 1,
      type: 'Note',
    },
    {
      templateRemarkId: 11,
      remark:
        'Metal Roof - Metal roofs have a life expectancy of approximately 40-60 years. Routine repairs or inspections of seams will be necessary in order to extend the life of the roof.',
      templateSubCategoryId: 1,
      type: 'Note',
    },
    {
      templateRemarkId: 12,
      remark:
        'Note - Most times multiple-layered roofs are difficult to determine without damaging the material. This inspection reports on the roof condition and is not intended to be a leak-tight warranty or roof certification. This is not a compliance inspection or certification of compliance with past or present governmental codes or regulations of any kind.',
      templateSubCategoryId: 1,
      type: 'Note',
    },
    {
      templateRemarkId: 13,
      remark:
        'Note - Most times multiple-layered roofs are difficult to determine without damaging the material. Multiple layered roofs add extra weight to the roof frame. Assessing the structural integrity of a building is beyond the scope of this type of inspection. If this is a concern, it is recommended that a qualified roofing contractor determine the exact number of layers and the integrity of the roofing frame. This inspection reports on the roof condition - this is not a compliance inspection or certification of compliance with past or present governmental codes or regulations of any kind.',
      templateSubCategoryId: 1,
      type: 'Note',
    },

    {
      templateRemarkId: 14,
      remark:
        'There was snow covering the roof surface at the time of the inspection. Issues may exist that were not visible. It is recommended that the roof is evaluated when access can be gained.',
      templateSubCategoryId: 2,
      type: 'Limitation',
      title: 'Roof covered with snow',
    },
    {
      templateRemarkId: 15,
      remark:
        'The roof cover appeared to be in satisfactory condition. We recommend questioning the seller regarding the age of the roof cover.',
      templateSubCategoryId: 2,
      type: 'Condition',
      title: 'Satisfactory',
    },
    {
      templateRemarkId: 16,
      remark: 'There was missing roof covering material at the time of inspection.',
      templateSubCategoryId: 2,
      type: 'Condition',
      title: 'Missing Roof Covering Material',
    },
    {
      templateRemarkId: 17,
      remark:
        'There were exposed fasteners at the roof cover. We recommend properly repairing and sealing these areas prior to further deterioration.',
      templateSubCategoryId: 2,
      type: 'Condition',
      title: 'Exposed Fasteners',
    },
    {
      templateRemarkId: 18,
      remark:
        'In one or more roof regions, there were signs of ponding. Ponding or puddling of water that is concentrated in one spot on the roof can cause damage and water leaks.',
      templateSubCategoryId: 2,
      type: 'Condition',
      title: 'Ponding ',
    },
    {
      templateRemarkId: 19,
      remark:
        'Note - This is not a leak-tight or roof warranty, and defects may exist. The inspector is not a licensed roof inspector, and only provides a general condition report on the visible surface areas. For a more detailed inspection of the installation and remaining service life of the roof cover.',
      templateSubCategoryId: 2,
      type: 'Note',
    },
    {
      templateRemarkId: 20,
      remark:
        'Note - This is not a leak-tight or roof warranty, and defects may exist. The inspector is not a licensed roof inspector, and only provides a general condition report on the visible surface areas. For a more detailed inspection of the installation and remaining service life of the roof cover.',
      templateSubCategoryId: 2,
      type: 'Note',
    },
    {
      templateRemarkId: 21,
      remark:
        'Due to the type of roof inspection, some or most of the flashing was not visible. Water intrusion from wind-driven rain is possible due to certain installations, which may not be visible. We recommend further evaluation by a qualified roofing contractor.',
      templateSubCategoryId: 3,
      type: 'Limitation',
      title: 'Not Visible',
    },
    {
      templateRemarkId: 22,
      remark:
        'There was missing flashing in one or more areas of the roof. Missing flashing may cause moisture penetration. ',
      templateSubCategoryId: 3,
      type: 'Condition',
      title: 'Missing flashing',
    },
    {
      templateRemarkId: 23,
      remark:
        'Where the roof material met a wall or siding material, flashing was present. In certain places, step and counter flashing ought to be fitted. This is not a thorough examination of every flashing spot.',
      templateSubCategoryId: 3,
      type: 'Condition',
    },
    {
      templateRemarkId: 24,
      remark:
        'There was rusted/coroded flashing noted at the roof. Painting the flashing with rust-inhibiting paint and/or replacing the flashing upon replacement of the existing roof covering is recommended.',
      templateSubCategoryId: 3,
      type: 'Condition',
      title: 'Rusted/coroded flashing',
    },
    {
      templateRemarkId: 25,
      remark:
        'There was debris in the valley flashing areas. Leaves, branches, and/or other materials should be removed in order to allow water to flow from the roof area to the gutters.',
      templateSubCategoryId: 3,
      type: 'Condition',
      title: 'Debris in valley',
    },
    {
      templateRemarkId: 26,
      remark:
        ' Proper Care and Maintenance Recommendation - The inspector recommends the caulking around any chimney(s), roof vents, and flashing material be inspected and touched up on an annual basis. Removing any rust and corrosion is recommended to prevent deterioration and damage. Also, any exposed nails at roof vents/flashing should be caulked/sealed. Rainwater leaking into the main structure from the roof is a common and avoidable condition of deteriorated flashing and caulking. The cost and time involved in upkeep is minimal as long as it is maintained on an annual basis.',
      templateSubCategoryId: 3,
      type: 'Note',
    },
    {
      templateRemarkId: 27,
      remark:
        'Note - Any debris or rust/corrosion in the valleys should be removed as needed to allow water to flow to the gutters and/or from the roof as intended.',
      templateSubCategoryId: 3,
      type: 'Note',
    },
    {
      templateRemarkId: 28,
      remark:
        'At the time of the inspection, the gutters had a buildup of leaves and other debris. If debris is not removed, it may clog the gutters, downspouts, and/or drainage system. Maintenance and cleaning are recommended.',
      templateSubCategoryId: 4,
      type: 'Condition',
      title: 'Leaves and Debris',
    },
    {
      templateRemarkId: 29,
      remark:
        'The roof gutter system is in disrepair. Due to the condition of the gutter system, replacement is recommended at this time',
      templateSubCategoryId: 4,
      type: 'Condition',
      title: 'Deteriorated Condition',
    },
    {
      templateRemarkId: 30,
      remark:
        'Gutters are essential for effectively collecting rainfall from the roof, managing it, diverting it, and releasing that water far from the home and its foundation. To assist divert rainwater from the roof and away from the building, gutters, and downspouts should be added to the roofing system',
      templateSubCategoryId: 4,
      type: 'Condition',
      title: 'Missing Gutter/ proper Drainage',
    },
    {
      templateRemarkId: 31,
      remark:
        'There were gutter downspouts discharging near the structure. It is recommended that the downspouts are rerouted or extended at least 4-6 feet away from the structure as a preventative measure.',
      templateSubCategoryId: 4,
      type: 'Condition',
      title: 'gutter downspouts discharging near  structure',
    },
    {
      templateRemarkId: 32,
      remark:
        'Note - Cleaning the gutters, downspouts, and drains on an annual basis, or as needed, is recommended for proper care and maintenance of the gutter system.',
      templateSubCategoryId: 4,
      type: 'Note',
    },
    {
      templateRemarkId: 33,
      remark:
        'Note - There is gutter screen material installed at [the gutter system:selected;portions of the gutter system] to help keep debris out of the gutters. The screen helps keep leaves and other debris out of the gutter system to prevent clogging of the gutters, downspouts, and drain system. Periodic maintenance and checking for loose areas is recommended.',
      templateSubCategoryId: 4,
      type: 'Note',
    },
    {
      templateRemarkId: 34,
      remark:
        'The roof skylights were inspected for indications of leaking or deterioration of the installation. Due to the inspector being unable to access these areas of the roof, a thorough inspection could not be conducted.',
      templateSubCategoryId: 5,
      type: 'Limitation',
      title: 'Roof Not Visible',
    },
    {
      templateRemarkId: 35,
      remark:
        'The roof skylights were inspected for indications of leaking or deterioration of the installation. There were no visible signs of leaks at the time of the inspection. ',
      templateSubCategoryId: 5,
      type: 'Condition',
      title: 'Satisfactory',
    },
    {
      templateRemarkId: 36,
      remark:
        'The roof skylights were inspected for indications of leaking or deterioration of the installation. The inspector noted stains below the skylight. These areas appeared to be dry at the time of the inspection. Stains of this type typically indicate condensation build-up on the glass or a past roof leak. We recommend questioning the seller regarding their knowledge of this issue.',
      templateSubCategoryId: 5,
      type: 'Condition',
      title: 'Past Stains on Skylights',
    },
    {
      templateRemarkId: 37,
      remark:
        'The inspector has identified  skylight/s that have lost the seal between the panes of glass. This issue causes fogging/condensation between the panes of glass and is typically cosmetic. Replacing the window glass should be considered. ',
      templateSubCategoryId: 5,
      type: 'Condition',
      title: 'Failed Seals',
    },
    {
      templateRemarkId: 38,
      remark:
        'The chimney flue has no rain cap. Installing rain caps is advised to reduce moisture and/or back-drafting caused by high winds.',
      templateSubCategoryId: 5,
      type: 'Condition',
      title: 'Missing Rain Cap',
    },
    {
      templateRemarkId: 39,
      remark:
        'The exhaust vents are rusted/corroded. Vent repair and/or replacement may be required while replacing the present roof covering. ',
      templateSubCategoryId: 5,
      type: 'Condition',
      title: 'Corroded Exhaust vents',
    },
    {
      templateRemarkId: 40,
      remark:
        'Note - Skylights can leak from multiple non-roof related issues including but not limited to casing failure and leakage, broken glass, incorrect flashing, and improperly sealed casings and glass. If leaking, a skylight installer will need to be contacted to repair or replace the skylight or flashing kit.',
      templateSubCategoryId: 5,
      type: 'Note',
    },
    {
      templateRemarkId: 41,
      remark:
        'There did not appear to be access provided for the attic. We recommend an access panel be installed in order to properly inspect these areas. Issues may exist but cannot be seen without proper access. We recommend having the attic entered and evaluated when access can be safely gained.',
      templateSubCategoryId: 6,
      type: 'Limitation',
      title: 'No Access Provided',
    },
    {
      templateRemarkId: 42,
      remark:
        'There did not appear to be an attic entrance due to vaulted ceilings and construction detail. The inspector cannot comment on whether these areas have adequate ventilation or if any adverse conditions exist. We recommend contacting a qualified roofing contractor for further evaluation and recommendations.',
      templateSubCategoryId: 6,
      type: 'Limitation',
      title: 'Attic Inaccessible - Vaulted Ceiling ',
    },
    {
      templateRemarkId: 43,
      remark:
        'There was a ladder access system at the attic entrance which appeared to be functional at the time of the inspection. We recommence periodic inspection and maintenance of the ladder system for continued safe functional use.',
      templateSubCategoryId: 6,
      type: 'Condition',
      title: 'Satsfactory - Attic Access Ladder',
    },
    {
      templateRemarkId: 44,
      remark: 'There was damaged or loose hardware at the ladder access for the attic.',
      templateSubCategoryId: 6,
      type: 'Condition',
      title: 'Damaged or Loose Hardware ',
    },
    {
      templateRemarkId: 45,
      remark:
        'Note - The inspector is not able to comment on duct leakage or defects that may not be noticeable without extensive testing. Annual inspections of the attic are recommended to determine future issues which may affect the performance of these systems.',
      templateSubCategoryId: 6,
      type: 'Note',
    },
    {
      templateRemarkId: 46,
      remark:
        'The insulation depth in the attic area was inadequate by todays standards. Adding insulation in your attic is one of the easiest and most cost-effective ways to increase your homes energy efficiency and reduce your utility bills.',
      templateSubCategoryId: 7,
      type: 'Condition',
      title: 'Inadequate Insulation',
    },
    {
      templateRemarkId: 47,
      remark:
        'There appears to be a lack of ventilation in the attic area by todays standards. Attic areas should be vented with half of the ventilating area near the high point of the roof (ridge) and the other half near the low point (eaves/soffit). This allows the heat build-up in the attic to escape and pull cooler air into the attic from the lower vents.',
      templateSubCategoryId: 7,
      type: 'Condition',
      title: 'Lack of Attic Ventilation',
    },
    {
      templateRemarkId: 48,
      remark:
        'There is blown-in insulation covering the present electrical wiring in the attic, which is knob & tube wiring. It is recommended that this type of wiring system generally not be covered with insulation in order for it to allow to dissipate the heat generated by the wiring. ',
      templateSubCategoryId: 7,
      type: 'Condition',
      title: 'Blown-in Insulation Covering Knob and Tube',
    },
    {
      templateRemarkId: 49,
      remark:
        'Due to the length of the furnace exhaust vent, we recommend bracing the vent to prevent movement. This is recommended to prevent the pipe from leaning against the attic framing and to prevent seperation.',
      templateSubCategoryId: 7,
      type: 'Condition',
      title: 'Brace Exhaust Vent',
    },
    {
      templateRemarkId: 50,
      remark:
        'There is insulation which is covering recessed lighting fixtures in the attic area. Some light fixtures are not recommended to be covered with insulation due to possible heat build-up at the fixture. Due to the amount of insulation in the attic, it could not be verified if these fixtures are IC (insulation contact) rated and could be covered with insulation. Further investigations may be necessary in order to determine if this installation is appropriate.',
      templateSubCategoryId: 7,
      type: 'Condition',
      title: 'recessed lighting fixtures',
    },
    {
      templateRemarkId: 52,
      remark:
        'Spray Polyurethane Foam Insulation (SPF) has been applied in the attic. Some homeowners have reported adverse health effects from this type of insulation, which may be related to the off-gassing of the material, and additional research on this material prior to closing is recommended.',
      templateSubCategoryId: 7,
      type: 'Note',
    },
    {
      templateRemarkId: 53,
      remark:
        'The underside of the roof was not visible due to the insulation in these areas. This makes it difficult to evaluate the sheathing for indications of past/present leaks or other issues. We recommend contacting a qualified roofing contractor for further evaluation if this is a concern.',
      templateSubCategoryId: 8,
      type: 'Limitation',
      title: 'Underside roof',
    },
    {
      templateRemarkId: 54,
      remark:
        'There are areas of the attic which display possible microbial growth, such as on the roof sheathing/framing. Further investigations are recommended to determine the cause and remedy.',
      templateSubCategoryId: 8,
      type: 'Condition',
      title: 'microbial growth',
    },
    {
      templateRemarkId: 55,
      remark:
        'There are trusses being used for the roof structure. There was a section that has been cracked/damaged, and appears to have been repaired at some time in the past. We recommend questioning the seller regarding their knowledge of this issue or referring to any past reports or disclosuresn.',
      templateSubCategoryId: 8,
      type: 'Condition',
      title: 'Damaged trusses',
    },
    {
      templateRemarkId: 56,
      remark:
        'The insulation battens in the attic space are installed between the roof framing. The paper/vapor barrier was exposed with the paper-backing visible, which can be flammable according to the warning label of the manufacturer. Also, the current installation can contribute to condensation issues at the framing.',
      templateSubCategoryId: 8,
      type: 'Condition',
      title: 'Battens Underside of Roof Paper Visible',
    },
    {
      templateRemarkId: 57,
      remark:
        'There is no roofing felt or solid roof sheathing installed under the concrete tiles of the roof. This type of installation may have been acceptable when the home was originally built; however, it is prone to leaks if the tiles are damaged or due to wind driven rain. No leaks were visible at this time. We recommend repairing any cracked tiles and periodic inspections of the attic space. ',
      templateSubCategoryId: 8,
      type: 'Condition',
      title: 'missing sheathing',
    },
    {
      templateRemarkId: 58,
      remark:
        'There are stains at the roof framing of the attic. The stains were dry and no damage has occurred at this time. The stains appear to be from a previously installed roof covering; however,  [it was not raining at the time of the inspection and confirmation of a current leak could not be made:selected;a confirmation of a current leak could not be made].. We recommend you refer to the current owner, past reports to determine the age of the stains. ',
      templateSubCategoryId: 8,
      type: 'Condition',
      title: 'Stains on Sheathing',
    },
    {
      templateRemarkId: 59,
      remark:
        'There were  signs of damaged framing members in the accessible areas of the attic space. Some attic areas may have been limited due to obstructions, insulation, or other detrimental conditions. Due to the age of the house, there were no ridge boards, knee walls, and/or collar ties installed for the roof framing. ',
      templateSubCategoryId: 8,
      type: 'Condition',
      title: 'Damaged framing ',
    },
    {
      templateRemarkId: 60,
      remark:
        'Note - Some molds are known to produce toxins. Testing or identifying these organisms is not within the scope of a home inspection. Due to recent health issues associated with mold, we recommend that interested parties consider retaining a qualified professional for testing and evaluation prior to the close of escrow.',
      templateSubCategoryId: 8,
      type: 'Note',
    },
    {
      templateRemarkId: 61,
      remark:
        'Note - The building may have been built prior to this enforcement, and may not be required to be retrofitted. We recommend contacting the association and/or local building department for additional information and current requirements.',
      templateSubCategoryId: 8,
      type: 'Note',
    },
    {
      templateRemarkId: 62,
      remark:
        'There was mssing sections of duct work in the attic. We recommend repairs in order to prevent deterioration of the duct work as well as to improve energy efficiency. ',
      templateSubCategoryId: 9,
      type: 'Condition',
      title: 'missing section of duct',
    },
    {
      templateRemarkId: 63,
      remark:
        'There was damaged sections of duct work in the attic. We recommend repairs in order to prevent deterioration of the duct work as well as to improve energy efficiency. ',
      templateSubCategoryId: 9,
      type: 'Condition',
      title: 'Damaged duct',
    },
    {
      templateRemarkId: 64,
      remark:
        'The duct work exhaust fan terminates near the soffit vent screens of the attic area. This may be functional; however, it is recommended the duct work terminate to the exterior of the structure utilizing a proper draft hood. Appropriate repairs are recommended to exhaust to the exterior of the structure',
      templateSubCategoryId: 9,
      type: 'Condition',
      title: 'Duct terminating inside the attic',
    },
    {
      templateRemarkId: 65,
      remark:
        'The inspector was unable to determine the location of the main water shut-off valve. We recommend questioning the seller regarding the location of a main shut-off. ',
      templateSubCategoryId: 10,
      type: 'Limitation',
      title: 'Main Water Shut-off Not located',
    },
    {
      templateRemarkId: 66,
      remark:
        'The water was shutoff at the time of the inspection. The inspector was unable to test the plumbing system. It is recommended that the plumbing system is tested when the water is turned on.',
      templateSubCategoryId: 10,
      type: 'Limitation',
      title: 'Water Turned Off',
    },
    {
      templateRemarkId: 67,
      remark:
        'An annual sampling of well water for contaminants is recommended. Note: Inspecting the well pump or components is not within the scope of this inspection. We recommend contacting an appropriate trade for further evaluation.',
      templateSubCategoryId: 10,
      type: 'Limitation',
      title: 'Well',
    },
    {
      templateRemarkId: 68,
      remark:
        'The gas service to the structure appeared to be turned off at the time of the inspection. Due to this issue, several systems could not be tested. We suggest contacting your local utility company to assist you in turning the service on. The inspector recommends contacting a qualified trade to evaluate and test the affected systems prior to close.',
      templateSubCategoryId: 10,
      type: 'Limitation',
      title: 'Gas Turned Off',
    },
    {
      templateRemarkId: 69,
      remark:
        'We recommend questioning the current owner regarding the water meter location if installed. The meter was not visible at the time of the inspection.',
      templateSubCategoryId: 10,
      type: 'Limitation',
      title: 'Water Meter Not Visible',
    },
    {
      templateRemarkId: 70,
      remark:
        'The inspector noted ano active water leak at the main water shut-off valve. It is recommended that a qualfiied plumber is contacted for repairs.',
      templateSubCategoryId: 10,
      type: 'Condition',
      title: 'Leak at Main Water Shut-off',
    },
    {
      templateRemarkId: 71,
      remark:
        'The main water shut-off handle was not in place at the time of the inspection. It is recommended that repairs are made in order to shut the water off in case of emergency.',
      templateSubCategoryId: 10,
      type: 'Condition',
      title: 'Main Water Shut-off Handle Missing',
    },
    {
      templateRemarkId: 72,
      remark:
        'There appears to be 1/2" copper plumbing for the main water line entrance to the home. The size of the plumbing line could prove to be restrictive if multiple faucets are turned on at the same time. Upgrading the size to 3/4" or 1" to increase water flow is recommended. ',
      templateSubCategoryId: 10,
      type: 'Condition',
      title: '1/2',
    },
    {
      templateRemarkId: 73,
      remark:
        'We recommend you verify the water source for this property. The inspector utilizes information given and/or knowledge of the area in determining the type of water source; however, the inspector may not be able to verify the source.',
      templateSubCategoryId: 10,
      type: 'Note',
    },
    {
      templateRemarkId: 74,
      remark:
        'The gas lines for the property are not tested for gas leaks unless an adverse condition is detected by the inspector. If corrosion exists on the visible lines, or as part of an annual preventative inspection, we recommend contacting your utility supplier for a thorough inspection. Also, on older homes, we recommend upgrading any older gas flex lines and/or shut-off valves as a preventative safety measure.Note 1 - The gas appliances, such as the water heater and/or heating system, may be installed without the benefit of a ""Sediment Trap"". Sediment traps are installed in the natural gas service lines to catch and protect systems from debris and/or moisture. In addition to manufacturers installation guidelines, a sediment trap shall be installed downstream of the appliance shut-off valve as close to the inlet of the appliance as practical at the time of appliance installation. Although the age of the structure may predate the requirement, installation of sediment traps is recommended by a qualified tradesperson in a timely manner or upon replacement of the appliance.Note 2 - On newer homes or remodels, some municipalities may require the installation of automatic gas shut-off devices which may include excess flow and/or earthquake-actuated shut-off valves. Check with the local building department, municipality, and/or PG&E for current installation recommendations and requirements.Note 3 - Direct bonding is required for gas piping systems incorporating standard (yellow) or uncoated CSST whether or not the connected gas equipment is electrically powered. If CSST piping is present, we recommend you contact a licensed electrician to determine if proper bonding is present.',
      templateSubCategoryId: 10,
      type: 'Note',
    },
    {
      templateRemarkId: 75,
      remark:
        'The inspector noted one or more drains that had a negative slope. This may cause water to stand in the pipe and/or cause deterioration or back-ups to occur.',
      templateSubCategoryId: 24,
      type: 'Condition',
      title: 'Drain Negative Slope',
    },
    {
      templateRemarkId: 76,
      remark:
        'There are sections of waste pipe which had damaged and/or missing support straps. This may cause a negative slope of the pipe and water to stand in the pipe. ',
      templateSubCategoryId: 24,
      type: 'Condition',
      title: 'Damaged/loose Support Straps',
    },
    {
      templateRemarkId: 77,
      remark:
        'The drain-waste-vent system (DWV) employs a mechanical vent, also known as an air-admittance valve or AAV. Although they may function as intended, AAVs are a mechanical component, and as such, they are subject to failure over time. Failure of these mechanical vents may allow sewer gases to escape into the attic or living space, which would result in potentially hazardous and unhealthy conditions.',
      templateSubCategoryId: 24,
      type: 'Condition',
      title: 'Air Admittance Valves',
    },
    {
      templateRemarkId: 78,
      remark:
        'Plastic sewer pipe for underground installations is available in both ABS and PVC. Both types of pipe have smooth interiors for an excellent carrying capacity of solid waste matter. The smooth exteriors also help resist root anchorage.Plastic sewer pipe is usually the material of choice for do-it-yourselfers since it is lightweight, easy to cut, inexpensive, and available at all home centers. As an added benefit, plastic pipes can be tied into cast iron and clay pipe.',
      templateSubCategoryId: 24,
      type: 'Note',
    },
    {
      templateRemarkId: 79,
      remark:
        'Cast Iron Waste Pipes - Cast iron sewer pipe, like clay pipe, is associated with older homes, yet it is still installed today. One of the best things about cast iron pipe is that it is incredibly strong. A four-inch diameter sewer pipe can withstand well over two tons of pressure per linear foot. By contrast, clay, ABS, and PVC pipe are all subject to breakage. Cast iron sewer pipe is heavy and difficult for a do-it-yourselfer to cut. To cut a cast-iron pipe in the ground, you need a soil pipe cutter, a specialty tool that can be rented from supply houses for a small fee. Cast iron pipe is non-flammable. This is not an issue for below-ground installations; but should you decide to continue the cast iron into the house, you can feel secure knowing that cast iron pipe will not melt in a fire.',
      templateSubCategoryId: 24,
      type: 'Note',
    },
    {
      templateRemarkId: 80,
      remark:
        'Clay Waste Pipes -Clay pipe was common until the mid 1970s. A newer type of clay pipe is known as vitrified clay pipe (VCP). Vitrified clay sewer pipe was manufactured in the mid 1970s and is still laid today, though as a do-it-yourself homeowner, you probably will not want to choose this for your sewer line replacement. Clay pipe is heavy and tricky to cut. Often, your choice of sewer pipe is dictated by what your home improvement store has on hand, and none of the major retailers carry clay pipe. While clay pipe may seem archaic, it is a viable form of sewer pipe. One great benefit of clay pipe over plastic pipe is that it is inert, making it highly resistant to chemical degradation. Because clay sewer pipe has a porous surface, it tends to attract tree roots. Roots that impinge on clay pipe may eventually cause the pipe to crack.',
      templateSubCategoryId: 24,
      type: 'Note',
    },
    {
      templateRemarkId: 81,
      remark:
        'HDPE Waste Pipe (High-Density Polyethylene) - There are several distinct advantages of HDPE pipe that provide important benefits for sewer and wastewater applications.HDPE is harder and more abrasion and heat-resistant than PVC. HDPE pipes are found to be able to dampen and absorb shock waves minimizing surges that can affect the system while PVC cannot. HDPE is a softer, more bendable plastic, making HDPE pipe more suitable for lower-pressure, tight-bending radius situations. On the other hand, PVC is a much stronger and stiffer material, which is why PVC pipes are more widely used for direct burial and trenchless installations.',
      templateSubCategoryId: 24,
      type: 'Note',
    },
    {
      templateRemarkId: 82,
      remark:
        'Note - This is a visual examination of the exterior piping which is visible at the time of the inspection. We recommend asking the current owners about slow-draining sinks and/or back-ups in toilets. Also, depending on the age of the home and location, a video investigation/sewer lateral inspection of your waste system is recommended to determine if any obstructions or damage exists inside the waste line. Homes over 15 years old and/or on a property with expansive soil or with trees or vegetation are recommended to conduct a sewer lateral inspection. Relining or replacing a sewer line is approximately $150 - $350 per foot',
      templateSubCategoryId: 24,
      type: 'Note',
    },
    {
      templateRemarkId: 83,
      remark:
        'Orangeburg Waste Pipes - A flawless, pristine Orangeburg sewer pipe is not something you often see. Typically, you find Orangeburg sewer pipe in a collapsed state after you dig up your malfunctioning sewer line.Orangeburg, a fiber conduit pipe, was manufactured from wood fibers bound with a special water-resistant adhesive, then impregnated with liquefied coal tar pitch. Orangeburg was favored by many plumbers of the time because it was lightweight to carry and easy to cut with a regular wood saw.Fiber conduit pipe that was properly bedded in sand and pea gravel to reduce stress will last longer than poorly prepared installations. Most Orangeburg has a lifespan of no more than 50 years.',
      templateSubCategoryId: 24,
      type: 'Note',
    },
    {
      templateRemarkId: 84,
      remark:
        'SDR / PVC Waste Pipe - The green sewer drain pipe known as SDR is used for the final underground run from a house to the municipal sewer or septic tank. It is manufactured to be compliant with “ASTM D 3034” standard and is often referred to as “3034” pipe. It is PVC, but lighter weight than white Schedule 40 DWV (Drain-Waste-Vent) pipe.',
      templateSubCategoryId: 24,
      type: 'Note',
    },
    {
      templateRemarkId: 85,
      remark:
        'Vitrified clay pipe (VCP) - VCP is a pipe made from a blend of clay and shale that has been subjected to high temperature to achieve vitrification, which results in a hard, inert ceramic.VCP is commonly used in gravity sewer collection mains because of its long life and resistance to almost all domestic and industrial sewage.',
      templateSubCategoryId: 24,
      type: 'Note',
    },
    {
      templateRemarkId: 86,
      remark:
        'The structure is equipped with cast iron waste and drain pipes. We recommend you ask the current owner about their knowledge of any past or present issues. When the pipes wear, rust corrodes the pipe and causes leaks and/or restricts flow. Also, deterioration or damage due to tree root systems can exist. Contact a licensed plumber for further investigations and/or repairs. Video scans on the condition of the interior of the lines are also available by many plumbing companies and recommended due to the age of the pipes.',
      templateSubCategoryId: 24,
      type: 'Note',
    },
    {
      templateRemarkId: 87,
      remark:
        'leaking around the drain pipe connections at the time of the inspection. Repair or replacement of the drain pipe or connection gaskets may be needed. We recommend contacting a qualified handy person or plumber for repairs.',
      templateSubCategoryId: 25,
      type: 'Condition',
      title: 'Yes - Leaking Drain',
    },
    {
      templateRemarkId: 88,
      remark:
        'The inspector has found evidence of several plumbing leaks beneath the home. This is an indication of a deteriorating condition. Due to several plumbing issues, and the age of the systems, we suggest you contact a licensed plumber for further investigations of the plumbing system and/or repairs.',
      templateSubCategoryId: 25,
      type: 'Condition',
      title: 'Plumbing Leaks',
    },
    {
      templateRemarkId: 89,
      remark:
        'An inspection of the readily accessible sections of the plumbing water supply, waste pipes, faucets, and fixtures identified no visible leaks at the time of the inspection unless noted in a specific section of the report. We recommend all visible pipes, fixtures, and plumbing systems be re-examined prior to the close of the transaction for any changes. A program of regular inspection by the homeowner should be considered in order to identify any visible leaks prior to causing any substantial damage.',
      templateSubCategoryId: 25,
      type: 'Condition',
      title: 'No',
    },
    {
      templateRemarkId: 90,
      remark:
        'The interior water flow in the house is low when multiple faucets are turned on. The house is equipped with galvanized water supply pipes. If the flow is inadequate for the resident, consideration will need to be given to upgrading the supply water pipes to copper in order to improve water flow and quality. Contact a licensed plumber for further evaluations.',
      templateSubCategoryId: 26,
      type: 'Condition',
      title: 'Galvanized Low Flow',
    },
    {
      templateRemarkId: 91,
      remark:
        'The interior water flow at [the master bathroom:selected;the hall bathroom;the bathrooms;various locations] is low when multiple faucets are turned on. Due to the existence of copper plumbing, the cause of this issue is not known. If the flow is not desirable, we recommend you contact a licensed plumber for further investigations and/or repairs.',
      templateSubCategoryId: 26,
      type: 'Condition',
      title: 'Copper Low Flow',
    },
    {
      templateRemarkId: 92,
      remark:
        'The inspector noted a considerable sulfur odor originating from the hot water in the house. This issue may indicate maintenance is needed, such as draining and treating of the water heater tank. We recommend contacting a qualified plumber for further evaluation and recommendations for repair.',
      templateSubCategoryId: 26,
      type: 'Condition',
      title: 'Sulfure / Odor',
    },
    {
      templateRemarkId: 93,
      remark:
        'There is a plumbing vent pipe that is currently terminating in the attic area. This could allow sewer gases from the plumbing system into the attic. We recommend contacting a qualified plumber and/or roofing contractor for repairs.',
      templateSubCategoryId: 26,
      type: 'Condition',
      title: 'Plumbing Vent Terminating in Attic',
    },
    {
      templateRemarkId: 94,
      remark:
        'The water pressure at the exterior faucets is lower than recommended. The recommended pressure is 40-70 psi. We recommend further evaluation and repairs for functional use.',
      templateSubCategoryId: 27,
      type: 'Condition',
      title: 'Low Flow / Pressure',
    },
    {
      templateRemarkId: 95,
      remark:
        'The water pressure at the exterior faucets is higher than recommended. The recommended water pressure is between 40 and 70 psi. We suggest the pressure regulator, which is installed at the main service entrance to the home, be adjusted or replaced to provide recommended pressure to the structure.',
      templateSubCategoryId: 27,
      type: 'Condition',
      title: 'High Flow / Pressure',
    },
    {
      templateRemarkId: 96,
      remark:
        'Note - Water pressure readings may fluctuate during certain periods of the day. The water pressure at this structure was tested at the main water line connection to the home or nearest location. The actual water pressure may vary from time to time. Periodic inspections of the water pressure are recommended.',
      templateSubCategoryId: 27,
      type: 'Note',
    },
    {
      templateRemarkId: 97,
      remark:
        'Note - Excessive water pressure can reduce the life expectancy of the plumbing lines, void warranties on certain appliances, and cause premature leaks in fittings and faucets.',
      templateSubCategoryId: 27,
      type: 'Note',
    },
    {
      templateRemarkId: 98,
      remark:
        'There was a rumbling/banging noise heard when one or more fixtures were turned on/off. The rumbling noise heard in the pipes is usually the result of loose pipes somewhere in the system. Vibration and rattling can cause other problems if not corrected.',
      templateSubCategoryId: 28,
      type: 'Condition',
      title: 'Rumbling / Banging Noise',
    },
    {
      templateRemarkId: 99,
      remark:
        'There was a banging noise heard at one or more fixtures when the fixtures were abruptly turned off. The banging noise in the plumbing system can be the result of a blocked vent, high water pressure, surge chamber, or loose pipes.',
      templateSubCategoryId: 28,
      type: 'Condition',
      title: 'Surge Bange',
    },
    {
      templateRemarkId: 100,
      remark:
        'There were visible encrustations at the time of the inspection. Encrustations (visible buildup of deposits) on the exterior of plumbing can be an early indication of issues developing. These areas should be monitored to see if a leak develops, or if the area worsens.',
      templateSubCategoryId: 28,
      type: 'Condition',
      title: 'Encrustations',
    },
    {
      templateRemarkId: 101,
      remark:
        'Mineral deposits indicate hard water at the property. Mineral deposits can affect the life of water heaters and other plumbing components.',
      templateSubCategoryId: 28,
      type: 'Condition',
      title: 'Mineral Deposits - Hard Water',
    },
    {
      templateRemarkId: 103,
      remark:
        'The waste ejector appeared to be functional at the time of the inspection. We recommend periodic inspections of the system for long-term functional use.',
      templateSubCategoryId: 30,
      type: 'Condition',
      title: 'Satisfactory - Ejector',
    },
    {
      templateRemarkId: 104,
      remark:
        'The drain for the sump pump was discharging next to the structure. The inspector recommends extending the drain away from the structure as a preventative measure. Sump pump drain extensions can be purchased from many home improvement stores.',
      templateSubCategoryId: 30,
      type: 'Condition',
      title: 'Sump pump Discharging Near Structure',
    },
    {
      templateRemarkId: 105,
      remark:
        'There was no battery backup installed for the sump pump. We recommend installing a battery backup as a preventative measure.',
      templateSubCategoryId: 30,
      type: 'Condition',
      title: 'No Batery Backup',
    },
    {
      templateRemarkId: 106,
      remark:
        'Consideration may need to be given to installing a sump pump or other modifications to help with the drainage of the property. Moisture beneath the home should be eliminated and/or minimized.',
      templateSubCategoryId: 30,
      type: 'Condition',
      title: 'No Sump Pump',
    },
    {
      templateRemarkId: 107,
      remark:
        'The condition of the original masonry firebox is not visible due to the installation of the current insert. If you plan on using the original fireplace, removal of the insert, and examination of the firebox and components would be necessary. We recommend contacting a qualified chimney inspection company for service if needed. The flue condition for this type of system is not visible.We recommend having the fireplace evaluated prior to use.',
      templateSubCategoryId: 64,
      type: 'Limitation',
      title: 'Not visible',
    },
    {
      templateRemarkId: 108,
      remark: 'The glass on the gas fireplace was foggy at the time of the inspection. Recommend cleaning of glass.',
      templateSubCategoryId: 64,
      type: 'Limitation',
      title: 'Foggy Glass',
    },
    {
      templateRemarkId: 109,
      remark:
        'There are discolorations on the interior of the glass pane. The item may be able to be cleaned or replaced.',
      templateSubCategoryId: 4,
      type: 'Condition',
      title: 'Discoloration- glass pane',
    },
    {
      templateRemarkId: 110,
      remark:
        'The glass panels have been removed from the front of the firebox area. We recommend reinstalling the panel doors to prevent items from leaving the firebox and/or in-room air from escaping. ',
      templateSubCategoryId: 64,
      type: 'Condition',
      title: 'Missing- Glass panes',
    },
    {
      templateRemarkId: 111,
      remark: 'Fireplace has deteriorated mortar joints on the facade. Recommend re-pointing.',
      templateSubCategoryId: 64,
      type: 'Condition',
      title: 'RE-pointing Fireplace',
    },
    {
      templateRemarkId: 112,
      remark:
        'Fireplace and flue have buildup typical of a fireplace which is used. I recommend cleaning once a year to keep serviceable and safe.',
      templateSubCategoryId: 64,
      type: 'Condition',
      title: ' Buildup in fire place',
    },
    {
      templateRemarkId: 113,
      remark: 'The fireplace has been sealed and is not in use anymore. It is now only used for decoration.',
      templateSubCategoryId: 64,
      type: 'Condition',
      title: 'Decorative only - Fireplace',
    },
    {
      templateRemarkId: 114,
      remark:
        'Fireplace screen was missing in front of fireplace. Fire logs can split, so this is recommended as a safety precaution. ',
      templateSubCategoryId: 64,
      type: 'Condition',
      title: 'Missing Screening',
    },
    {
      templateRemarkId: 115,
      remark:
        'There were cracks and deterioration noted at the rear of the firebox area. Appropriate repairs, patching, and/or use of a heat shield are recommended to prevent further deterioration. We recommend having the fireplace evaluated prior to use.',
      templateSubCategoryId: 65,
      type: 'Condition',
      title: 'Cracks - Firebox',
    },
    {
      templateRemarkId: 116,
      remark:
        'There are loose and cracked bricks in the firebox area. Installing a heat shield or other repairs may be necessary for continued use. We recommend having the fireplace evaluated prior to use.',
      templateSubCategoryId: 65,
      type: 'Condition',
      title: 'Missing - Heal Shield ',
    },
    {
      templateRemarkId: 117,
      remark:
        'There was inadequate clearance. The manufacturers recommended clearances to combustible items do not appear to have been met. Typically a minimum of 18"-24" of clearance is needed, depending on the manufacturers recommendations. Adding a fire retardant matt or other modifications are suggested. We recommend having the fireplace evaluated prior to use.',
      templateSubCategoryId: 65,
      type: 'Condition',
      title: 'Inadequate- clearance',
    },
    {
      templateRemarkId: 118,
      remark:
        'The interior of the firebox area has been painted. Only a hi-temperature paint is allowed as a coating inside the firebox area. The current coating cannot be positively identified; however, it does not appear to be a hi-temperature coating and would be recommended to be removed if not a proper material.We recommend having the fireplace evaluated prior to use.',
      templateSubCategoryId: 65,
      type: 'Condition',
      title: 'Paint- improper material',
    },
    {
      templateRemarkId: 119,
      remark:
        'Some of the flue condition was not visible during the inspection. Due to the presence of the original brick lining, we recommend you inquire with the owner for the last time the flue has been cleaned or inspected. we recommend you contact a fireplace inspection company for service.',
      templateSubCategoryId: 66,
      type: 'Limitation',
      title: 'Not visible',
    },
    {
      templateRemarkId: 120,
      remark:
        'Due to the build-up of debris visible in the fireplace, it is recommended to have the fireplace system cleaned and inspected by a qualified chimney inspection company prior to use. Also, periodic cleanings depending on the amount of use is necessary for continued safe use.',
      templateSubCategoryId: 66,
      type: 'Condition',
    },
    {
      templateRemarkId: 121,
      remark:
        'There is a cracked flue liner near the top of the flue. We recommend you contact a chimney inspection company for evaluation/repairs.',
      templateSubCategoryId: 66,
      type: 'Condition',
      title: 'Cracked- flue liner',
    },
    {
      templateRemarkId: 122,
      remark:
        'There was not a metal fire-block flashing noted above the fireplace, as seen from the attic. A metal fire block is recommended to prevent flames from spreading to the area above. ',
      templateSubCategoryId: 66,
      type: 'Condition',
      title: 'Metal Fire block flashing',
    },
    {
      templateRemarkId: 123,
      remark: 'During the inspection damper was inoperable, which could allow toxic fumes into the home. ',
      templateSubCategoryId: 66,
      type: 'Condition',
      title: 'Damper- Inoperable.',
    },
    {
      templateRemarkId: 124,
      remark:
        'The Damper Clamp is missing. If the Damper is not open when the pilot light is lit, this could cause carbon monoxide to flow into the home, instead of exhausted out.Recommend further evaluation by a fireplace technician, and repair.',
      templateSubCategoryId: 66,
      type: 'Condition',
      title: 'Missing - Damper clamp',
    },
    {
      templateRemarkId: 125,
      remark:
        'The fireplace does not have a proper flue cap damper or firebox recommend a licensed contractor evaluate and repair before use.',
      templateSubCategoryId: 66,
      type: 'Condition',
      title: 'Missing- Flue cap',
    },
    {
      templateRemarkId: 126,
      remark:
        'The damper has been dismantled/removed to prevent the door from closing. This is to allow gas fumes, if a leak develops, to exhaust up the flue and not into the living space.',
      templateSubCategoryId: 66,
      type: 'Condition',
      title: 'Dismantled/removed',
    },
    {
      templateRemarkId: 127,
      remark:
        'The damper handle has been removed to prevent the door from closing. This is to allow gas fumes, if a leak develops, to exhaust up the flue and not into the living space.',
      templateSubCategoryId: 66,
      type: 'Note',
    },
    {
      templateRemarkId: 128,
      remark:
        'The insert  is beyond the scope of a home inspection to examine or remove this item; however, there is always the possibility of an issue with this type of system. A thorough inspection of the unit would require the removal of the unit from the firebox. We suggest you question the seller regarding the operation of the unit and contact a qualified chimney company for evaluation and service prior to use.',
      templateSubCategoryId: 67,
      type: 'Limitation',
      title: 'Out of scope ',
    },
    {
      templateRemarkId: 129,
      remark:
        'There is a cracked glass pane at the door of the wood-burning insert. The replacement may be necessary for continued use. We recommend contacting a fireplace store or qualified chimney service for estimates of repair',
      templateSubCategoryId: 67,
      type: 'Condition',
      title: 'Insert- Cracked glass',
    },
    {
      templateRemarkId: 130,
      remark:
        'There fire place gas system was installed; however, no gas was heard or detected coming from the valve/pipe. Check with the current owner if the gas is operating in this area. Further investigations may be necessary to find the cause and remedy. We recommend contacting a qualified chimney inspection company for a detailed inspection prior to use.',
      templateSubCategoryId: 68,
      type: 'Condition',
      title: 'No Gas from pipe',
    },
    {
      templateRemarkId: 131,
      remark:
        'There was a direct-vent gas-log fireplace in the living room. The gas valve was not turned and it was not ignited/tested at the time of the inspection. We recommend you ask the current owner about their knowledge of the current condition of the unit, or refer to any past reports, or disclosures. We recommend the unit be properly tested prior to ',
      templateSubCategoryId: 68,
      type: 'Condition',
      title: 'Direct-vent gas log',
    },
    {
      templateRemarkId: 132,
      remark:
        'There was a gas lof fireplace. The unit was not ignited/tested at the time of the inspection. We recommend you verify with the owner as to the current condition and any potential issues or disclosure items. Contact a qualified chimney inspection company for a detailed inspection prior to use.',
      templateSubCategoryId: 68,
      type: 'Condition',
      title: 'gas log system',
    },
    {
      templateRemarkId: 133,
      remark:
        'There was a wood-burning fireplace in the home. We recommend you verify with the owner the current condition and any potential issues or disclosure items. Contact a qualified chimney inspection company for a detailed inspection prior to use.',
      templateSubCategoryId: 68,
      type: 'Condition',
      title: 'Wood burning ',
    },
    {
      templateRemarkId: 134,
      remark:
        'There was a wood-burning fireplace .Also, there is a gas system installed. The gas valve was not turned and/or ignited at the time of the inspection. We recommend you verify with the owner as to the current condition and any potential issues or disclosure items. We recommend contacting a qualified chimney inspection company for a detailed inspection prior to use.',
      templateSubCategoryId: 68,
      type: 'Condition',
      title: 'Wood burning w/ Gas System',
    },
    {
      templateRemarkId: 136,
      remark:
        'This inspection does not cover code clearances or improper installation. Also, any pre-fabricated or manufactured fireplace systems may require additional inspections by a certified chimney inspection company. In some jurisdictions, a Level II chimney inspection may be required. For additional information and if certification is desired, contact a fireplace inspection service.',
      templateSubCategoryId: 68,
      type: 'Note',
    },
    {
      templateRemarkId: 137,
      remark:
        'There is a past recall which involves all HEAT-N-GLO gas log fireplaces.Note - Consumers should stop using the fireplaces immediately and contact Heat & Glo to make arrangements for a free repair. To be sure that no one uses the fireplace by mistake, consumers should shut off the gas supply to the fireplace by removing the lower grille on the fireplace and turning off the ball valve (red lever) on the gas supply line. For assistance in turning off the gas and arranging for a free repair, contact Heat & Glo at (800) 215-5152 between 8 a.m. and 10 p.m. CT Monday through Friday or log on to firm',
      templateSubCategoryId: 68,
      type: 'Note',
    },
    {
      templateRemarkId: 138,
      remark:
        'The inspector observed that the ductwork in the attic was not insulated. This could have caused energy loss, decreased efficiency, and increased wear and tear on the HVAC system. We recommend having a qualified HVAC technician evaluate the ductwork and add insulation to improve the energy efficiency of the system.',
      templateSubCategoryId: 35,
      type: 'Condition',
      title: 'Duct work not insualted in attic',
    },
    {
      templateRemarkId: 139,
      remark:
        'The inspector observed that there is no ductwork in some areas of the home, resulting in non-heated areas. This can cause lower temperatures in these areas and may require additional insulation or other measures to prevent heat loss and potential damage to plumbing or other systems. We recommend evaluating and addressing any non-heated areas in the home to ensure the safe and efficient operation of the homes systems.',
      templateSubCategoryId: 35,
      type: 'Condition',
      title: 'Non heated areas',
    },
    {
      templateRemarkId: 140,
      remark:
        'The inspector observed that the furnace filter was dirty. A dirty filter can restrict airflow, reduce efficiency, and potentially lead to damage to the furnace. We recommend replacing the filter with a new one of the appropriate size and type. Regular replacement of the furnace filter is an important aspect of furnace maintenance and helps ensure its safe and efficient operation.',
      templateSubCategoryId: 34,
      type: 'Condition',
      title: 'Dirty Filter',
    },
    {
      templateRemarkId: 141,
      remark:
        'The inspector observed that the HVAC units have not been serviced recently. Regular maintenance and servicing of the HVAC system are important to ensure its safe and efficient operation, prevent potential mechanical failures, and prolong its lifespan. We recommend having a qualified HVAC technician evaluate and service the system to ensure that it is functioning optimally and identify any potential issues that may need to be addressed.',
      templateSubCategoryId: 34,
      type: 'Condition',
      title: 'Not recently serviced',
    },
    {
      templateRemarkId: 142,
      remark:
        'The inspector observed that the condensing coil of the HVAC unit was covered with debris and dirt accumulation. This can cause the system to work harder than necessary, reducing its efficiency and potentially leading to mechanical failure. We recommend having a qualified HVAC technician evaluate and service the unit, including cleaning the condensing coil, to ensure proper functioning and optimal energy efficiency.',
      templateSubCategoryId: 33,
      type: 'Condition',
      title: 'Condensing coil debris ',
    },
    {
      templateRemarkId: 143,
      remark:
        'The inspector observed that the insulation around the pressure lines for the air conditioner was missing. This can cause energy loss, reduced efficiency, and increased wear and tear on the system. We recommend having a qualified HVAC technician evaluate and service the unit, including repairing or replacing any missing insulation around the pressure lines, to ensure proper functioning and optimal energy efficiency.',
      templateSubCategoryId: 33,
      type: 'Condition',
      title: 'Insulation around pressure lines missing',
    },
    {
      templateRemarkId: 144,
      remark:
        'The inspector observed that the air conditioning unit is no longer level. This can cause issues with the proper drainage of condensate and can lead to decreased efficiency, mechanical failure, or other potential issues. We recommend having a qualified HVAC technician evaluate and address the leveling issue to ensure proper functioning and optimal energy efficiency of the unit.',
      templateSubCategoryId: 33,
      type: 'Condition',
      title: 'A/C Unit not level',
    },
    {
      templateRemarkId: 145,
      remark:
        'The inspector tested the gas furnace during the inspection, but it did not turn on. Further evaluation by a qualified HVAC technician is recommended to diagnose and repair the issue prior to closing. It is important to ensure that the furnace is functioning properly to maintain a safe and comfortable living environment.',
      templateSubCategoryId: 32,
      type: 'Condition',
      title: 'Furnace did not respond ',
    },
    {
      templateRemarkId: 146,
      remark:
        'The inspector noted a mechanical noise coming from the furnace during operation. We recommend having a qualified HVAC technician evaluate and service the furnace to diagnose the issue and prevent any potential mechanical failure or safety hazards. Regular maintenance and servicing of the furnace are important to ensure its safe and efficient operation.',
      templateSubCategoryId: 32,
      type: 'Condition',
      title: 'Mechanical Noise from Furnace',
    },
    {
      templateRemarkId: 147,
      remark:
        'The inspector noted that the air conditioner did not have a satisfactory temperature differential between the return and register during operation. This may indicate an issue with the refrigerant level, airflow, or other components of the cooling system. We recommend having a qualified HVAC technician evaluate and repair the air conditioner to improve its performance and ensure optimal cooling capacity.',
      templateSubCategoryId: 32,
      type: 'Condition',
      title: 'Temperature differential not satisfactory',
    },
    {
      templateRemarkId: 148,
      remark:
        'The furnace and air conditioner appear to be original to the structure. The typical life expectancy of a furnace is 15-20 years and 12-15 years for an air conditioner. An on/off test was performed on the furnace and the furnace appeared to be functional at the time of the inspection. Consideration should be given to budgeting for replacement due to the age of these units.',
      templateSubCategoryId: 31,
      type: 'Condition',
      title: 'Functional Older Units',
    },
    {
      templateRemarkId: 149,
      remark:
        'It appears that a number of updates and modifications have been made to the original structure at some time during the life of the structure. The inspector recommends questioning the seller to determine if any of the updates were performed during their ownership, whether any permits were needed and if so obtained, as well as who performed the updates. In addition, requesting any warranty information on materials or workmanship is recommended.',
      templateSubCategoryId: 18,
      type: 'Note',
    },
    {
      templateRemarkId: 150,
      remark:
        'The structure has been extensively upgraded or remodeled. We recommend you ask the owner for a list of all past remodel work, investigate any/all building permits, if the work completed was performed by a licensed trades person to industry standards, and any transferable warranties. If remodel work was done without permits, we recommend contacting a local qualified contractor and/or local municipalities to determine if the installations meet current standards, and/or what steps may be necessary to obtain a proper permit.',
      templateSubCategoryId: 18,
      type: 'Note',
    },
    {
      templateRemarkId: 151,
      remark:
        'This is a newer construction structure. We recommend you investigate all building permits, if the work completed was performed by a licensed tradesperson to industry standards and any transferable warranties.',
      templateSubCategoryId: 18,
      type: 'Note',
    },
    {
      templateRemarkId: 152,
      remark:
        ' The inspection is not intended to identify the presence of wood-destroying organisms, such as termites, carpenter ants, or wood-boring beetles. As od now it is out of scope as detection of wood-destroying organisms requires a separate inspection by a qualified specialist. Therefore, it is recommended that a separate inspection be performed by a licensed pest control professional to evaluate the presence of wood-destroying organism, and to provide treatment and remediation option, if needed. This inspection report should not be relied upon as a substitute for a wood-destroying organism inspection.',
      templateSubCategoryId: 16,
      type: 'Limitation',
      title: 'out of scope',
    },
    {
      templateRemarkId: 153,
      remark:
        'The inspector noted mouse traps place in the crawl space area. It should be noted that this is a common issue and is typically seasonal. We recommend questioning the seller regarding past/present issues with animal infestation. ',
      templateSubCategoryId: 16,
      type: 'Condition',
      title: 'Rat traps',
    },
    {
      templateRemarkId: 154,
      remark: 'There is evidence of wood damage from wood-boring insects to the wood floors. ',
      templateSubCategoryId: 16,
      type: 'Condition',
      title: 'wdo/wdi',
    },
    {
      templateRemarkId: 155,
      remark:
        'The scope of this inspection does not include an asbestos in materials sampling inspection. However, the material on the duct work appeared to be a type known to contain asbestos. If this is a concern, we suggest you contact a certified asbestos inspector for testing. It should be noted that asbestos is very common in building materials in homes of this age and is not typically a health issue unless it becomes friable and/or airborne. For more information, contact the EPA or your local health department for brochures.',
      templateSubCategoryId: 15,
      type: 'Limitation',
      title: 'Out of scope',
    },
    {
      templateRemarkId: 156,
      remark:
        'There are areas of the attic which  display possible microbial growth, such as on the roof sheathing/framing. ',
      templateSubCategoryId: 15,
      type: 'Condition',
      title: 'Microbial growth',
    },
    {
      templateRemarkId: 157,
      remark:
        'There is debris under the structure which should be removed. There should be no storage of trash or debris, such as wood scraps or paper products in the structure crawl space in order to eliminate a source of food for pests and/or mold.',
      templateSubCategoryId: 15,
      type: 'Condition',
      title: 'Debris',
    },
    {
      templateRemarkId: 158,
      remark:
        'The exhaust vent has been wrapped in a material that has been known to contain asbestos. If this is a concern, we suggest you contact a certified asbestos inspector for testing. It should be noted that asbestos is very common in building materials in homes of this age and is not typically a health issue unless it becomes friable and/or airborne. For more information, contact the EPA or your local health department for brochures.',
      templateSubCategoryId: 15,
      type: 'Condition',
      title: 'Asbestos',
    },
    {
      templateRemarkId: 159,
      remark:
        'The inspector observed indications of a possible mold growth issue and excessive moisture or humidity.  It is important to address mold growth promptly to prevent potential health hazards and damage to the property.',
      templateSubCategoryId: 15,
      type: 'Condition',
      title: 'mold Growth',
    },
    {
      templateRemarkId: 160,
      remark:
        'Note - Mold/Mildew sampling/testing is not within the scope of this pre-drywall inspection. If this is a concern, we recommend contacting a qualified mold inspector for further evaluation and testing.The scope of this inspection does not include an asbestos in materials sampling and/or identification inspection. Structures built prior to or near 1978 may contain this material in certain substrates. If this is a concern, we suggest you contact a certified asbestos inspector or lab for testing."',
      templateSubCategoryId: 15,
      type: 'Note',
    },
    {
      templateRemarkId: 162,
      remark:
        'Parts of a crawlspace was inaccessible. This is an inspection restriction. I dont know whats going on inside parts of the crawlspace, because I could not enter. Access needs to be provided in order to inspect and evaluate the crawlspace condition in its entirety. ',
      templateSubCategoryId: 13,
      type: 'Limitation',
      title: 'Not accessible',
    },
    {
      templateRemarkId: 163,
      remark:
        'The basement has been finished. The inspector had limited view of the foundation floor and walls. It is recommended that the seller is questioned regarding any leaks in the foundation during their ownership.',
      templateSubCategoryId: 13,
      type: 'Limitation',
      title: 'Limited view',
    },
    {
      templateRemarkId: 164,
      remark:
        'Displacement cracks in excess of 1/4-inch, and bulges in the perimeter basement wall were evident in the basement area. The cracks do not appear to be recent; however, the size and displacement of the cracks justify further evaluation',
      templateSubCategoryId: 13,
      type: 'Condition',
      title: 'Displacement cracks',
    },
    {
      templateRemarkId: 165,
      remark:
        'The inspector noted indications that sometime in the past, there was water penetration or intrusion into the house. ',
      templateSubCategoryId: 13,
      type: 'Condition',
      title: 'Prior Water Penetration Observed',
    },
    {
      templateRemarkId: 166,
      remark:
        'The inspector observed efflorescence. Efflorescence is the white chalky powder that you might find on the surface of a concrete or brick wall. It can be a cosmetic issue, or it can be an indication of moisture intrusion that could lead to structural and indoor air quality issues. The presence of efflorescence in the inspection report because it generally occurs where there is excess moisture, a condition that also encourages the growth of mold. ',
      templateSubCategoryId: 13,
      type: 'Condition',
      title: 'Efflorescence Observed',
    },
    {
      templateRemarkId: 167,
      remark:
        'The inspector observed indications of poor workmanship and poor construction techniques. There are structural concerns because of this poor construction and building practice in this area. There can be possible major defects.',
      templateSubCategoryId: 13,
      type: 'Condition',
      title: 'Improper Construction Practices',
    },
    {
      templateRemarkId: 168,
      remark:
        'There is a floor joist that has been cut to allow for plumbing lines. This floor joist should be repaired to prevent sagging in the floor area.',
      templateSubCategoryId: 13,
      type: 'Condition',
      title: 'Floor joists',
    },
    {
      templateRemarkId: 169,
      remark:
        'The inspector noted that the insulation in the crawlspace has been installed upside down. This means that the vapor barrier is facing towards the crawlspace rather than towards the living space of the home. This can lead to moisture buildup and potentially result in mold growth, as well as decreased energy efficiency of the home. We recommend that the insulation be properly installed with the vapor barrier facing towards the living space to prevent any moisture issues and to maximize energy efficiency.',
      templateSubCategoryId: 13,
      type: 'Condition',
      title: 'Insulation Installed Upside Down in Crawlspace',
    },
    {
      templateRemarkId: 170,
      remark:
        'The inspector noted leaks in the foundation during the home inspection.  It should be noted that older brick foundations have a tendency to leak/seep during periods of rainfall and/or adverse weather. ',
      templateSubCategoryId: 12,
      type: 'Condition',
      title: 'Leaks ',
    },
    {
      templateRemarkId: 171,
      remark:
        'The current foundation is known as a post and pier foundation. No concrete perimeter foundation exists in order to bolt the frame of the structure. This is an older type of construction system but is no longer a common building practice.',
      templateSubCategoryId: 12,
      type: 'Condition',
      title: ' post and pier',
    },
    {
      templateRemarkId: 172,
      remark:
        'The inspector noted possible foundation movement during the home inspection. Foundation movement can affect the stability and safety of the home, potentially leading to costly repairs in the future.',
      templateSubCategoryId: 12,
      type: 'Condition',
      title: 'Possible foundation movement',
    },
    {
      templateRemarkId: 173,
      remark:
        'The inspector noted possible foundation movement during the home inspection, indicated by an out-of-square door frame. Foundation movement can affect the stability and safety of the home, potentially leading to costly repairs in the future',
      templateSubCategoryId: 12,
      type: 'Condition',
      title: 'Possible foundation movement-out of square door frame',
    },
    {
      templateRemarkId: 174,
      remark:
        'The inspector noted a minor foundation crack during the home inspection. While it may not be a cause for immediate concern, it is important to monitor and address any cracks in the foundation to prevent them from growing.',
      templateSubCategoryId: 12,
      type: 'Condition',
      title: 'Foundation cracks - minor',
    },
    {
      templateRemarkId: 175,
      remark:
        'The inspector noted a major foundation crack in the home. This type of crack is considered scan compromise the overall stability of the foundation if delayed further. ',
      templateSubCategoryId: 12,
      type: 'Condition',
      title: 'Foundation cracks - major',
    },
    {
      templateRemarkId: 176,
      remark:
        'Minor cracks at the corners of doors and windows in walls. Appeared to be the result of long-term settling. Some settling is not unusual in a home of this age and these cracks are not a structural concern.',
      templateSubCategoryId: 11,
      type: 'Condition',
      title: 'Minor cracks',
    },
    {
      templateRemarkId: 177,
      remark:
        'The inspector noted protruding nail heads visible at the time of the inspection appeared to be the result of contact with moisture. After the source of moisture is located and corrected, protruding nails should be removed, drywall re-fastened and the drywall finished to match the existing wall surfaces. ',
      templateSubCategoryId: 11,
      type: 'Condition',
      title: 'Nail Pops',
    },
    {
      templateRemarkId: 178,
      remark:
        'There are various drywall cracks in the walls and ceilings in the home. Typically, these cracks are cosmetic and are due to structure movement. We recommend touching-up the affected areas and monitoring these areas for changes.',
      templateSubCategoryId: 11,
      type: 'Condition',
      title: 'dry wall  cracks',
    },
    {
      templateRemarkId: 179,
      remark:
        'The inspector noted minor damage on walls, including scratches, scuffs, or small dents, which could be easily repaired with touch-up paint or spackling compound.',
      templateSubCategoryId: 11,
      type: 'Condition',
      title: 'Minor damage',
    },
    {
      templateRemarkId: 180,
      remark:
        'The inspector noted stains on the carpets, which may require professional cleaning or replacement to improve the appearance and air quality of the home.',
      templateSubCategoryId: 11,
      type: 'Condition',
      title: 'Stains on carpet',
    },
    {
      templateRemarkId: 181,
      remark:
        'The inspector noted moisture stains. A moisture reading was taken at the affected areas and these areas appeared to be dry at the time of the inspection. We recommend questioning the seller regarding their knowledge of this issue, and monitoring these areas in order to determine if further action is warranted.',
      templateSubCategoryId: 11,
      type: 'Condition',
      title: 'Moisture stains ',
    },
    {
      templateRemarkId: 182,
      remark:
        'The inspector noted missing tiles from floors, which may pose a tripping hazard and require replacement to ensure safety.',
      templateSubCategoryId: 11,
      type: 'Condition',
      title: 'Missing tiles',
    },
    {
      templateRemarkId: 183,
      remark:
        'The inspector noted loose tiles from the floors, which may pose a tripping hazard and should be repaired to ensure safety.',
      templateSubCategoryId: 11,
      type: 'Condition',
      title: 'Loose tiles',
    },
    {
      templateRemarkId: 184,
      remark:
        'Testing for Carbon Monoxide (CO) is NOT within the scope of a home inspection, according to the national standards of ASHI. This inspector did NOT conduct a test for CO at this time. However, the inspector may note in the report if any adverse conditions exist which may present this type of health and safety issue. We recommend CO detectors be purchased and installed in the structure(s) according to manufacturers instructions, and all fuel-fired appliances be serviced and inspected per manufacturers directions. For more information on carbon monoxide (CO), see also:http://www.epa.gov/air/urbanair/co/index.htmlhttp://www.carbon-monoxide-poisoning.com',
      templateSubCategoryId: 41,
      type: 'Limitation',
      title: 'out of scope',
    },
    {
      templateRemarkId: 185,
      remark:
        'The home did not appear to be equipped with carbon monoxide (CO) detectors. CO detectors are recommended in all homes where there is a possible source of CO present in the home, such as gas burning appliances, water heaters, heating systems, fireplace(s), and/or an attached garage. We recommend installing an appropriate amount of CO detectors prior to occupying the structure.',
      templateSubCategoryId: 41,
      type: 'Condition',
      title: 'Missing Co detectors',
    },
    {
      templateRemarkId: 186,
      remark:
        'The smoke detector(s) in the home appear to be 10 years old or older. Fire safety officials recommend replacing the smoke detector(s) every 10 years. Due to the age of the smoke detectors, the inspector recommends replacement at this time.',
      templateSubCategoryId: 41,
      type: 'Condition',
      title: 'Old smoke detectors',
    },
    {
      templateRemarkId: 187,
      remark:
        'There did not appear to be any functional smoke detectors at the property. Presently, current building standards require a smoke alarm in 1) each bedroom, 2) centrally located outside each sleeping area and 3) on every floor including the basement regardless of whether there is a sleeping area on the floor. The inspector recommends installing smoke detectors prior to occupancy.',
      templateSubCategoryId: 41,
      type: 'Condition',
      title: 'Missing smoke detectors',
    },
    {
      templateRemarkId: 188,
      remark:
        'The inspector observed that there were missing GFCI (Ground Fault Circuit Interrupter) outlets. GFCI outlets are designed to protect against electric shock and are required in certain areas of the home, such as bathrooms, kitchens, and outdoor areas. We recommend installing GFCI outlets in any areas where they are missing to improve safety and protect against electrical hazards.',
      templateSubCategoryId: 40,
      type: 'Condition',
      title: 'Missing GFCI outelts ',
    },
    {
      templateRemarkId: 189,
      remark:
        'The inspector observed that a GFCI (Ground Fault Circuit Interrupter) outlet did not trip during testing. GFCI outlets are designed to protect against electric shock by quickly shutting off power if a ground fault is detected. If a GFCI outlet does not trip, it may be defective or wired incorrectly, and may not provide the intended protection against electrical hazards. We recommend having a qualified electrician evaluate and address the non-tripping GFCI outlet to ensure proper functioning and improved safety.',
      templateSubCategoryId: 40,
      type: 'Condition',
      title: 'GFCI did not trip',
    },
    {
      templateRemarkId: 190,
      remark:
        'The inspector observed that AFCI (Arc Fault Circuit Interrupter) breakers were present, but they were not tested during the inspection. AFCI breakers are designed to detect and prevent electrical arcs, which can cause fires. It is important to test them periodically to ensure proper functioning and improved safety. We recommend having a qualified electrician test the AFCI breakers and address any issues identified to ensure proper functioning and improved safety.',
      templateSubCategoryId: 40,
      type: 'Condition',
      title: 'AFCI breakers installed not tested',
    },
    {
      templateRemarkId: 191,
      remark:
        'The inspector observed that there were missing outlet covers. Outlet covers are designed to prevent accidental contact with live electrical wires, which can be dangerous. We recommend installing outlet covers on any missing outlets to improve safety and prevent electrical hazards.',
      templateSubCategoryId: 39,
      type: 'Condition',
      title: 'Missing outlet covers',
    },
    {
      templateRemarkId: 192,
      remark:
        'The inspector observed that the hot and neutral wires were reversed at an outlet. Reversing the hot and neutral wires can create a potentially hazardous condition, which can result in electrical shock or damage to equipment. We recommend having a qualified electrician evaluate and address any reversed hot and neutral wires to ensure proper wiring and improved safety.',
      templateSubCategoryId: 39,
      type: 'Condition',
      title: 'Hot nuetral wires reversed',
    },
    {
      templateRemarkId: 193,
      remark:
        'The inspector observed that there were open junction boxes noted in the home. Open junction boxes can expose electrical wiring and create a potential safety hazard, especially if they are located in accessible areas. We recommend having a qualified electrician evaluate and address any open junction boxes in the home to ensure proper wiring and improved safety.',
      templateSubCategoryId: 39,
      type: 'Condition',
      title: 'Open junction boxes',
    },
    {
      templateRemarkId: 194,
      remark:
        'The inspector observed that some outlets did not have power. Outlets that do not have power may be caused by a variety of factors, including tripped circuit breakers, damaged wiring, or other issues. We recommend having a qualified electrician evaluate and address any outlets that do not have power to identify the cause of the problem and ensure proper functioning and improved safety.',
      templateSubCategoryId: 39,
      type: 'Condition',
      title: 'Outlets no power',
    },
    {
      templateRemarkId: 195,
      remark:
        'The inspector was not able to visually verify the main ground for the electrical system. Many times the ground wire is attached to a ground rod or UFER rod, which is not readily visible. We recommend questioning the seller regarding their knowledge of any main grounding wire for the electrical system.',
      templateSubCategoryId: 38,
      type: 'limitation',
      title: 'main ground not located',
    },
    {
      templateRemarkId: 196,
      remark:
        'There were [two:selected;three;several;multiple] breakers in the [electrical:selected;main electrical;sub electrical] [panel:selected;panels] that were double-tapped (two wires leading to one breaker). This issue may overload the breakers or promote loose connections. ',
      templateSubCategoryId: 37,
      type: 'Condition',
      title: 'Double taps ',
    },
    {
      templateRemarkId: 197,
      remark:
        'There was no main breaker installed in the electrical panel. The electrical panel is recommended to contain a means of disconnecting all the electrical power to the home with no more than 6 hand movements (a maximum of 6 breakers without a main). ',
      templateSubCategoryId: 37,
      type: 'Condition',
      title: 'Exceeds 6 Throws',
    },
    {
      templateRemarkId: 198,
      remark:
        'There [:selected;was a breaker;were breakers] in the "off" position at the [electrical:selected;main electrical;sub electrical] [panel.:selected;panels.] Breakers cannot be turned "on" without permission from the seller. The inspector recommends questioning the seller regarding the operation and condition of the affected breakers.',
      templateSubCategoryId: 37,
      type: 'Condition',
      title: 'Breakers OFF',
    },
    {
      templateRemarkId: 199,
      remark:
        'There [was a;were:selected] [Square-D:selected;Challenger;Murray;Seimens;Cutler-Hammer;GE;multiple] brand [breaker:selected;breakers] installed in a [Square-D:selected;Challenger;Seimens;Cutler-Hammer;Murray;GE;I.T.E.] electrical panel. The installation may be functional; however, using another manufacturers breaker may void certain warranties and/or promote other issues. ',
      templateSubCategoryId: 37,
      type: 'Condition',
      title: 'Brand of Breakers',
    },
    {
      templateRemarkId: 200,
      remark:
        'There [is an open breaker slot:selected;are open breakers slots] in the [electrical:selected;main electrical;sub electrical] [panel cover.:selected;panel covers.] This issue may allow someone to stick objects into the [opening:selected;openings] that could result in electrical shock. [A blank out:selected;Blank outs] should be installed as a preventive safety measure. Note: Blank outs are inexpensive and can be purchased at most home improvement stores.',
      templateSubCategoryId: 37,
      type: 'Condition',
      title: 'Open Breaker Slots',
    },
    {
      templateRemarkId: 201,
      remark:
        'The electrical [electrical:selected;main electrical;sub electrical] [panel is:selected;panels are] labeled [Federal Pacific, the manufacturers of Stab-Lok electrical panels.:selected;Federal Pacific.] Faulty breakers, poor breaker connections and other defects with this manufacturers electrical panels have been reported, and may represent a safety concern. Due to these issues or the price and availability of parts, in some cases an electrician will recommend the [panel is:selected;panels are] replaced on site.',
      templateSubCategoryId: 37,
      type: 'Condition',
      title: 'FPE Stablock',
    },
    {
      templateRemarkId: 202,
      remark:
        'The breakers were not [completely labeled:selected;labeled] for use at the [electrical:selected;main electrical;sub electrical] [panel.:selected;panels.] We recommend appropriately labeling the panel to show the circuits supplied by each breaker.',
      templateSubCategoryId: 37,
      type: 'Condition',
      title: 'Breakers Not Labeled',
    },
    {
      templateRemarkId: 203,
      remark:
        'The clothes washer and/or dryer are typically not tested during part of a home inspection, unless otherwise noted in this report. The inspector is not able to wash or dry clothes in order to actually test the appliances. If the appliances are to remain, we recommend you ask the current owner/occupant as to their condition and operation.',
      templateSubCategoryId: 77,
      type: 'Limitation',
    },
    {
      templateRemarkId: 204,
      remark:
        'Inspecting refrigerators is not within the scope of a home inspection, and are typically not covered by most standard home warranty companies. If the unit is built-in or remains with the home, we recommend verifying the age and current condition of the unit prior to closing.',
      templateSubCategoryId: 75,
      type: 'Limitation',
      title: 'Out of scope',
    },
    {
      templateRemarkId: 205,
      remark: 'The inspector noted that the water line was apparently disconnected at the refrigerator. ',
      templateSubCategoryId: 75,
      type: 'Condition',
      title: 'waterline was disconnected',
    },
    {
      templateRemarkId: 206,
      remark:
        'The inspector noted an inoperable refrigerator, which may require repair or replacement to ensure proper functioning.',
      templateSubCategoryId: 75,
      type: 'Condition',
      title: 'inoperable ',
    },
    {
      templateRemarkId: 207,
      remark:
        'There is a water line connection for the refrigerator. This water supply is used and required for automatic ice machines. Also, the interior of the refrigerator and freezer were cold when tested; however, a thorough inspection/test of this system is not possible. We recommend you ask the current owner as to the condition of the appliance.',
      templateSubCategoryId: 75,
      type: 'Condition',
      title: 'Ice maker ',
    },
    {
      templateRemarkId: 208,
      remark: 'The inspector noted that the appliance is very old and may not function efficiently.',
      templateSubCategoryId: 74,
      type: 'Condition',
      title: 'Old appliance',
    },
    {
      templateRemarkId: 209,
      remark: 'The inspector noted missing control knobs of the oven and stove.',
      templateSubCategoryId: 74,
      type: 'Condition',
      title: 'Missing control knobs',
    },
    {
      templateRemarkId: 210,
      remark: 'The inspector noted that the oven is not heating properly during the inspection.',
      templateSubCategoryId: 74,
      type: 'Condition',
      title: 'Not heating',
    },
    {
      templateRemarkId: 211,
      remark:
        'The anti-tip bracket does not appear to be installed on the oven to prevent the oven from tipping forward if something heavy is set on an open oven door. The inspector would recommend adding this to the appliance as a preventive safety consideration.',
      templateSubCategoryId: 74,
      type: 'Condition',
      title: 'Anti-tip Bracket',
    },
    {
      templateRemarkId: 212,
      remark: 'The control knobs lettering/numbering was worn on the existing stove. ',
      templateSubCategoryId: 74,
      type: 'Condition',
      title: 'Lettering/numbering worn out',
    },
    {
      templateRemarkId: 213,
      remark: 'The inspector noted that there was a missing shutoff valve for the gas supply to the appliance. ',
      templateSubCategoryId: 74,
      type: 'Condition',
      title: 'No Gas Shut-off Valve',
    },
    {
      templateRemarkId: 214,
      remark:
        'The inspector noted a defect at the stove/oven plug. A 4-wire circuit is required for cord and plug connected free standing ranges/stove/oven appliances. Its typically wired with a 50-amp circuit on a #6/3 with ground copper cable. ',
      templateSubCategoryId: 74,
      type: 'Condition',
      title: '4-Wire Stove/Oven Plug Defect',
    },
    {
      templateRemarkId: 215,
      remark:
        'The microwave was turned on. I do nothing more than that. Microwaves are beyond the scope of a home inspection.',
      templateSubCategoryId: 73,
      type: 'Limitation',
      title: 'Out of scope',
    },
    {
      templateRemarkId: 216,
      remark:
        'The inspector noted an improper mounting of the microwave during the home inspection. Improper mounting can cause the microwave to become unstable and potentially fall, causing damage to the appliance .',
      templateSubCategoryId: 73,
      type: 'Condition',
      title: 'improper mounting',
    },
    {
      templateRemarkId: 217,
      remark:
        'The inspector noted that the microwave was not functional during the home inspection. A non-functional microwave can cause inconvenience to the occupants and affect the functioning of the kitchen. ',
      templateSubCategoryId: 73,
      type: 'Condition',
      title: 'not functional ',
    },
    {
      templateRemarkId: 218,
      remark:
        'The inspector noted a crack on the microwave during the home inspection. A crack in the microwave can affect the safe functioning of the appliance',
      templateSubCategoryId: 73,
      type: 'Condition',
      title: 'Crack on micriwave',
    },
    {
      templateRemarkId: 219,
      remark:
        'Portions of the deck foundation, or underside of the deck, are not accessible due to the type of installation. Issues may exist under the deck which is not visible. If the examination is needed, we suggest some deck boards be removed for a thorough examination. Contact a licensed pest company or appropriate trade for further examination',
      templateSubCategoryId: 19,
      type: 'Limitation',
      title: 'Deck- not visible fully',
    },
    {
      templateRemarkId: 220,
      remark: 'The concrete pavers are in good condition, and add a positive appeal to the property.',
      templateSubCategoryId: 19,
      type: 'Condition',
      title: 'Pavers- good condition',
    },
    {
      templateRemarkId: 221,
      remark:
        'The fiberglass cover over the  patio area is in satisfactory condition, however, this type of material is prone to deterioration/leaks.',
      templateSubCategoryId: 19,
      type: 'Condition',
      title: 'Fiberglass cover',
    },
    {
      templateRemarkId: 222,
      remark:
        'There was a plastic roof installed below the deck supports. These areas were not visible for inspection. It should be noted that this configuration can hold water against the deck supports and can allow moisture to collect near the structure if not properly pitched. We recommend monitoring this area in order to determine if further action is needed.',
      templateSubCategoryId: 20,
      type: 'Limitation',
      title: 'Plastic roof below deck',
    },
    {
      templateRemarkId: 223,
      remark:
        'The concrete patio, needs repair. There are displacement cracks and unevenness in the surface material. The surface areas should be repaired to prevent further deterioration and a tripping issue. ',
      templateSubCategoryId: 20,
      type: 'Condition',
      title: 'cracks in  patio surface',
    },
    {
      templateRemarkId: 224,
      remark:
        'The decks at the structure need attention. There are cracks in the grout and tiles on the decking. Repairs are recommended to prevent water intrusion. We suggest further invasive actions be done to determine the cause and the extent of the damage. ',
      templateSubCategoryId: 20,
      type: 'Condition',
      title: 'cracks in deck surface',
    },
    {
      templateRemarkId: 225,
      remark:
        'There are cracks in the concrete slab. Cracking may be caused by soil movement and/or lack of proper expansion joints. It is recommended to fill or seal the cracks and to apply a masonry water repellant every few years to protect the surface.',
      templateSubCategoryId: 20,
      type: 'Condition',
      title: 'Displacement cracks in slab',
    },
    {
      templateRemarkId: 226,
      remark:
        'There are damaged/deteriorated control joint boards in the concrete slab, which could present a tripping hazard. It is recommended to properly fill or repair the joints. ',
      templateSubCategoryId: 20,
      type: 'Condition',
      title: 'Damaged/deteriorated control joints',
    },
    {
      templateRemarkId: 227,
      remark:
        'There is staining and damage to several of the wood components beneath the deck, which indicates a deteriorated condition and possible unsafe conditions. Due to the current conditions, repairs may be necessary. ',
      templateSubCategoryId: 20,
      type: 'Condition',
      title: 'Stained/Damaged surface',
    },
    {
      templateRemarkId: 228,
      remark:
        'The concrete patio is installed in contact or close proximity with the stucco siding/sill area. No expansion or control joints were installed. The inspector recommends providing at least 4-6 inches of clearance between the surface and siding material as a preventive maintenance measure. Eliminating the contact between the siding and surface is recommended as a preventative measure.',
      templateSubCategoryId: 20,
      type: 'Condition',
      title: 'Stucco siding too close',
    },
    {
      templateRemarkId: 229,
      remark:
        'The patio surface is installed above the sill plate area. This is known as a "faulty grade." Issues may exist behind this area, however, visual examination cannot be achieved. Eliminating the contact between the siding and concrete is recommended as a preventative measure.',
      templateSubCategoryId: 20,
      type: 'Condition',
      title: 'Faulty grade',
    },
    {
      templateRemarkId: 230,
      remark:
        'There was no visible counter flashing between the deck and the structure. The lack of counter flashing can allow moisture intrusion issues. ',
      templateSubCategoryId: 20,
      type: 'Condition',
      title: 'Lack of counter flashing',
    },
    {
      templateRemarkId: 231,
      remark:
        'The current deck does not appear to be lag bolted or positively anchored to the structure. Anchoring is designed for both vertical and lateral loads of the deck. Nails or toe nails are subject to withdrawal. It is recommended all elevated decks be properly lag bolted as a preventative safety measure. Consult with your local jurisdiction department having authority over current requirements.',
      templateSubCategoryId: 20,
      type: 'Condition',
      title: 'Lag bolts missing',
    },
    {
      templateRemarkId: 232,
      remark:
        'There is corrosion at some of the components beneath the decking. Corrosion can cause deterioration/weakening of the metal and should be monitored and/or replaced before damage has occurred. ',
      templateSubCategoryId: 20,
      type: 'Condition',
      title: 'Corrosion ',
    },
    {
      templateRemarkId: 233,
      remark:
        'Note - There are areas were probed for deterioration at the time of the inspection. The inspector recommends ensuring that there are footers installed below the deck posts, and any deteriorated wood should be repaired/replaced',
      templateSubCategoryId: 20,
      type: 'Note',
    },
    {
      templateRemarkId: 234,
      remark:
        'For child safety, building guidelines require that a 4 inch ball cannot pass through a deck railing. The spindles for the back deck are too wide. ',
      templateSubCategoryId: 21,
      type: 'Condition',
      title: 'Spindles too wide',
    },
    {
      templateRemarkId: 235,
      remark:
        'Poor banisters and railings are a major cause of household accidents. All elevated decks and patios should have sturdy protective banisters and railings.  All elevated decks and patios which are at least 30" above grade should have sturdy protective banisters and railing. The railings at the decking are loose and need repair to provide adequate protection.',
      templateSubCategoryId: 21,
      type: 'Condition',
      title: 'Poor Banisters',
    },
    {
      templateRemarkId: 236,
      remark:
        'The inspector noted that some of the 4x4 supports at the deck railing have started to deteriorate/damaged towards the top. This issue appears to be caused by the lack of bevels at the top of these supports. The inspector recommends repairs by a qualified handy person or decking contractor prior to further deterioration.',
      templateSubCategoryId: 21,
      type: 'Condition',
      title: 'Deterioared/damaged railings',
    },
    {
      templateRemarkId: 237,
      remark:
        'We recommend installing railings at the decking. It may not be required due to the current height from the ground. This would be considered a safety upgrade, and is recommended for preventative reasons.',
      templateSubCategoryId: 21,
      type: 'Condition',
      title: 'Missing railing',
    },
    {
      templateRemarkId: 238,
      remark:
        'We recommend modifications be considered to the height and spacing of the railings. It is recommended the railings be a minimum of 36+" high and the space not exceed 4" to prevent children from falling through. This deck may have been built prior to the current building standards and does not need to meet current standards; however, this is a preventative safety recommendation.',
      templateSubCategoryId: 21,
      type: 'Condition',
      title: 'spacing of railings - exceeded',
    },
    {
      templateRemarkId: 239,
      remark:
        'We recommend installing graspable handrails at the steps from the deck. The grips should be approximately 1-1/4 to 2" in diameter/circular. This may not have been required when the property was built; however, this should be considered for preventative safety reasons.',
      templateSubCategoryId: 21,
      type: 'Condition',
      title: 'graspable railing- missing',
    },
    {
      templateRemarkId: 240,
      remark:
        'We recommend modifications be considered to the spacing between the balusters of the handrailing. It is recommended the space not exceed 4" to prevent children from falling through. This deck does not need to meet current standards, however, this is a safety recommendation if children will be present',
      templateSubCategoryId: 21,
      type: 'Condition',
      title: 'spacing b/w baluster handrailing',
    },
    {
      templateRemarkId: 241,
      remark:
        'There is evidence of wood damage to the at  patio cover. We recommend you refer to the pest and dry rot report for recommended treatment/repairs.',
      templateSubCategoryId: 22,
      type: 'Condition',
      title: 'damaged covering',
    },
    {
      templateRemarkId: 242,
      remark: 'There is evidence of wood damage to the  at the patio cover.',
      templateSubCategoryId: 22,
      type: 'Condition',
    },
    {
      templateRemarkId: 243,
      remark: 'There was an outlet at the patio area that did not have power at the time of the inspection. ',
      templateSubCategoryId: 22,
      type: 'Condition',
      title: 'no power',
    },
    {
      templateRemarkId: 244,
      remark:
        'The attached patio cover appears to be in satisfactory condition; however, the pitch of the current roof cover may not be sufficient for the manufacturer to warrant this type of roofing system (composition shingle). The roof coverings life expectancy may be shortened due to the lack of proper pitch for this type of material.',
      templateSubCategoryId: 22,
      type: 'Condition',
      title: 'Patio cover- Satisfactory ',
    },
    {
      templateRemarkId: 245,
      remark: 'We recommend utilizing post holders to help prevent movement of the patio cover structure.',
      templateSubCategoryId: 22,
      type: 'Condition',
      title: 'Post holders- support',
    },
    {
      templateRemarkId: 246,
      remark:
        'There are post holders/support brackets sticking out of the concrete slab. Special attention should be given to protect against tripping over these items in the area.',
      templateSubCategoryId: 22,
      type: 'Condition',
      title: 'Tripping hazard- Post holders/support brackets',
    },
    {
      templateRemarkId: 247,
      remark:
        'There is an exposed electrical wire. The wire appears to have been abandoned; however, we recommend the wiring be properly terminated or removed if no longer in use.',
      templateSubCategoryId: 22,
      type: 'Condition',
      title: 'Exposed wire',
    },
    {
      templateRemarkId: 248,
      remark: 'The GFCI outlet did not trip/turn off the power when tested. ',
      templateSubCategoryId: 22,
      type: 'Condition',
      title: 'GFCI Outlet not working',
    },
    {
      templateRemarkId: 249,
      remark:
        'There is an outlet that is presently wired incorrectly. The hot and neutral wires appear to be reversed, an issue known as "reversed polarity," which could result in a shock hazard. ',
      templateSubCategoryId: 22,
      type: 'Condition',
      title: 'Outlet- Wired incorrectly',
    },
    {
      templateRemarkId: 250,
      remark:
        'All electrical outlets and switches to the exterior of the structure should be equipped with weather-protective covers. The cover is needed to protect the device from water intrusion. The switch is missing a cover and does not meet this standard. Installing a proper weather-protective cover is recommended.',
      templateSubCategoryId: 22,
      type: 'Condition',
      title: 'Missing Weather Protective Cover',
    },
    {
      templateRemarkId: 251,
      remark:
        'There is evidence of mildew/mold-like stains at the 1/2 bathroom area. Testing or identifying these organisms is not within the scope of this visual inspection. Due to recent health issues associated with mold, we recommend appropriate measures be done to determine the existence of these items, and appropriate testing/samplings. We recommend you contact an appropriate testing facility/air quality source for further evaluation.',
      templateSubCategoryId: 55,
      type: 'Limitation',
      title: 'Mildew Noted',
    },
    {
      templateRemarkId: 252,
      remark:
        'The inspector noted that there was evidence of a leak around the base of the toilet in the bathroom. A leaky toilet can not only cause damage to the home, but it can also lead to mold growth and other potential health hazards if left unaddressed.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Leak at Base of Toilet',
    },
    {
      templateRemarkId: 253,
      remark:
        'The inspector noted that the shower diverter in the bathroom was not functioning properly. The water was not redirecting properly from the showerhead to the tub spout, indicating that the diverter may need to be repaired or replaced. A faulty shower diverter can lead to leaks and water damage if not addressed promptly.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Shower Diverter Not Functional',
    },
    {
      templateRemarkId: 254,
      remark:
        'The inspector noted that the positive stop was not functioning properly. A positive stop is a mechanism that limits the amount of water that can flow out of the sink and into the dishwasher.  A faulty positive stop can lead to leaks and water damage if not addressed promptly.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Positive Stop Missing or Not Functional',
    },
    {
      templateRemarkId: 255,
      remark:
        'The inspector noted that the hot and cold water appeared to be reversed in the kitchen sink. This means that the hot water tap is dispensing cold water and the cold water tap is dispensing hot water.  Reversed hot and cold water can also indicate a larger issue with the plumbing system, so prompt attention is recommended.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Hot/Cold Water Reversed',
    },
    {
      templateRemarkId: 256,
      remark:
        'The inspector noted a leak in the shower head in the bathroom. This could indicate a problem with the shower head itself or with the plumbing connected to it.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Shower head leak',
    },
    {
      templateRemarkId: 257,
      remark:
        'The inspector noted a leak in the shower enclosure in the bathroom. This could indicate a problem with the shower head itself or with the plumbing connected to it. This may indicate that caulking maintenance is needed or that other areas allow seepage.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Leak - shower enclosure',
    },
    {
      templateRemarkId: 258,
      remark:
        'It appears the bathroom shower enclosure door glass is not identified as safety/tempered glass. Due to the age of the structure, it may not be required to replace however, installing a safety plate or tempered glass is recommended to be installed as a safety upgrade.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Shower enclosure - door',
    },
    {
      templateRemarkId: 259,
      remark:
        'The inspector noted that the bathroom drainage was slow at the type of inspection. This could be a sign of a clog in the pipes or a larger issue with the plumbing system. The inspector recommends attempting drain cleaning products and any necessary repairs to ensure proper draining and prevent any future water damage.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Slow Drainage ',
    },
    {
      templateRemarkId: 260,
      remark:
        'The inspector noted that the bathroom was installed with an S-trap, which is an outdated and potentially problematic plumbing configuration. S-traps can trap sewer gases and create a health hazard for the homeowner. It is recommended to replace the s-trap with a modern p-trap to ensure the homes safety and comply with current building codes.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'S-trap configuration',
    },
    {
      templateRemarkId: 261,
      remark:
        'The inspector noted moisture stains in the bathroom. This could indicate a problem with the shower or plumbing that is allowing water to escape and cause damage, take appropriate action to prevent any potential water damage to the bathroom or surrounding areas.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Moisture stains - bathroom',
    },
    {
      templateRemarkId: 262,
      remark:
        'The inspector noted low water flow in the bathroom. This could be due to a variety of issues, such as clogged pipes, a damaged or worn-out faucet, or problems with the main water line. ',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Low water pressure',
    },
    {
      templateRemarkId: 263,
      remark:
        'The inspector noted that the toilet in the bathroom was loose. This could be a result of a faulty installation or worn-out flooring under the toilet. The loose toilet could also cause damage to the floor and the wax ring that seals the toilet to the floor, leading to potential leaks',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Loose toilet',
    },
    {
      templateRemarkId: 264,
      remark:
        'The inspector noted that the bathroom toilet appeared to be continuously running at the time of the inspection. This issue typically indicates that the fill tank hardware is in need of repairs or replacement. This could result in a significant increase in the homeowners water bill.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Running toilet',
    },
    {
      templateRemarkId: 265,
      remark:
        'The inspector noted that the hardware for the bathroom toilet had deteriorated and was in need of replacement. This could cause the toilet to become loose, leak, or not function properly, potentially leading to water damage.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Deteriorated hardware',
    },
    {
      templateRemarkId: 266,
      remark:
        'The inspector noted that a bathroom fixture was loose. This could be due to a faulty installation or wear and tear over time. The loose fixture could cause damage to the wall or surrounding areas, or even become a safety hazard. ',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Loose fixture',
    },
    {
      templateRemarkId: 267,
      remark:
        'The inspector noted that there is a loose tile in the bathroom. The tile appears to have come loose from the adhesive and has shifted slightly, leaving a gap around the edges. This condition could pose a tripping hazard and should be repaired promptly.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Loose tile/ damaged tile',
    },
    {
      templateRemarkId: 268,
      remark:
        'The inspector noted that there is open caulk in the bathroom. The caulk has started to separate from the surfaces it was intended to seal, leaving gaps and allowing moisture to penetrate the area. This can lead to water damage and should be re-caulked to restore a proper seal and prevent future water damage. Additionally, this can provide a more secure and aesthetically pleasing appearance.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Open Caulk',
    },
    {
      templateRemarkId: 269,
      remark:
        'The inspector noted that there is open grout in the bathroom tiles. The grout has started to separate from the tiles and has become cracked, leaving gaps for moisture to penetrate. This can lead to water damage and mold growth. The open grout should be repaired or replaced to restore a proper seal and prevent future water damage and potential health hazards.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Open grout',
    },
    {
      templateRemarkId: 270,
      remark:
        'The inspector noted that there is no running water in the toilet in the bathroom. The toilet is not flushing properly, indicating that there is a problem with the water supply. This issue should be investigated and repaired promptly, as a functional toilet is essential for hygiene and basic comfort. The cause of the issue could be a clogged pipe, a broken valve, or a lack of water pressure.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'No running water in toilet',
    },
    {
      templateRemarkId: 271,
      remark:
        'The inspector noted that there is a damaged toilet in the bathroom. The porcelain bowl is cracked and there are chips and scratches around the rim and base of the toilet. The damage is likely due to impact and may cause leaks, which could lead to water damage and mold growth. This toilet should be replaced as soon as possible to restore a functional and hygienic bathroom.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Damaged toilet',
    },
    {
      templateRemarkId: 272,
      remark:
        'The inspector noted that there is inadequate clearance at the toilet in the bathroom. The toilet is too close to the shower and the sink, making it difficult for users to access and use the toilet comfortably. This can be a safety hazard, especially for elderly or disabled individuals.',
      templateSubCategoryId: 55,
      type: 'Condition',
      title: 'Inadequate Clearance at Toilet',
    },
    {
      templateRemarkId: 273,
      remark:
        'Note - The inspector recommends having the jets chemically cleaned prior to use as a preventative measure.',
      templateSubCategoryId: 55,
      type: 'Note',
    },
    {
      templateRemarkId: 274,
      remark:
        'Note - A brief test was performed to determine if the unit would turn on/off. Testing the jets/whirlpool is not within the scope of a home inspection. We recommend questioning the seller regarding the actual condition of this item. The inspector recommends having the tub and jets chemically cleaned prior to use.',
      templateSubCategoryId: 55,
      type: 'Note',
    },
    {
      templateRemarkId: 275,
      remark:
        'Note - Plugging and testing a shower pan is not within the scope of a home inspection. The shower was tested for leaks and conditions using normal operating procedures',
      templateSubCategoryId: 55,
      type: 'Note',
    },
    {
      templateRemarkId: 276,
      remark:
        'Note - The water was run for 1-3 minutes at the time of the inspection. The inspector does not provide a warranty for undiscovered or undisclosed clogs in the drain/waste system. ',
      templateSubCategoryId: 55,
      type: 'Note',
    },
    {
      templateRemarkId: 277,
      remark:
        'Note - The toilet(s) was flushed a minimum of 2-3 times and inspected for cracks, leaks, and serviceability. The toilet(s) should be inspected periodically for indications of cracking in the toilet bowl, tank, or base. Cracks are an indication the toilet has reached the end of its useful life and should be replaced before it leaks. Also, periodic replacement of flapper valves and water towers should be expected as typical homeowner maintenance.',
      templateSubCategoryId: 55,
      type: 'Note',
    },
    {
      templateRemarkId: 278,
      remark:
        'Note - Periodic touch-up of the grout/caulking in the moisture areas is needed. Water leaking through non-sealed areas can cause structural damage. Caulking should be maintained to continue protection.',
      templateSubCategoryId: 55,
      type: 'Note',
    },

    /*
     * {
     *   templateRemarkId: 279,
     *   remark:
     *     'The area behind the washer and dryer is not visible. A gas line may exist; however, it cannot be seen by the inspector. Check with the current owner to see if a gas line for a dryer exists.',
     *   templateSubCategoryId: 56,
     *   type: 'Limitation',
     *   title: 'Gas line - not visible',
     * },
     * {
     *   templateRemarkId: 280,
     *   remark:
     *     'There were stored items under the sink at the time of the inspection, which may have hindered a complete visual inspection of We recommend further evaluation when access can be gained.',
     *   templateSubCategoryId: 56,
     *   type: 'Limitation',
     *   title: 'Storage under sink',
     * },
     * {
     *   templateRemarkId: 281,
     *   remark:
     *     'The hot water dispenser was not functioning properly at the kitchen sink. Appropriate repairs are recommended. ',
     *   templateSubCategoryId: 56,
     *   type: 'Condition',
     *   title: 'Hot water dispenser not working',
     * },
     * {
     *   templateRemarkId: 282,
     *   remark:
     *     'The inspector noted that the faucet at the kitchen sink was damaged. This could be a result of wear and tear or a manufacturing defect. The damaged faucet could cause leaks, potentially leading to water damage, or make it difficult to control the water flow.',
     *   templateSubCategoryId: 56,
     *   type: 'Condition',
     *   title: 'Damaged Faucet',
     * },
     * {
     *   templateRemarkId: 283,
     *   remark: 'There are cracks in the finish of the kitchen sink. No adverse conditions were noted at this time.',
     *   templateSubCategoryId: 56,
     *   type: 'Condition',
     *   title: 'Cracks in sink',
     * },
     * {
     *   templateRemarkId: 284,
     *   remark: 'The kitchen sink is loose and not sealed recommend reattaching to the countertops.',
     *   templateSubCategoryId: 56,
     *   type: 'Condition',
     * },
     * {
     *   templateRemarkId: 285,
     *   remark:
     *     'The inspector noted that there was a missing island receptacle in the kitchen. This could make it difficult to use electrical appliances on the kitchen island, and could pose a safety hazard if an appliance is left resting on a countertop without proper electrical connection. ',
     *   templateSubCategoryId: 56,
     *   type: 'Condition',
     *   title: 'Missing - island receptacle',
     * },
     * {
     *   templateRemarkId: 286,
     *   remark:
     *     'The inspector noted that the kitchen island was not secure/defected. This could be a result of a faulty installation or worn-out hardware. A wobbly island could be a tripping hazard or could cause damage to the floor or surrounding cabinetry.',
     *   templateSubCategoryId: 56,
     *   type: 'Condition',
     *   title: 'Island Not Secure/defected',
     * },
     * {
     *   templateRemarkId: 442,
     *   remark: 'Note - The inspector does not turn water valves on or off as these valves have a tendency to leak.',
     *   templateSubCategoryId: 56,
     *   type: 'Note',
     * },
     */
    {
      templateRemarkId: 287,
      remark:
        'The inspector noted the absence of an electric receptacle in the living room, which may limit the use of electrical appliances in this area and could pose a safety hazard if extension cords or power strips are used instead. ',
      templateSubCategoryId: 57,
      type: 'Condition',
      title: 'Missing Electric Receptacle',
    },
    {
      templateRemarkId: 288,
      remark:
        'There is a gas line in the laundry area. The gas valve was turned off to the line; however, the end of the gas line was not capped.',
      templateSubCategoryId: 57,
      type: 'Condition',
      title: 'Gas line not capped',
    },
    {
      templateRemarkId: 289,
      remark: 'There is a flexible gas line coming through the laundry area wall. This is not a proper installation.',
      templateSubCategoryId: 57,
      type: 'Condition',
      title: 'Gas line- incorrectly installed',
    },
    {
      templateRemarkId: 290,
      remark:
        'The inspector noted that the drip pan was cracked/ missing and which may allow water to leak and cause damage to the flooring or surrounding area. ',
      templateSubCategoryId: 57,
      type: 'Condition',
      title: 'Drip pan -cracked/missing',
    },
    {
      templateRemarkId: 291,
      remark:
        'The light  in the laundry room did not function. Worn-out bulbs are often the most common cause of this. Recommend replacing the bulb first. If the fixture fails to operate other conditions may exist. If this is the case, further evaluation or replacement may be necessary.',
      templateSubCategoryId: 57,
      type: 'Condition',
      title: 'Light bulb- not funsctional',
    },
    {
      templateRemarkId: 292,
      remark:
        'There appeared to be a build-up of mildew in areas on the washing machine door seal. It should be noted that this is a common issue with front loading washing machines.',
      templateSubCategoryId: 57,
      type: 'Condition',
      title: 'Mildew noted ',
    },
    {
      templateRemarkId: 293,
      remark:
        'There is staining and damage to the interior of the window sill/frame. The staining appears to be due to condensation from the windows and/or leaks. ',
      templateSubCategoryId: 58,
      type: 'Condition',
      title: 'Staining ',
    },
    {
      templateRemarkId: 294,
      remark:
        'The window does not properly lock, which may compromise the security of the home and pose a safety hazard and may need repair. ',
      templateSubCategoryId: 58,
      type: 'Condition',
      title: 'Windows not locking',
    },
    {
      templateRemarkId: 295,
      remark:
        'The inspector has identified double pane windows, which have lost the seal or have a defect between the panes of glass. ',
      templateSubCategoryId: 58,
      type: 'Condition',
      title: 'Window- seal lost',
    },
    {
      templateRemarkId: 296,
      remark:
        'There are discolorations and swelling of the floor sliding glass door. Discolorations are indications of water penetration. Further actions would be necessary in order to determine the extent of this issue. ',
      templateSubCategoryId: 58,
      type: 'Condition',
      title: 'Discoloration- floor sliding ',
    },

    {
      templateRemarkId: 297,
      remark:
        'There were absorbent packets noted in the bedroom closet areas of the home, which were full of water. This is an indication of humidity issues in the home. If this is not a full time occupied home, lack of a steady heat source is common. We recommend you ask the current owner about their knowledge of this issue, or refer to any past reports, or disclosures.',
      templateSubCategoryId: 58,
      type: 'Condition',
      title: ' absorbent packets noted ',
    },
    {
      templateRemarkId: 299,
      remark:
        'The inspector noted that a door in the home does not latch properly. The door appears to be misaligned or the latch mechanism may be damaged, preventing the door from fully closing and latching. This can compromise the security of the home, as well as allow for noise and drafts to enter the room. The issue should be repaired promptly to ensure proper functionality of the door and to maintain the safety and privacy of the home.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Door- does not latches',
    },
    {
      templateRemarkId: 300,
      remark:
        'The inspector noted that several doors in the home are missing door stops. Door stops are designed to protect walls and prevent damage from the door handles. Without them, the doors can cause scuffs and dents to the walls, which can be costly to repair. Additionally, the lack of door stops can make it difficult to fully open the doors, which can be an inconvenience. Door stops should be installed as needed to protect the walls and ensure proper functionality of the doors.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Missing Door stops',
    },
    {
      templateRemarkId: 301,
      remark:
        'The inspector noted that several sliding doors in the home are missing door guides. Door guides are installed to keep sliding doors aligned and prevent them from jumping the track, which can cause damage to the doors and surrounding walls. Without proper guides, the doors can also be difficult to operate and may not close or open properly. Door guides should be installed as needed to ensure proper functionality of the sliding doors and prevent potential damage or safety hazards.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'MIssing- Door guides',
    },
    {
      templateRemarkId: 302,
      remark:
        'The inspector noted that several doors in the home are missing striker plates. Striker plates are installed to secure the latch or deadbolt of a door, which is essential for safety and security. Without proper striker plates, the door latch may not engage fully, making it easier for someone to force the door open. Additionally, the lack of striker plates can cause damage to the door frame and make it difficult to properly close or lock the door. Striker plates should be installed as needed to ensure the safety and security of the home.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Missing- Stiker plates',
    },
    {
      templateRemarkId: 303,
      remark:
        'The inspector noted that a closet in the home does not have a closet door. The lack of a door can compromise the privacy and security of the closet, as well as expose the contents to dust and other environmental factors. Additionally, the absence of a door can detract from the aesthetic appeal of the room. A closet door should be installed as soon as possible to ensure the privacy and security of the closet and to enhance the overall appearance of the room.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Missing closet door',
    },
    {
      templateRemarkId: 304,
      remark:
        'The inspector noted that a door is damaged. The damage may include chipping, cracking, warping, or other issues that can affect the doors functionality and security. A damaged door can compromise the safety of the home, as well as allow drafts and noise to enter the room. If the damage is severe, the door may need to be replaced entirely. Otherwise, repairs should be made promptly to ensure the door is fully functional and secure.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Damaged door',
    },
    {
      templateRemarkId: 305,
      remark:
        'The inspector noted that screws are missing from the door hinges in the home. The missing screws can compromise the stability of the door, causing it to sag or become misaligned. This can make it difficult to open or close the door, and can also damage the door frame or wall. The missing screws should be replaced as soon as possible to ensure the door is properly secured and functions as intended',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Missing screws ',
    },
    {
      templateRemarkId: 306,
      remark:
        'The inspector noted that a pocket door in the home is not operating correctly. A pocket door is a type of sliding door that slides into a recessed pocket in the wall. If the pocket door is not functioning properly, it can become stuck or difficult to operate.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Pocket door- Malfunction',
    },
    {
      templateRemarkId: 307,
      remark:
        'The inspector noted that there are several drywall cracks throughout the home. Drywall cracks can be caused by a variety of factors, including settling of the foundation, temperature changes, or moisture issues.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Dry wall cracks',
    },
    {
      templateRemarkId: 308,
      remark:
        'The inspector noted discolorations in the ceiling area of the home. Discolorations can indicate a number of issues, such as water damage, mold, or other types of structural damage. If the discoloration is due to water damage or mold. The cause was not known; however, it may be caused by missing insulation in these areas. In-air particles/debris is attracted to these areas, which may not have insulation. Further investigations would be necessary in order to determine the cause. ',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Discolorations in ceiling area',
    },
    {
      templateRemarkId: 309,
      remark:
        'There is shadowing in the ceiling areas. The cause was not known. If concerned, contact an appropriate trade for further evaluations.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Shadowing In-ceiling area',
    },
    {
      templateRemarkId: 310,
      remark:
        'The inspector noted stains on the ceilings of the home due to water leaks. Water stains on ceilings are a common sign of water intrusion, which can be caused by issues such as leaking pipes, a damaged roof, or faulty plumbing fixtures. If left unaddressed, water leaks can lead to more severe issues such as  mold growth, and decreased indoor air quality. ',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Stains on ceiling',
    },
    {
      templateRemarkId: 311,
      remark:
        'The inspector noted a damaged/cracks wall in the living room, which may be a sign of underlying issues such as water damage.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Damaged/cracks in wall',
    },
    {
      templateRemarkId: 312,
      remark: 'The inspector noted a hole in the wall caused by a door knob, which may be unsightly .',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Hole in the wall',
    },
    {
      templateRemarkId: 313,
      remark:
        'The inspector noted minor cracks at the corners of doors and windows in the walls, which may be due to normal settling of the home or changes in temperature and humidity levels. These cracks do not appear to be indicative of any structural issues or significant damage at this time.',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'minor cracks- doors',
    },
    {
      templateRemarkId: 314,
      remark:
        'Stains on the walls visible at the time of the inspection appeared to be the result of moisture intrusion. The source of moisture may have been corrected',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'Stains in walls',
    },
    {
      templateRemarkId: 315,
      remark:
        'The inspector noted cracking in the wall paint, which may be due to normal wear and tear, age, or poor application',
      templateSubCategoryId: 60,
      type: 'Condition',
      title: 'cracks in paint',
    },
    {
      templateRemarkId: 316,
      remark:
        'The inspector noted a fogged windowpane, which may indicate a broken seal and compromised insulating properties.',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'fogged windowpane',
    },
    {
      templateRemarkId: 317,
      remark:
        'The inspector noted a cracked windowpane, which may compromise the windows ability to insulate the home and pose a safety hazard. ',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'cracked windowpane',
    },
    {
      templateRemarkId: 318,
      remark:
        'The inspector noted a worn-out window screen, which may compromise the windows ability to filter out insects and other debris.',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'Worn out screening',
    },
    {
      templateRemarkId: 319,
      remark:
        'There is staining on the interior of the window sills/frames. The staining appears to be due to condensation from the single-pane windows. No damage is visible.',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'Staining on sills/frames',
    },
    {
      templateRemarkId: 320,
      remark:
        'The inspector noted windows that are not locking properly or latching, which may pose a safety risk to the occupants and compromise the homes security',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'Window - not latching or locking',
    },
    {
      templateRemarkId: 321,
      remark:
        'The windows have a rubber seal, used to hold the glass in place to the frame. The rubber seal has come loose/missing from the window , exposing the edge of the glass, causing the frame to come loose from the glass and not allowing the window to properly latch.',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'Missing/loose rubber seal',
    },
    {
      templateRemarkId: 322,
      remark:
        'The single pane windows have glazing compound, used to hold the glass in place. There is some cracking in the current window glazing which will be in need of repair in the near future as a preventive maintenance item. Window glazing compound is inexpensive and can be applied with a putty knife.',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'Glazing compound ',
    },
    {
      templateRemarkId: 323,
      remark:
        'There were storm windows that did not appear to have weep holes installed. Due to this issue, the window frames were showing signs of wear. ',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'Weep holes',
    },
    {
      templateRemarkId: 324,
      remark:
        'There are secondary release latches on the sliding windows which are damaged. These latches allow the window to release from the frame in order to clean the exterior glass from the interior.',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'Secondary latches damaged',
    },
    {
      templateRemarkId: 325,
      remark:
        'The caulking around the perimeter of the windows throughout the home was deteriorated/missing at the time of the inspection. These areas should be sealed with a water resistant silicone to prevent unwanted drafts during the colder months.',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'caulking missing/deteriorated',
    },
    {
      templateRemarkId: 326,
      remark:
        'The inspector noted that there were windows throughout the home that were difficult to open and close. This is a common issue with windows that are not used regularly. If this issue persists with regular use of the windows.',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'windows difficult to open/close',
    },
    {
      templateRemarkId: 327,
      remark:
        'The inspector has identified a defect between the panes of glass. Repairing or replacing the window glass should be considered.',
      templateSubCategoryId: 61,
      type: 'Condition',
      title: 'Defective glass pane',
    },
    {
      templateRemarkId: 328,
      remark:
        'The slight fogging between the panes of glass and is typically an aesthetic issue. Sometimes this issue is only visible under certain climate conditions. Note: this is a representative number of windows; more seals may have failed that were not visible at the time of the inspection. ',
      templateSubCategoryId: 61,
      type: 'Note',
    },
    {
      templateRemarkId: 329,
      remark:
        'It is recommended window areas in bedrooms be a maximum of 44" from the floor to the bottom of the sill, with the openable portion of the window a minimum of 20" wide and 24" high. This is to allow for proper fire egress from the room. Due to the age of the home, it may not be met necessary to retrofit the window; however, future modifications are suggested as a safety upgrade.',
      templateSubCategoryId: 61,
      type: 'Note',
    },
    {
      templateRemarkId: 330,
      remark:
        'Note - Most window latches will need periodic adjustments or cleaning of debris in the track areas in order to close properly. This is only a random test of the accessible windows and in no way a guarantee that all windows are functional. The inspector recommends testing all windows prior to closing. Most windows will need periodic adjustments or maintenance.',
      templateSubCategoryId: 61,
      type: 'Note',
    },
    {
      templateRemarkId: 331,
      remark: 'The clothes poles were not installed in the closet area(s).',
      templateSubCategoryId: 62,
      type: 'Condition',
      title: 'missing clothes pole',
    },
    {
      templateRemarkId: 332,
      remark:
        'The inspector noted worn areas at the cabinets, which may detract from the appearance of the room and compromise the longevity of the cabinets. Additionally, implementing regular maintenance and cleaning of the cabinets can help extend their lifespan and prevent the need for frequent replacements.',
      templateSubCategoryId: 62,
      type: 'Condition',
      title: 'worn areas at the cabinets ',
    },
    {
      templateRemarkId: 333,
      remark:
        'The inspector noted worn areas on the countertops, which may detract from the appearance of the room and compromise the durability of the countertops.Additionally, implementing regular maintenance and cleaning of the countertops can help extend their lifespan and prevent the need for frequent replacements.',
      templateSubCategoryId: 62,
      type: 'Condition',
      title: 'worn areas at the countertops',
    },
    {
      templateRemarkId: 334,
      remark:
        'The inspector noted a missing cabinet door, which may detract from the appearance of the room and limit the functionality of the cabinets.  Regularly maintenance of the cabinets, including tightening any loose hinges or knobs, can help prevent issues and extend their lifespan.',
      templateSubCategoryId: 62,
      type: 'Condition',
      title: 'Missing cabinet door',
    },
    {
      templateRemarkId: 335,
      remark:
        'The inspector noticed a missing or loose cabinet handle, which may impair the cabinets functionality and detract from the rooms appeal. Also, periodic cabinet maintenance, such as tightening any loose hardware and cleaning the surfaces, may help avoid problems and extend the life of the cabinets.',
      templateSubCategoryId: 62,
      type: 'Condition',
      title: 'missing or loose cabinet handle',
    },
    {
      templateRemarkId: 336,
      remark:
        'The inspector noted that a cabinet  is separating from the wall, which may compromise the stability and safety of the cabinet. ',
      templateSubCategoryId: 62,
      type: 'Condition',
      title: 'Cabinet separating from wall',
    },
    {
      templateRemarkId: 337,
      remark:
        'The inspector noted that the countertop in the kitchen has damage, which may detract from the appearance of the room and compromise the functionality of the countertop. It may also concern the safety of the user. ',
      templateSubCategoryId: 62,
      type: 'Condition',
      title: 'Damaged counter  top',
    },
    {
      templateRemarkId: 338,
      remark:
        'The corian countertops appeared to be in functional condition. Corian has a weakness to heat, and preventative measures should be taken while cooking.',
      templateSubCategoryId: 62,
      type: 'Note',
    },
    {
      templateRemarkId: 339,
      remark:
        'The inspector noted improper spacing between intermediate balusters, spindles, and rails at a required guard.  This is a safety hazard, especially for small children. Guards may not allow the passage of a sphere 4 inches in diameter. ',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'spindles too wide',
    },
    {
      templateRemarkId: 340,
      remark:
        'Poor banisters and railings are a major cause of household accidents. All elevated decks and patios should have sturdy protective banisters and railings. The railings at the decking are loose and need repair to provide adequate protection.',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'Poor banisters',
    },
    {
      templateRemarkId: 341,
      remark:
        'The inspector noted that some of the 4x4 supports at the  railing have started to deteriorate towards the top. This issue appears to be caused by the lack of bevels at the top of these supports.Deteriorated supports may not be able to withstand the weight of the occupants, leading to collapse and injury.',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: '4x4 supports deteriorated ',
    },
    {
      templateRemarkId: 342,
      remark:
        'The inspector noted that the railing had been installed without the use of 4x4 supports. The spindles are carrying the weight of the railing. ',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: '4x4 supports missing',
    },
    {
      templateRemarkId: 343,
      remark:
        'The inspector noted that there is a missing railing , which can create a hazardous condition and compromise the safety of the occupants. The absence of a railing increases the risk of falls, particularly for children, the elderly, and those with mobility issues. ',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'Missing railing',
    },
    {
      templateRemarkId: 344,
      remark:
        'We recommend modifications be considered to the height and spacing of the railings. It is recommended the railings be a minimum of 36+" high and the space not exceed 4" to prevent children from falling through. This may have been built prior to the current building standards and does not need to meet current standards; however, this is a preventative safety recommendation.',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'Railing height and spacing- incorrect',
    },
    {
      templateRemarkId: 345,
      remark:
        'The inspector noted that there is a missing graspable handrail, which can pose a safety hazard to the occupants, particularly those with mobility issues, the elderly, and children. A graspable handrail is essential for providing support and stability when ascending or descending stairs, preventing falls and injuries.The grips should be approximately 1-1/4 to 2" in diameter/circular. This may not have been required when the property was built; however, this should be considered for preventative safety reasons.',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'Missing graspable handrail',
    },
    {
      templateRemarkId: 346,
      remark:
        'There is earth-to-wood contact at the stringers of the steps of the deck system. We suggest modifications be done to eliminate any earth-to-wood contact to prevent wood-destroying organisms.',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'Earth to wood contact',
    },
    {
      templateRemarkId: 347,
      remark:
        'The inspector noted that there is a loose railing component, which poses a safety risk to the occupants. Loose railing components can compromise the structural integrity of the entire railing system, potentially leading to falls and injuries.',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'Loose railing component',
    },
    {
      templateRemarkId: 348,
      remark:
        'The inspector noted that the handrail is not continuous, which poses a safety risk to the occupants. Handrails should be continuous along the entire stairway or walking surface to provide proper support and stability. A lack of continuity in handrails can increase the risk of falls.',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'Handrail not continous',
    },
    {
      templateRemarkId: 349,
      remark:
        'The inspector noted that there is damage at one or more steps, which poses a safety hazard to the occupants.',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'Damaged step',
    },
    {
      templateRemarkId: 350,
      remark:
        'The inspector noted inadequate illumination (lighting) for the stairway. All stairs should have adequate lighting to see where youre stepping. There should be lighting for the stairway, steps, treads, and landings. For the exterior stairs, there should be a light at the top landing. ',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'Stairway Illumination',
    },
    {
      templateRemarkId: 351,
      remark:
        'The inspector noted that stair treads or steps are slippery, which may pose a safety hazard. The treads should be inspected and treated appropriately to increase their slip resistance.',
      templateSubCategoryId: 63,
      type: 'Condition',
      title: 'stair treads/steps slippery',
    },
    {
      templateRemarkId: 352,
      remark:
        'There is a safety valve (TPR valve) on the water heater tank; however, it could not be tested because once it has been opened, the valves tend to leak.',
      templateSubCategoryId: 43,
      type: 'Limitation',
      title: 'TPR Visual Check - Not Tested',
    },
    {
      templateRemarkId: 353,
      remark:
        'There is a discharge pipe on the water heating system, however, modifications are suggested in order to provide the desired function. The pipe is currently terminating [:selected;near the water heater tank.;near the floor.] With newer installations (since 1998), it is now recommended an approved pipe (copper, steel, pex, or CPVC) be installed with a termination point within 6"- 24" of the floor. ',
      templateSubCategoryId: 43,
      type: 'Condition',
      title: 'Discharge Pipe Termination Point',
    },
    {
      templateRemarkId: 354,
      remark:
        'There was no discharge pipe attached to the water heater temperature pressure relief valve. The pipe is installed to prevent someone from being sprayed with hot water in the event that the valve is activated. An activated temperature/pressure relief valve is uncommon and usually indicates that the water heater is in need of servicing or necessary adjustments. Installing an approved pipe to 6-24 inches from the floor is recommended for safety considerations. ',
      templateSubCategoryId: 43,
      type: 'Condition',
      title: 'No Discharge Pipe Installed',
    },
    {
      templateRemarkId: 355,
      remark:
        'There is a discharge pipe on the water heating system; however, the discharge requires modification in order to provide the desired function. The pipe is currently made of [:selected;PVC plastic;a nonstandard material] and should be replaced with an approved distribution pipe such as copper or galvanized steel.',
      templateSubCategoryId: 43,
      type: 'Condition',
      title: 'Discharge Pipe Nonstadard Material',
    },
    {
      templateRemarkId: 356,
      remark:
        'There is a discharge pipe on the water heating system; however, modifications are suggested in order to provide the desired function. The discharge pipe has been reduced in size from the safety valve. It is recommended an approved 3/4" discharge pipe, such as copper or galvanized steel, be installed with a downward flow and a termination point within 6"- 24" of the floor.',
      templateSubCategoryId: 43,
      type: 'Condition',
      title: 'Discharge Pipe Reduced Size',
    },
    {
      templateRemarkId: 357,
      remark:
        'The water heater was supplied with a discharge pipe. No issues were noted with this configuration at the time of the inspection. We recommend periodic inspections of the discharge pipe.',
      templateSubCategoryId: 43,
      type: 'Condition',
      title: 'Discharge Pipe Satisfactory',
    },
    {
      templateRemarkId: 358,
      remark:
        'The water heater temperature pressure relief (TPR) valve was leaking at the time of the inspection. Moisture was detected at the end of the discharge pipe. When a leak is present, replacement of the safety valve may be needed in order to provide the desired service. ',
      templateSubCategoryId: 43,
      type: 'Condition',
      title: 'TPR Leaking',
    },
    {
      templateRemarkId: 359,
      remark:
        'There is no water heater pressure relief valve (TPR valve) installed on the water heater. Installing an approved safety relief valve is recommended as a safety precaution. We recommend you contact an appropriate trade for modifications.',
      templateSubCategoryId: 43,
      type: 'Condition',
      title: 'No TPR Installed',
    },
    {
      templateRemarkId: 360,
      remark:
        'There are indications that the water heater safety valve relief system has leaked in the past. Stains were noted at [:selected;the end of the discharge pipe.;the area beneath the discharge pipe.] If a leak is present, replacement of the safety valve may be needed in order to provide the desired service.',
      templateSubCategoryId: 43,
      type: 'Condition',
      title: 'TPR Past Leaks',
    },
    {
      templateRemarkId: 361,
      remark:
        'Note -  Safety relief valves should be re-inspected at least once every three years by a licensed plumbing contractor or authorized trade, to ensure the product has not been affected by corrosive water conditions and to ensure that the valve and discharge line have not been altered or tampered with illegally. Certain naturally occurring conditions may corrode the valve or its components over time, rendering the valve inoperative. Such conditions are not detectable unless the valve and its components are physically removed and inspected. This inspection must only be conducted by a plumbing contractor or authorized trade – not by the owner. Failure to re-inspect the relief valve as directed could result in unsafe pressure buildup, which can result in severe personal injury, substantial property damage, etc.',
      templateSubCategoryId: 43,
      type: 'Note',
    },
    {
      templateRemarkId: 362,
      remark:
        'There was visible rust/corrosion on the water heater fittings. The fittings used connect the copper pipe to galvanized steel. This union of dissimilar metals will cause a corrosive electrical/chemical reaction known as "electrolysis." ',
      templateSubCategoryId: 44,
      type: 'Condition',
      title: 'Missing Dielectric Unions and Corrosion',
    },
    {
      templateRemarkId: 363,
      remark:
        'The inspector noted copper to galvanized steel connections at the top of the water heater tank. This union of dissimilar metals may cause a corrosive electrical/chemical reaction known as "electrolysis."',
      templateSubCategoryId: 44,
      type: 'Condition',
      title: 'Missing Dielectric Unions',
    },
    {
      templateRemarkId: 364,
      remark:
        'There are minor encrustations at the [:selected;cold;hot;hot and cold] water [:selected;fitting;fittings;shutoff valve] above the water heater tank. These deposits usually indicate minor leaks or are the result of other conditions that could lead to leaks in the future. We recommend monitoring these areas in order to determine if further action is needed.',
      templateSubCategoryId: 44,
      type: 'Condition',
      title: 'Minor Encrustations',
    },
    {
      templateRemarkId: 365,
      remark:
        'The inspector has noted evidence of leaks at [:selected;the bottom of the;the flame compartment of the] water heater, indicating replacement of the tank is necessary. ',
      templateSubCategoryId: 44,
      type: 'Condition',
      title: 'Leak at Water Heater',
    },
    {
      templateRemarkId: 366,
      remark:
        'The inspector noted [:selected;a leak;leaks] at the [:selected;water connections above the water heater tank.;shut-off valve for the water heater.] ',
      templateSubCategoryId: 44,
      type: 'Condition',
      title: 'Leak at Water Heater Water Connections',
    },
    {
      templateRemarkId: 367,
      remark:
        'The water heater does have approved straps properly installed to the wall studs; however, the wood screws used on the straps should be lag screws/bolts with washers. Lag screws, not less than 1/4" in diameter must be used to anchor the restraints to the wall and each lag screw must have at least 1-1/2" thread penetration into wall stud. A large flat washer must be installed between each lag screw and strap for reinforcement. Appropriate repairs are recommended to meet current standards. If unsure of local requirements, we recommend you contact your local building department for consultation.',
      templateSubCategoryId: 45,
      type: 'Condition',
      title: 'Wood Screws Used on Straps',
    },
    {
      templateRemarkId: 368,
      remark:
        'This water heater does not have two approved straps properly installed. Plumbers tape is currently being used for the straps, which must completely wrap around the tank before securing it to wall studs. Appropriate repairs are recommended. We suggest a state-approved seismic strapping kit be installed which meets local requirements and/or state standards. If unsure of local requirements, we recommend you contact your local building department for consultation. State-approved seismic strapping kits are available at most hardware or home repair stores.',
      templateSubCategoryId: 45,
      type: 'Condition',
      title: 'Plumbing Tape Used for Straps',
    },
    {
      templateRemarkId: 369,
      remark:
        'All residential water heaters, new or replacement, must be strapped or braced. The water heater does not appear to meet state standards. Approved strapping is recommended prior to closing.',
      templateSubCategoryId: 45,
      type: 'Condition',
      title: 'No Straps Installed',
    },
    {
      templateRemarkId: 370,
      remark:
        'All residential water heaters, new or replacement, must be strapped or braced. The water heater does not appear to meet the state standards (size of screws, lack of washers, wrapping/bracing, etc.). We suggest the strapping meets local requirements and/or state standards. If unsure of local requirements, we recommend you contact your local building department for consultation.',
      templateSubCategoryId: 45,
      type: 'Condition',
      title: 'Lack of Proper Screws/Washers/Bracing',
    },
    {
      templateRemarkId: 371,
      remark:
        'This water heater has two approved straps; however, location modifications are recommended. The straps are recommended to be 1/3rd from the top of the tank, and 1/3rd near the bottom of the tank but not within 4" of the thermostat box. Appropriate repairs are recommended. We suggest the strapping meets local requirements and/or state standards.',
      templateSubCategoryId: 45,
      type: 'Condition',
      title: 'Relocate Straps',
    },
    {
      templateRemarkId: 372,
      remark:
        'The water heater does not appear to meet the state standards (size of screws, lack of washers, location of straps, etc.). These standards may or may not be different than local requirements. We suggest the strapping meets local requirements and/or state standards. If unsure of local requirements, we recommend you contact your local building department for consultation.',
      templateSubCategoryId: 45,
      type: 'Condition',
      title: 'Size of Screws/Washers',
    },
    {
      templateRemarkId: 373,
      remark:
        '[One of the straps is loose:selected;The straps are loose] at the water heater. A minimum of two straps should be properly secured to wall studs. Appropriate repairs are recommended. We suggest the strapping meets local requirements and/or state standards. repair stores.',
      templateSubCategoryId: 45,
      type: 'Condition',
      title: 'Loose Straps',
    },
    {
      templateRemarkId: 374,
      remark:
        'Note - All water heaters up to 52 gallons must be strapped in at least two locations; the upper one-third of the unit and the lower one-third. The lower strap must be a minimum of 4" above the water heater control unit. It is required to have three straps up to a 75-gallon tank, and straps on tanks more than 75 gallons are determined by your local authority having jurisdiction. Check with your local building department or authority having jurisdiction for local requirements. The required clearances from a wall to the heater as stated on the unit nameplate are critical. Lag screws not less than 1/4" in diameter must be used to anchor the restraints to the wall and each lag screw must have at least 1-1/2" thread penetration into a wall stud. A large flat washer must be installed between each lag screw and strap for reinforcement.',
      templateSubCategoryId: 45,
      type: 'Note',
    },
    {
      templateRemarkId: 375,
      remark:
        'Tankless water heaters do not require safety straps but are required to be properly installed and secured. Safety tie-downs are used on gas-fired hot water heaters to prevent them from tipping over and causing a fire or explosion as a result. We suggest you verify the item was installed per the manufacturers requirements.',
      templateSubCategoryId: 45,
      type: 'Note',
    },
    {
      templateRemarkId: 376,
      remark:
        'The [:selected;gas valve;pilot light] was off at the water heater at the time of the inspection. The system could not be tested due to this issue. We recommend questioning the seller regarding their knowledge of this issue and whether or not the unit is functional. It is recommended that the water heater is tested prior to close.',
      templateSubCategoryId: 46,
      type: 'Limitation',
      title: 'Not Tested - Gas valve / pilot Light off ',
    },
    {
      templateRemarkId: 377,
      remark:
        'The draft exhaust hood for the water heater was not properly attached or fitted over the tank. This issue can allow carbon monoxide to enter the surrounding areas. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Draft Hood Not Attached/Fitted',
    },
    {
      templateRemarkId: 378,
      remark:
        'The inspector noted that the plastic rings around the water connections at the top of the water heater tank have melted. This issue typically indicates that the water heater is back-drafting. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Plastic Rings Melted',
    },
    {
      templateRemarkId: 379,
      remark:
        'The [:selected;furnace;water heater;furnace and water heater] exhaust vent has a negative pitch. A gas appliance exhaust vent should always travel in an upward (positive) slope. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Negative Slope',
    },
    {
      templateRemarkId: 380,
      remark:
        'The water heater was making a “gurgling or popping’ sound indicating maintenance is needed. This issue typically indicates that there is a build-up of sediment inside the water heater tank. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Sediment Gurgling Popping Sound',
    },
    {
      templateRemarkId: 381,
      remark:
        'The [:selected;furnace;water heater;furnace and water heater] exhaust vent connections have not been properly secured. The vent connections should be secured with sheet metal screws and high-temperature rated tape. All flue pipe connections are recommended to be properly connected and sealed. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Vent Connections Not Secured',
    },
    {
      templateRemarkId: 382,
      remark:
        'There was duct tape installed at the connections for the [:selected;furnace exhaust vent.;water heater exhaust vent.;furnace and water heater exhaust vents.] We recommend sealing the exhaust vent connections with sheet metal screws and high-temperature rated tape. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Duct Tape on Exhaust Vent',
    },
    {
      templateRemarkId: 383,
      remark:
        'The water heating system installation appears to need attention. There is no shut-off valve installed on the cold water line. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Missing Shutoff Valve',
    },
    {
      templateRemarkId: 384,
      remark:
        'The inspector noted a considerable sulfur odor originating from the hot water in the house. This issue may indicate maintenance is needed, such as draining and treating of the water heater tank. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Sulfur / Odor',
    },
    {
      templateRemarkId: 385,
      remark:
        'There was no metal fire block noted where the [:selected;furnace;water heater;furnace and water heater] exhaust vent exits the ceiling. A metal fire block is recommended to prevent flames from spreading to the area above and to prevent contact between the exhaust vent and drywall or wood material. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Missing Fire Block',
    },
    {
      templateRemarkId: 386,
      remark:
        'The [:selected;furnace;water heater;furnace and water heater] exhaust vent is in need of repair. The vent is in contact with wood members in the [:selected;attic.;crawl space.;garage.] It is recommended that there be at least a 1" clearance from combustible items when a Type B vent is installed as a safety precaution. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Clearance 1',
    },
    {
      templateRemarkId: 387,
      remark:
        'It appears the hot and cold water lines are reversed at the water heater. This would cause the hot water to be pulled from the bottom of the tank. We recommend appropriate repairs by a qualified plumber to allow the hot water heater to function properly.',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Hot/Cold Water Lines Reversed ',
    },
    {
      templateRemarkId: 388,
      remark:
        'Due to the length of the [;furnace:selected;water heater;furnace and water heater] exhaust vent, we recommend bracing the vent to prevent movement. This is recommended to prevent the pipe from leaning against the attic framing or separation. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Brace Exhaust Vent',
    },
    {
      templateRemarkId: 389,
      remark:
        'The exhaust vent from the [water heater:selected;heater;furnace;] terminates within four feet of an openable window in the house. Fuel appliance exhaust, excluding direct vent, should terminate at least four feet below or horizontally from doors, windows, or air inlets. ',
      templateSubCategoryId: 46,
      type: 'Condition',
      title: 'Exhaust Vent Near Openable Window, Door',
    },

    /*
     * {
     *   templateRemarkId: 390,
     *   remark:
     *     'There [were some:selected;were several;was an] exterior closet(s) which were locked at the time of the inspection. Issues may exist but are not visible. We recommend a proper access be added in order to properly inspect this area.',
     *   templateSubCategoryId: 47,
     *   type:"Limitation"
     * },
     */
    {
      templateRemarkId: 443,
      remark:
        'Due to the property location, moisture intrusion could occur due to wind driven rain and lack of overhangs at the home. We recommend you ask the current owner about their knowledge of these types of issues, or refer to any past reports, or disclosures. If this is or can become an issue, we recommend you contact a qualified contractor or specialist to determine possible modifications or repairs.',
      templateSubCategoryId: 47,
      type: 'Note',
    },
    {
      templateRemarkId: 391,
      remark:
        'The inspector noted major cracking at the driveway, which may indicate substandard installation or soil settling',
      templateSubCategoryId: 48,
      type: 'Condition',
      title: 'Major Cracking at Driveway',
    },
    {
      templateRemarkId: 392,
      remark:
        'The inspector nooted that the driveway has a negative slope and drains towards the house. This condition is prone to water penetration into the house structure. ',
      templateSubCategoryId: 48,
      type: 'Condition',
      title: 'Improperly Sloped Driveway Surface',
    },
    {
      templateRemarkId: 393,
      remark: 'The inspector observed major cracking at the walkway.  This condition could be a trip hazard',
      templateSubCategoryId: 48,
      type: 'Condition',
      title: 'major cracking at  walkway.',
    },
    {
      templateRemarkId: 394,
      remark: 'The inspector noted damage to a step, which may pose a safety hazard',
      templateSubCategoryId: 48,
      type: 'Condition',
      title: 'Damaged step',
    },
    {
      templateRemarkId: 395,
      remark:
        'The inspector noted that the width of the stairway is too narrow, is less than the standard minimum of 36 inches which does not meet the recommended minimum width requirement for a safe and comfortable passage.',
      templateSubCategoryId: 48,
      type: 'Condition',
      title: 'Width of Stairway Too Narrow (36)',
    },
    {
      templateRemarkId: 396,
      remark:
        'The inspector noted that theres a difference between the stair treads from one to that is greater than 3/8 of an inch. This poses a trip hazard. The difference between one step and the other is at most 3/8 of an inch. ',
      templateSubCategoryId: 48,
      type: 'Condition',
      title: 'Big Differences Between Treads (3/8)',
    },
    {
      templateRemarkId: 397,
      remark:
        'The inspector noted that the trim deteriorated in some areas. All affected wood should be trimmed or replaced prior to further deterioration.',
      templateSubCategoryId: 49,
      type: 'Condition',
      title: 'trim deteriorated',
    },
    {
      templateRemarkId: 398,
      remark:
        'The wood siding has been installed directly above the shingles. This issue can allow premature deterioration of the wood siding due to snow loads and rain events. Due to this issue, the wood siding has deteriorated in some areas. ',
      templateSubCategoryId: 49,
      type: 'Condition',
      title: 'Deteriorated Wood siding',
    },
    {
      templateRemarkId: 399,
      remark: 'The inspector noted siding showed cracking in one or more places',
      templateSubCategoryId: 49,
      type: 'Condition',
      title: 'Cracking- Minor',
    },
    {
      templateRemarkId: 400,
      remark:
        'There was a build-up of moss/mildew on the siding in localized areas around the home. Over-the-counter products for cleaning are available at most home improvement stores. ',
      templateSubCategoryId: 49,
      type: 'Condition',
      title: 'moss/mildew',
    },
    {
      templateRemarkId: 401,
      remark:
        'There were some cracks in the masonry siding. These types of cracks are common and do not appear to be a concern at this time. ',
      templateSubCategoryId: 49,
      type: 'Condition',
      title: 'Cracks- Masory siding',
    },
    {
      templateRemarkId: 402,
      remark:
        'Touching up the structure caulking around the tops and sides of the window and door trim, and any openings/gaps is often needed in between paintings. Touching up all voids is recommended in the fall, prior to the rainy season. The caulking keeps rainwater from penetrating behind the siding material and causing premature deterioration of the material.',
      templateSubCategoryId: 50,
      type: 'Condition',
    },
    {
      templateRemarkId: 403,
      remark:
        'The caulking has cracked and deteriorated.This issue can allow rainwater to penetrate the surface material. It is recommended that these areas are sealed with a water-resistant sealant. ',
      templateSubCategoryId: 50,
      type: 'Condition',
      title: 'Cracked and deteriorated caulking',
    },
    {
      templateRemarkId: 441,
      remark:
        'The inspector noted gaps/missing caulking in the areas where the windows intersect the brick surface. These areas should be sealed with a water-resistant sealant in order to prevent moisture penetration',
      templateSubCategoryId: 50,
      type: 'Condition',
      title: 'Missing Caulk',
    },

    {
      templateRemarkId: 404,
      remark:
        'The inspector noted extensive caulking around windows, doors, and other areas, indicating potential issues with air and water infiltration.',
      templateSubCategoryId: 50,
      type: 'Condition',
      title: 'Extensive caulking',
    },
    {
      templateRemarkId: 405,
      remark:
        'The inspector noted indications of paint or staining in poor condition.  Flaking, cracking, and worn areas.',
      templateSubCategoryId: 50,
      type: 'Condition',
      title: 'Poor paint conditiond',
    },
    {
      templateRemarkId: 406,
      remark:
        'The inspector noted cracking in the wall paint, indicating that it may need to be repainted or addressed to prevent further deterioration.',
      templateSubCategoryId: 50,
      type: 'Condition',
      title: 'Cracking/chipped paint',
    },
    {
      templateRemarkId: 444,
      remark:
        ' There is a retaining wall at the property which appears to be in functional condition. Determining the structural integrity of retaining walls is not within the scope of this inspection. We recommend contacting a qualified landscaping company for further evaluation and periodic maintenance. ',
      templateSubCategoryId: 51,
      type: 'Limitation',
      title: 'Out of scope',
    },
    {
      templateRemarkId: 407,
      remark:
        'There are overhanging tree limbs above the roof line. Trees should be trimmed to prevent mechanical damage to the surface below. All vegetation should be kept trimmed at least 6-12 inches away from the structure to eliminate a common avenue for pest infestation and damage to the exterior structure material. Maintenance of overhanging trees and plants is recommended.',
      templateSubCategoryId: 51,
      type: 'Condition',
      title: 'over hanging tree limbs',
    },
    {
      templateRemarkId: 408,
      remark:
        'The inspector  dense vegetation around the house in some areas.  This condition limited and restricted my visual inspection.  Dense vegetation and landscaping up against or near the house foundation and exterior walls may be prone to water penetration and insect infestation.  Trimming, pruning and some landscaping is recommended.  ',
      templateSubCategoryId: 51,
      type: 'Condition',
      title: 'Dense vegetataions',
    },
    {
      templateRemarkId: 409,
      remark:
        'The inspector noted the vegetation, surface drainage, retaining walls and grading of the property, where they may adversely affect the structure due to moisture intrusion. ',
      templateSubCategoryId: 51,
      type: 'Condition',
      title: 'Vegetation, Drainage, Walls & Grading Were Inspected',
    },
    {
      templateRemarkId: 410,
      remark:
        'Grading is sloping towards the home in some areas. This could lead to water intrusion and foundation issues. The ground around a house should slope away from all sides, ideally 6 inches for the first 10 feet from the house foundation perimeter. Downspouts, surface gutters and drains should also be directing water away from the foundation. ',
      templateSubCategoryId: 51,
      type: 'Condition',
      title: 'Negative grading',
    },
    {
      templateRemarkId: 411,
      remark: 'The inspector noted indication of a defect at the retaining wall.',
      templateSubCategoryId: 51,
      type: 'Condition',
      title: 'Defect - retaining wall',
    },
    {
      templateRemarkId: 412,
      remark:
        'There retaining wall has cracks in several areas. The wall appears to be functional and should be monitored for changes.',
      templateSubCategoryId: 51,
      type: 'Condition',
      title: 'Cracks- Retaining walls',
    },
    {
      templateRemarkId: 413,
      remark:
        'There are landscaping blocks in use as retaining wall appeared to be functional at this time; however, it is not an engineered or reinforced wall and should be monitored for changes or repairs. Determining the structural integrity of retaining walls is not within the scope of this inspection.',
      templateSubCategoryId: 51,
      type: 'Condition',
    },
    {
      templateRemarkId: 445,
      remark:
        'Note: Vegetation prevents proper visibility of the foundation and siding materials. All vegetation should be kept trimmed at least 6-12 inches away from the structure to eliminate a common avenue for pest infestation and damage to the exterior structure material. Maintenance of overhanging trees and plants is recommended. ',
      templateSubCategoryId: 51,
      type: 'Note',
    },
    {
      templateRemarkId: 414,
      remark:
        'The inspector noted indications that one or more areas of the soffit were damaged. They improve energy efficiency by allowing air to circulate through the roof and attic, reducing the risk of mold and rot. Proper maintenance and repair of soffits is crucial to the longevity and overall health. ',
      templateSubCategoryId: 53,
      type: 'Condition',
      title: 'Damage Observed at Soffit',
    },
    {
      templateRemarkId: 415,
      remark:
        'The inspector noted damaged eaves, which could allow moisture to penetrate the roof decking and cause water damage to the interior of the home. Repairs or replacement of the damaged eaves may be necessary to prevent further damage.',
      templateSubCategoryId: 53,
      type: 'Condition',
      title: 'Damage Observed at Eaves',
    },
    {
      templateRemarkId: 416,
      remark:
        'The inspector noted damaged fascia, which can lead to moisture damage and insect infestation if not addressed promptly.',
      templateSubCategoryId: 53,
      type: 'Condition',
      title: 'Damage Observed at Soffits',
    },
    {
      templateRemarkId: 417,
      remark:
        'The inspector noted loose fascia during the inspection. This condition may allow moisture to penetrate behind the fascia, leading to rot or other damage.',
      templateSubCategoryId: 53,
      type: 'Condition',
      title: 'loose - Fascia',
    },
    {
      templateRemarkId: 418,
      remark: 'The inspector noted water stains on the eaves, indicating potential water damage or leakage.',
      templateSubCategoryId: 53,
      type: 'Condition',
      title: 'Retrieving data. Wait a few seconds and try to cut or copy again.',
    },
    {
      templateRemarkId: 419,
      remark:
        'The door system appears to need maintenance or repair to insure safe continued service. The spring is currently broken.',
      templateSubCategoryId: 54,
      type: 'Condition',
      title: 'Retrieving data. Wait a few seconds and try to cut or copy again.',
    },
    {
      templateRemarkId: 420,
      remark:
        'There are loose nuts at the roll-up doors. We suggest the nuts and bolts are checked and tightened on an annual basis.',
      templateSubCategoryId: 54,
      type: 'Condition',
      title: 'Retrieving data. Wait a few seconds and try to cut or copy again.',
    },
    {
      templateRemarkId: 421,
      remark:
        'The inspector noted a damaged garage door seal, which can allow water, debris, and pests to entre, compromising its integrity and potentially causing damage to stored items.',
      templateSubCategoryId: 54,
      type: 'Condition',
      title: 'Seal damaged',
    },
    {
      templateRemarkId: 422,
      remark:
        'The automatic door opener was tested and appeared to be functional at the time of the inspection. Periodic inspections, greasing, adjustments, and tightening of brackets are suggested as part of normal preventative maintenance. Check with the manufacturer or an overhead garage door company for proper installation and maintenance questions.',
      templateSubCategoryId: 54,
      type: 'Condition',
      title: 'Automatic door- functional',
    },
    {
      templateRemarkId: 423,
      remark:
        'The sliding glass door had double-pane glazing in which condensation was visible. This indicates a loss of thermal integrity. ',
      templateSubCategoryId: 54,
      type: 'Condition',
      title: 'Sliding Glass Door - Failed Seal',
    },
    {
      templateRemarkId: 424,
      remark:
        'The inspector noted that door is missing standard weatherstripping. This can result in significant energy loss and moisture intrusion. Recommend installation of standard weatherstripping.',
      templateSubCategoryId: 54,
      type: 'Condition',
      title: 'Weatherstripping Not Present',
    },
    {
      templateRemarkId: 425,
      remark:
        'The inspector noted that the dryer in the laundry room is not exhausting outside. This means that the dryer exhaust is likely venting into the attic or crawl space, which can lead to mold growth, moisture issues, and potential fire hazards. A blocked or improperly vented dryer can also cause damage to the dryer itself, reduce its efficiency, and lead to higher energy costs.',
      templateSubCategoryId: 70,
      type: 'Condition',
      title: 'Dryer Not Exhausting Outside',
    },
    {
      templateRemarkId: 426,
      remark:
        'The inspector noted a defect in the dryer exhaust pipe in the laundry room. The defect may include damage, cracks, or a disconnected or improperly installed exhaust pipe, which can lead to moisture issues, and reduced efficiency of the dryer.',
      templateSubCategoryId: 70,
      type: 'Condition',
      title: 'Defect at Dryer Exhaust Pipe',
    },
    {
      templateRemarkId: 427,
      remark:
        'The inspector noted a clogged dryer exhaust pipe in the laundry room. A clogged exhaust pipe can cause the dryer to work less efficiently. A clogged dryer exhaust pipe can also lead to increased energy costs, reduced lifespan of the dryer, and moisture issues. It is important to address this issue promptly to avoid potential hazards and ensure the safe and efficient operation of the dryer.',
      templateSubCategoryId: 70,
      type: 'Condition',
      title: 'Clogged Exhuast pipe',
    },
    {
      templateRemarkId: 428,
      remark:
        'During the home inspection, the inspector noted debris in the dryer ventilation system. Debris such as lint and other materials can accumulate in the ventilation system and cause reduced airflow, which can lead to overheating. It is important to regularly maintain the ventilation system to prevent potential hazards and extend the lifespan of the dryer.',
      templateSubCategoryId: 70,
      type: 'Condition',
      title: 'Debris in dryer ventilation system ',
    },
    {
      templateRemarkId: 430,
      remark:
        'The dishwasher does not appear to be functioning properly. The unit did not cycle properly or pump water into the basin',
      templateSubCategoryId: 71,
      type: 'Condition',
      title: 'Not functioning',
    },
    {
      templateRemarkId: 431,
      remark:
        'The inspector noted a very old dishwasher, which may require replacement due to potential issues with its efficiency and reliability.',
      templateSubCategoryId: 71,
      type: 'Condition',
      title: 'Old dishwasher',
    },
    {
      templateRemarkId: 432,
      remark:
        'The inspector noted rust on the interior cabinet and components of the dishwasher, which may indicate corrosion and compromise the performance of the appliance.',
      templateSubCategoryId: 71,
      type: 'Condition',
      title: 'Rust on dishwasher',
    },
    {
      templateRemarkId: 433,
      remark:
        'The inspector noted that the dishwasher is not draining properly, which may be due to a clogged or damaged drain hose, a malfunctioning pump, or other issues ',
      templateSubCategoryId: 71,
      type: 'Condition',
      title: 'Did Not Drain Properly',
    },

    {
      templateRemarkId: 434,
      remark: 'The inspector noted an active leak in the dishwasher, which may require immediate attention',
      templateSubCategoryId: 71,
      type: 'Condition',
      title: 'Active leak ',
    },
    {
      templateRemarkId: 435,
      remark:
        'The inspector noted a defect at the controls and control panel of the dishwasher, which may require repair or replacement for proper functioning.',
      templateSubCategoryId: 71,
      type: 'Condition',
      title: 'Control panels not working',
    },
    {
      templateRemarkId: 436,
      remark:
        'The inspector noted an active leak in the garbage disposal during the home inspection. An active leak can lead to water damage and potential mold growth, as well as affect the functioning of the disposal.  It is also important to properly maintain the garbage disposal to ensure its efficient and safe operation.',
      templateSubCategoryId: 72,
      type: 'Condition',
      title: 'Active leak ',
    },
    {
      templateRemarkId: 437,
      remark:
        'The inspector noted an electrical defect in the garbage disposal during the home inspection. The defect may include frayed or damaged electrical wiring, loose connections, or other issues that can pose potential safety issues.',
      templateSubCategoryId: 72,
      type: 'Condition',
      title: 'Electrical defect ',
    },
    {
      templateRemarkId: 438,
      remark:
        'The inspector noted that the cord length on the garbage disposal was too short during the home inspection. This can cause strain on the electrical wires and affect the functioning of the disposal. The length of the flexible cord at the disposal (not hard-wired) should be 18" to 36" inches long. ',
      templateSubCategoryId: 72,
      type: 'Condition',
      title: 'Cord length too short (disposal)',
    },
    {
      templateRemarkId: 439,
      remark:
        'The inspector noted an inoperable garbage disposal during the home inspection. An inoperable garbage disposal can affect the functionality of the kitchen sink and cause inconvenience to the occupants',
      templateSubCategoryId: 72,
      type: 'Condition',
      title: 'inoperable ',
    },
    {
      templateRemarkId: 440,
      remark:
        'The inspector noted excessive noise in the garbage disposal during the home inspection. Excessive noise can indicate potential issues with the disposal, such as loose or worn parts, and can affect the functioning of the disposa',
      templateSubCategoryId: 72,
      type: 'Condition',
      title: 'excessive noise',
    },
  ]);
};
