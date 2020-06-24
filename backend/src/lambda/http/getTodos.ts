import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getTodos } from '../../businessLogic/todo'
import { ResponseHelper } from '../../helpers/respHelper'


const logger = createLogger('getTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  try {
    const item = await getTodos(event)
    logger.info('Item GET successfully')
    return new ResponseHelper().SuccessResponse(200, item)
  } catch (err) {
    logger.info('GET item failed')
    return new ResponseHelper().ErrorResponse(400, err)
  }
}
