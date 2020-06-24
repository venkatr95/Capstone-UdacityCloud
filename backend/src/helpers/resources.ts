import * as AWS from 'aws-sdk'

export class XawsHelper{

    getDocumentClient(){
        return new AWS.DynamoDB.DocumentClient()
    }

    getS3(regionName:string, bucketName: string){
        return new AWS.S3({
            signatureVersion: 'v4',
            region: regionName,
            params: {Bucket: bucketName}
          })
    }
}