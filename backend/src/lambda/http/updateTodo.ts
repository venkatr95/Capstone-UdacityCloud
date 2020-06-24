import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { updateTodo } from '../../businessLogic/todo'
import { ResponseHelper } from '../../helpers/respHelper'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

const logger = createLogger('updateTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  try {
    const data = await updateTodo(event, updatedTodo)
    logger.info('Item Updated successfully')
    return new ResponseHelper().SuccessResponse(200, data)
  } catch (err) {
    logger.info('Update item failed')
    return new ResponseHelper().ErrorResponse(400, err)
  }

}
