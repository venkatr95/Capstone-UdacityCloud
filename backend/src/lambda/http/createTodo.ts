import 'source-map-support/register'
import { createLogger } from '../../utils/logger'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/todo'
import { ResponseHelper } from '../../helpers/respHelper'

const logger = createLogger('createTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  logger.info('Processing event: ', event)

  if (newTodo.name == ""){
    logger.info('Item Empty')
    return new ResponseHelper().EmptyResponse(400, "Todo Empty")
  }

  try {
    const newtodo = await createTodo(event, newTodo)
    logger.info('Item Created successfully')
    return {
      statusCode: 200,
      headers:{
          'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({
          item: newtodo
      })
      }
  } catch (err) {
    logger.info('Create item failed')
    return new ResponseHelper().ErrorResponse(400, err)
  }
}
