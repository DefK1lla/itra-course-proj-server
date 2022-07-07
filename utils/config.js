require('dotenv').config();

module.exports = {
   DB_URI: process.env.DB_URI,
   PORT: process.env.PORT || 5000,
   SECRET_KEY: process.env.SECRET_KEY || "kakoy-to-kluch",
   MY_AWS_BUCKET_NAME: process.env.MY_BUCKET_NAME, 
   MY_AWS_BUCKET_REGION: process.env.MY_BUCKET_REG, 
   MY_AWS_ACCESS_KEY: process.env.MY_ACCESS_KEY, 
   MY_AWS_SECRET_KEY: process.env.MY_SECRET_KEY, 
   MY_AWS_BUCKET_ADDRESS: process.env.MY_BUCKET_ADDRESS
}