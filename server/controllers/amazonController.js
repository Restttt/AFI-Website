const aws = require('aws-sdk');

const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET, AWS_REGION} = process.env;

module.exports = {
    getAWS: async (req, res) => {
        aws.config = {
            region: AWS_REGION,
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        };

        const {fileName, fileType} = req.body;
        const s3 = new aws.S3();
        
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };

        await s3.getSignedUrl('putObject', s3Params, (error, data) => {
            if (error) {
                console.log(error);
                return res.end();
            } else {
                const returnData = {
                    signedRequest: data,
                    url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
                };
            res.status(200).send(returnData);
        }});
    }
};
