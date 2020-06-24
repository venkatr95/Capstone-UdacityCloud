//import * as AWSXRay from 'aws-xray-sdk'
import * as AWS from 'aws-sdk'

export class XawsHelper{

    getDocumentClient(){
        //const XAWS = AWSXRay.captureAWS(AWS)
        return new AWS.DynamoDB.DocumentClient()
    }

    getS3(regionName:string, bucketName: string){
        //const XAWS = AWSXRa.captureAWS(AWS)
        return new AWS.S3({
            signatureVersion: 'v4',
            region: regionName,
            params: {Bucket: bucketName}
          })
    }
}