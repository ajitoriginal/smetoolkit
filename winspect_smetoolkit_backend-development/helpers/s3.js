const AWS = require('aws-sdk');
const { successLog, errorLog } = require('./loggers');

AWS.config.update({ region: 'us-east-1' });

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_S3_BUCKET_NAME,
});

const URL_EXPIRATION_SECONDS = 300;

const getPreSignedUrl = (res, type, key) => {
  s3.getSignedUrl(
    'putObject',
    {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContentType: type,
      Key: key,
    },
    (err, url) => {
      res.send({ key, url });
    }
  );
};

const getUploadURLForTemplate = async function (templateName, version, type) {
  const randomID = parseInt(Math.random() * 10000000);

  const Key = `templates/${templateName.replace(/ /g, '_')}/${version}/original/original_${randomID}.${type}`;

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: `image/${type}`,
    ACL: 'public-read',
  };
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
  return {
    uploadURL,
    Key,
  };
};

const getUploadURLForTemplateCategoryIcon = async function (serviceName, version, type) {
  const randomID = parseInt(Math.random() * 10000000);

  const Key = `templates/${serviceName.replace(/ /g, '_')}/${version}/categories/original/original_${randomID}.${type}`;

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: `image/${type}`,
    ACL: 'public-read',
  };
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
  return {
    uploadURL,
    Key,
  };
};

const getUploadURLForTemplateRemarkImage = async function (serviceName, version, random) {
  const randomID = random ? random : parseInt(Math.random() * 10000000);

  const Key = `templates/${serviceName.replace(/ /g, '_')}/${version}/categories/original/original_${randomID}.jpg`;

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/jpeg',
    ACL: 'public-read',
  };
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
  return {
    uploadURL,
    Key,
  };
};

const getUploadURLForTemplateImage = async function (templateName, version, imageTitle, timestamp) {
  const Key = `templates/${templateName.replace(/ /g, '_')}/${version}/images/original/original_${timestamp}.jpg`;

  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/jpeg',
    ACL: 'public-read',
  };
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
  return {
    uploadURL,
    Key,
  };
};

const uploadTemplateJsonTOS3 = async (jsonContent, templateName, version, fileName) => {
  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `templates/${templateName.replace(/ /g, '_')}/${version}/json_dumps/${fileName}.json`,
    Body: jsonContent,
    ContentType: 'application/json',
    ACL: 'public-read',
  };

  try {
    console.log('before s3 upload');
    const data = await s3.putObject(s3Params).promise();

    console.log(data);

    console.log(`JSON file uploaded successfully to S3 - ${s3Params.Key}`);
  } catch (err) {
    console.error('Error uploading JSON file to S3:', err);
  }

  return s3Params;
};

// delete offline objects periodically
const deleteOfflineObject = async () => {
  try {
    const tenMinuteAgo = new Date(Date.now() - 600000); // Current time minus one minute

    const listParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: 'offline_json_dumps/',
    };

    const { Contents } = await s3.listObjectsV2(listParams).promise();

    const objectsToDelete = Contents.filter((obj) => obj.LastModified < tenMinuteAgo);

    if (objectsToDelete.length > 0) {
      const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Delete: {
          Objects: objectsToDelete.map((obj) => ({ Key: obj.Key })),
          Quiet: true,
        },
      };

      await s3.deleteObjects(deleteParams).promise();

      console.log(`Deleted ${objectsToDelete.length} object(s) 10 minute or older.`);
    } else {
      console.log('No objects found to delete.');
    }
  } catch (e) {
    errorLog('S3 Cron job', `Something went wrong:${e}`);
  }
};

const storeOfficeRemarksToS3 = async (remarkDataArray, templateId, templateName, version) => {
  const s3UploadResults = [];

  for (const officeRemarkData of remarkDataArray) {
    const { officeId, remarks } = officeRemarkData;

    // Convert JSON to string
    const jsonContent = JSON.stringify({ officeId, remarks }, null, 2);

    // Define S3 file path (each office gets a unique file)
    const fileKey = `templates/${templateName.replace(/ /g, '_')}/${version}/json_dumps/office_${officeId}${new Date().getTime()}.json`; // TODO CK


    const s3Params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Body: jsonContent,
      ContentType: 'application/json',
      ACL: 'public-read',
    };

    try {
      // Upload JSON to S3

      console.log('before s3 upload');

      const data = await s3.putObject(s3Params).promise();
  
      console.log(data);

      console.log(`Uploaded JSON for office ${officeId} at ${fileKey}`);


      s3UploadResults.push({
        officeId,
        templateId,
        remarkJsonKey: fileKey,
        remarkJsonUpdatedAt: Date.now(),
      });

    } catch (e) {
      console.error('Error uploading JSON file to S3:', e);
    }
  }
  return s3UploadResults;
};


module.exports = {
  getPreSignedUrl,
  getUploadURLForTemplateCategoryIcon,
  getUploadURLForTemplate,
  getUploadURLForTemplateImage,
  uploadTemplateJsonTOS3,
  deleteOfflineObject,
  getUploadURLForTemplateRemarkImage,
  storeOfficeRemarksToS3,
};
