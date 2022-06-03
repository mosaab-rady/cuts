const { S3 } = require('aws-sdk');

module.exports = class Image {
  s3() {
    return new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async upload({ body, key }) {
    const res = await this.s3()
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: body,
        Key: key,
        ContentType: 'image/jpeg',
      })
      .promise();

    console.log(res.Location);
    return res.Location;
  }

  async delete({ key }) {
    await this.s3()
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
      .promise();
  }
};
