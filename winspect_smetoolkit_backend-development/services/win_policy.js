const { models } = require('../database');
const { NotFoundError, handleKnownErrors } = require('../helpers/error');

const createAPolicy = async (req) => {
  try {
    const { name, url, sequenceNo } = req.body;

    const policy = await models.win_policy.create({
      name,
      url,
      sequenceNo
    });

    return {
      status: 201,
      data: policy
    };
  } catch (error) {
    return handleKnownErrors(error);
  }
};

const listAllPolicies = async () => {
  try {
    const policies = await models.win_policy.findAll({
      where: {
        deletedAt: null
      }
    });

    return {
      status: 200,
      data: policies
    };
  } catch (error) {
    return handleKnownErrors(error);
  }
};

const updateAPolicy = async (req) => {
  try {
    const { winPolicyId } = req.params;
    const { name, url, sequenceNo } = req.body;

    const policy = await models.win_policy.findByPk(winPolicyId);
    if (!policy) {
      throw new NotFoundError(messages.winPolicies.NOT_FOUND);
    }

    await policy.update({
      name,
      url,
      sequenceNo
    });

    return {
      status: 200,
      data: policy
    };
  } catch (error) {
    return handleKnownErrors(error);
  }
};

const deleteAPolicy = async (req) => {
  try {
    const { winPolicyId } = req.params;

    const policy = await models.win_policy.findByPk(winPolicyId);
    if (!policy) {
      throw new NotFoundError(messages.winPolicies.NOT_FOUND);
    }

    await policy.destroy();

    return {
      status: 200,
      data: { deleted: true }
    };
  } catch (error) {
    return handleKnownErrors(error);
  }
};

const getAPolicy = async (req) => {
  try {
    const { winPolicyId } = req.params;

    const policy = await models.win_policy.findOne({
      where: {
        winPolicyId,
        deletedAt: null
      }
    });

    if (!policy) {
      throw new NotFoundError(messages.winPolicies.NOT_FOUND);
    }

    return {
      status: 200,
      data: policy
    };
  } catch (error) {
    return handleKnownErrors(error);
  }
};

module.exports = {
  createAPolicy,
  listAllPolicies,
  updateAPolicy,
  deleteAPolicy,
  getAPolicy
};