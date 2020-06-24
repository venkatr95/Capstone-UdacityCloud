import {  APIGatewayProxyResult } from 'aws-lambda'


// Helper for response
export class ResponseHelper{
    SuccessResponse(statusCode: number, items: any): APIGatewayProxyResult{
        return {
        statusCode: statusCode,
        headers:{
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
            items
        })
        }
    }


    EmptyResponse(statusCode: number, message: any): APIGatewayProxyResult{
        return {
        statusCode: statusCode,
        headers:{
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
            message
        })
        }
    }

    ErrorResponse(statusCode: number, message: string): APIGatewayProxyResult{
        return {
        statusCode: statusCode,
        headers:{
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
            message
        })
        }
    }
}