import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { deleteTodo } from '../../businessLogic/todo'
import { ResponseHelper } from '../../helpers/respHelper'

const logger = createLogger('deleteTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)
  try {
    await deleteTodo(event)
    logger.info('Item deleted successfully')
    return new ResponseHelper().SuccessResponse(200, "")

  } catch (err) {
    logger.info('Delete item failed')
    return new ResponseHelper().ErrorResponse(400, err)
  }
}
