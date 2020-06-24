import { CreateSignedURLRequest } from '../requests/CreateSignedUrlRequest';
import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk'
import UidHelper from "../helpers/uidHelper";

const XAWS = AWSXRay.captureAWS(AWS)
export default class TodoS3 {
    constructor(
        private readonly todosS3 = process.env.TODOS_S3_BUCKET,
        private readonly s3 = new XAWS.S3({ signatureVersion: 'v4'})
    ) {}

    getBucket() {
        return this.todosS3
    }

    getPresignedUploadURL(createSignedUrlRequest: CreateSignedURLRequest) {
        const urlId = new UidHelper().getId()
        const imageUrl = `https://${process.env.TODOS_S3_BUCKET}.s3.amazonaws.com/${urlId}`
        const signedUrl = this.s3.getSignedUrl('putObject', createSignedUrlRequest)
        const urlParams = {
            imageUrl: imageUrl,
            signedUrl: signedUrl
        }
        return urlParams
    }

    getImageUrl(todoId){
        const imageUrl = `https://${process.env.TODOS_S3_BUCKET}.s3.amazonaws.com/${todoId}`
        return imageUrl
    }
}