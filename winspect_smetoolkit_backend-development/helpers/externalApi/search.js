const axios = require('axios');
const messages = require('../messages');
const { ServerError, handleKnownErrors, BadRequestError } = require('../error');
const { sendEmailToAIEngIfDataNotUploadedToSearch } = require('../mailer');
const { uploadTemplateJsonTOS3 } = require('../s3');
const { successLog } = require('../loggers');
const { models } = require('../../database/index');
const { invokePublishedTemplateToSearchRepo } = require('../lambda');

const uploadToSearchRepository = async (data, Key) => {
  try {
    const path = `${process.env.S3_Location}${Key}`;

    // const res = await axios.post(process.env.SEARCH_UPLOAD_URL, { path });

    await invokePublishedTemplateToSearchRepo(path);

    console.log(path);
    successLog('Data sent to Opensearch :', 'Data sent to ES pipeline successfully');
  } catch (e) {
    // handleKnownErrors(e);
    // email AI engineer
    await sendEmailToAIEngIfDataNotUploadedToSearch(process.env.AI_TEAM_EMAIL, data.templateId, e);
  }
};

const addRemarkToPublishedTemplateES = async (data) => {
  try {
    const res = await axios.post(process.env.ES_REMARK_ENDPOINT, data);

    if (res.data.statusCode !== 200) {
      throw new BadRequestError(res.data.body);
    }

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const editPublishedTemplateRemarkES = async (data) => {
  try {
    const res = await axios.put(process.env.ES_REMARK_ENDPOINT, data);

    if (res.data.statusCode !== 200) {
      throw new BadRequestError(res.data.body);
    }

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

const deletePublishedTemplateRemarkES = async (data) => {
  try {
    const res = await axios.delete(process.env.ES_REMARK_ENDPOINT, { data });

    if (res.data.statusCode !== 200) {
      throw new BadRequestError(res.data.body);
    }

    return;
  } catch (e) {
    handleKnownErrors(e);
  }
};

module.exports = {
  uploadToSearchRepository,
  addRemarkToPublishedTemplateES,
  editPublishedTemplateRemarkES,
  deletePublishedTemplateRemarkES,
};
