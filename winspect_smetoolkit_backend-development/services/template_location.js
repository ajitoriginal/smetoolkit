const { models } = require('../database/index');
const {
  handleKnownErrors,
  BadRequestError,
  NotFoundError,
} = require('../helpers/error');
const messages = require('../helpers/messages');

const addLocation = async (req) => {
  const { location, templateId } = req.body;
  const { id } = req.smeUser;
  try {
    // check if template
    const template = await models.template.findByPk(templateId);

    if (!template) {
      throw new NotFoundError(messages.template.TEMPLATE_NOT_FOUND);
    }

    // if (!template.isDraft) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    if (!template.hasLocation) {
      throw new BadRequestError('Location is turned off for this service!');
    }

    // create category for a template
    const createdLocation = await models.template_location.findOrCreate({
      where:{
        templateId,
        location,
      },
      defaults:{
        templateId,
        location,
        createdBySme: id,
        updatedBySme: id,
      }
    });

    return createdLocation;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const listLocations = async (req) => {
  const { templateId } = req.query;
  try {
    const templateLocations = await models.template_location.findAll({
      where: {
        templateId,
      },
      order: [['location', 'ASC']],
    });

    return templateLocations;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const editLocation = async (req) => {
  const { templateLocationId, location } = req.body;
  const { id } = req.smeUser;
  try {
    const templateLocation = await models.template_location.findOne({
      where: {
        templateLocationId,
      },
      include: {
        model: models.template,
        required: true,
      },
    });

    if (!templateLocation) {
      throw new NotFoundError(
        messages.templateLocation.TEMPLATE_LOCATION_NOT_FOUND
      );
    }

    // if (!templateLocation.template.isDraft && templateLocation) {
    //   throw new BadRequestError('Cannot Make changes to published template');
    // }

    if (!templateLocation.template.hasLocation) {
      throw new BadRequestError('Location is turned off for this service!');
    }

    await templateLocation.update({
      location: location || templateLocation.location,
      updatedBySme: id,
    });

    return templateLocation;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const removeLocation = async (req) => {
  const { templateLocationId } = req.body;
  try {
    const templateLocation = await models.template_location.findOne({
      where: {
        templateLocationId,
      },
      include: {
        model: models.template,
        required: true,
      },
    });

    if (!templateLocation) {
      throw new NotFoundError(
        messages.templateLocation.TEMPLATE_LOCATION_NOT_FOUND
      );
    }

    if (!templateLocation.template.isDraft) {
      throw new BadRequestError('Cannot Make changes to published template');
    }

    // if (!templateLocation.template.hasLocation) {
    //   throw new BadRequestError('Location is turned off for this service!');
    // }

    await templateLocation.destroy();

    return templateLocation;
  } catch (e) {
    handleKnownErrors(e);
  }
};

module.exports = {
  listLocations,
  editLocation,
  removeLocation,
  addLocation,
};
