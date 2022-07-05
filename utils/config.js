module.exports = {
   DB_URI: process.env.DB_URI || "mongodb+srv://user:user@cluster0.jgqf3.mongodb.net/?retryWrites=true&w=majority",
   PORT: process.env.PORT || 5000,
   SECRET_KEY: process.env.SECRET_KEY || "kakoy-to-kluch",
   MY_AWS_BUCKET_NAME: process.env.MY_BUCKET_NAME || 'def-cols', 
   MY_AWS_BUCKET_REGION: process.env.MY_BUCKET_REG || 'us-east-1', 
   MY_AWS_ACCESS_KEY: process.env.MY_ACCESS_KEY || 'AKIA4BLB3N47JN4GHM5J', 
   MY_AWS_SECRET_KEY: process.env.MY_SECRET_KEY || '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', 
   MY_AWS_BUCKET_ADDRESS: process.env.MY_BUCKET_ADDRESS || 'https://def-cols.s3.amazonaws.com/'
}