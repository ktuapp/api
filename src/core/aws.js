import aws from 'aws-sdk'
require('dotenv').config()

const s3 = new aws.S3()
aws.config.region = 'us-east-1'

const Bucket =  process.env.S3_BUCKET

export const getS3file = (key) => {

  const params = { Bucket, Key: key, Expires: 20 }

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) reject(err)
      else resolve(url)
    })
  })
}
