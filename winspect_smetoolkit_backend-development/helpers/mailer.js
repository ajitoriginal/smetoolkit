const mailer = require('nodemailer');
const aws = require('@aws-sdk/client-ses');
const { ServerError } = require('./error');

const ses = new aws.SES({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: 'us-east-1',
});

const transporter = mailer.createTransport({
  SES: { ses, aws },
});

const sendEmailToAIEngIfDataNotUploadedToSearch = async (email, templateId, error) => {
  try {
    const body = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: 'URGENT - SMETOOLKIT SEARCH UPLOAD FAILED!!',
      html: `<p> Data was not uploaded to search repositroy. Please find below the templateId and error response </p> <p> 
      <br> <br>TemplateId : ${templateId}, Error: ${error} </p>`,
    };

    await transporter.sendMail(body);
  } catch (e) {
    throw new ServerError(e.message);
  }
};

module.exports = {
  sendEmailToAIEngIfDataNotUploadedToSearch,
};
