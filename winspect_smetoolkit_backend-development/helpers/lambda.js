const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

async function invokeTemplateS3LambdaAsync(templateId) {
  const lambda = new AWS.Lambda();

  const params = {
    FunctionName: process.env.STORE_TEMPLATE_JSON_LAMBDA_FUNCTION,
    InvocationType: 'Event',
    Payload: JSON.stringify(templateId),
  };

  try {
    const data = await lambda.invoke(params).promise();
    console.log('Lambda function invoked successfully:', data);
  } catch (err) {
    console.error('Error invoking Lambda function:', err);
  }
}

async function invokeCreateDraftTemplateLambda(payload) {
  const lambda = new AWS.Lambda();

  const params = {
    FunctionName: process.env.CREATE_TEMPLATE_DRAFT_LAMBDA_FUNCTION,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(payload),
  };

  try {
    const data = await lambda.invoke(params).promise();
    console.log('Lambda function invoked successfully:', data);

    return data;
  } catch (err) {
    console.error('Error invoking Lambda function:', err);
  }
}

async function invokePublishedTemplateToSearchRepo(templateId) {
  const lambda = new AWS.Lambda();

  const params = {
    FunctionName: process.env.SEARCH_REPO_LAMBDA,
    InvocationType: 'Event',
    Payload: JSON.stringify(templateId),
  };

  try {
    const data = await lambda.invoke(params).promise();
    console.log('Lambda function invoked successfully:', data);
  } catch (err) {
    console.error('Error invoking Lambda function:', err);
  }
}

module.exports = { invokeTemplateS3LambdaAsync, invokeCreateDraftTemplateLambda, invokePublishedTemplateToSearchRepo };
