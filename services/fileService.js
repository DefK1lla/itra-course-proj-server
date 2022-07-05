const AWS = require('aws-sdk');

const { 
   MY_AWS_BUCKET_NAME, 
   MY_AWS_BUCKET_REGION, 
   MY_AWS_ACCESS_KEY, 
   MY_AWS_SECRET_KEY, 
   MY_AWS_BUCKET_ADDRESS 
} = require('../utils/config');

AWS.config.update({
    accessKeyId: MY_AWS_ACCESS_KEY,
    secretAccessKey: MY_AWS_SECRET_KEY
});

const s3 = new AWS.S3();

class FileService {
   upload = async (file) => {
      const fileName = Date.now() + '.' + file.mimetype.split('/')[1];
      const uploadParams = {
        Bucket: MY_AWS_BUCKET_NAME,
        Body: file.data,
        Key: fileName,
        ContentType: file.mimetype,
        ACL: 'public-read'
      };
      const data = await s3.putObject(uploadParams).promise();

      return MY_AWS_BUCKET_ADDRESS + fileName;
   };
}

module.exports = new FileService();