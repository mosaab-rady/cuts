const { S3 } = require('aws-sdk');

module.exports = class Image {
  constructor(key, body) {
    this.key = key;
    this.body = body;
  }

  s3() {
    return new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async upload() {
    const res = await this.s3()
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: this.body,
        Key: this.key,
        ContentType: 'image/jpeg',
      })
      .promise();

    return res.Location;
  }

  async delete() {
    await this.s3()
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: this.key,
      })
      .promise();
  }
};
