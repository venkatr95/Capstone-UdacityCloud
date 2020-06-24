import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { generateUploadUrl, updateTodoImage } from '../../businessLogic/todo'
import { getUserId } from '../utils';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const logger = createLogger('putSignUrlTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event);

  logger.info('Processing event: ', event, todoId)
  const urlp = generateUploadUrl(event);

  const signedUrl = (await urlp).signedUrl;
  const imageUrl = (await urlp).imageUrl;

  const updatedTodo = {
    attachmentUrl: imageUrl,
    hasImage: true
  }

  await updateTodoImage(updatedTodo, userId, todoId)
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl: signedUrl,
      imageUrl: imageUrl
    })
  };
}
