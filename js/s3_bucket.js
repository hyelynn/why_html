var s3 = new AWS.S3({
    accessKeyId: '<YOUR_ACCESS_KEY>',
    secretAccessKey: '<YOUR_SECRET_ACCESS_KEY>'
  });
  
  var uploadPreSignedUrl = s3.getSignedUrl('putObject', {
      Bucket: '<THE_BUCKET_NAME>',
      Key: '<THE_UPLOADED_FILENAME>',
      ACL: 'authenticated-read',
      // This must match with your ajax contentType parameter
      ContentType: 'binary/octet-stream'
  
      /* then add all the rest of your parameters to AWS puttObect here */
  });
  
  var downloadPreSignedUrl = s3.getSignedUrl('getObject', {
      Bucket: '<THE_BUCKET_NAME>',
      Key: '<THE_UPLOADED_FILENAME>',
      /* set a fixed type, or calculate your mime type from the file extension */
      ResponseContentType: 'image/jpeg'
      /* and all the rest of your parameters to AWS getObect here */
  });
  
  // now you have both urls
  console.log( uploadPreSignedUrl, downloadPreSignedUrl ); 