import { S3 } from 'aws-sdk';
import { WebsiteObjectDefinition } from 'src/03-model/website-object.definition';
import { PrintWebsiteService } from './print-website.service';
export class UploadS3Service {
  s3Svc: S3;
  bucket: string;

  constructor() {
    this.s3Svc = new S3();
    this.bucket = process.env.S3_BUCKET;
  }

  uploadToS3(imgWebData: WebsiteObjectDefinition, bucket: string) {
    const data = new PrintWebsiteService().printScreenWebsite(
      imgWebData.url,
      bucket,
    );
    const objKey = `${bucket}/${imgWebData.id}`;
    const params = {
      Bucket: bucket,
      Key: objKey,
      Body: data,
      ContentType: 'img/png',
    };

    this.s3Svc
      .putObject(params, function (err, imageBuffer) {
        if (err) console.log(err, err.stack); //! an error occurred
        else console.log('Successfully added: ' + imageBuffer); //* successful response
      })
      .promise();
  }
}
// var albumPhotosKey = encodeURIComponent(albumName) + "/";

// var photoKey = albumPhotosKey + fileName;

// // Use S3 ManagedUpload class as it supports multipart uploads
// var upload = new AWS.S3.ManagedUpload({
//   params: {
//     Bucket: albumBucketName,
//     Key: photoKey,
//     Body: file
//   }
// });
