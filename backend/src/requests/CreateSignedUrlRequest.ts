/**
 * Fields in a request to create a signed url.
 */
export interface CreateSignedURLRequest {
    Bucket: string,
    Key: string,
    Expires: number
}