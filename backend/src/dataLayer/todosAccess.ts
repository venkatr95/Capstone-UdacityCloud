import * as AWS from 'aws-sdk';;
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem';

const logger = createLogger('createTodo')


export default class TodosAccess {
  constructor(
      private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
      private readonly todoTable = process.env.TODO_TABLE,
      private readonly userIdIndex = process.env.USER_ID_INDEX
  ) {}

  async createTodoDB(todoItem) {
      await this.docClient.put({
          TableName: this.todoTable,
          Item: todoItem
      }).promise();
  }


  async deleteTodoDB(todoId, userId) {
      await this.docClient.delete({
          TableName: this.todoTable,
          Key: {
              todoId,
              userId
          }
      }).promise();
  }

  async getTodoDB(todoId, userId) {
      const result = await this.docClient.get({
          TableName: this.todoTable,
          Key: {
              todoId,
              userId
          }
      }).promise();

      return result.Item;
  }

  async getAllDB(userId) {
      const result = await this.docClient.query({
          TableName: this.todoTable,
          IndexName: this.userIdIndex,
          KeyConditionExpression: 'userId = :userId',
          ExpressionAttributeValues: {
              ':userId': userId
          }
      }).promise();

      return result.Items;
  }

  async updateTodoDB(todoId, userId, updatedTodo) {
      await this.docClient.update({
          TableName: this.todoTable,
          Key: {
              todoId,
              userId
          },
          UpdateExpression: 'set username = :n, dueDate = :due, done = :d',
          ExpressionAttributeValues: {
              ':n': updatedTodo.name,
              ':due': updatedTodo.dueDate,
              ':d': updatedTodo.done
          },
          ReturnValues: "UPDATED_NEW"
      }).promise();
  }
  
  async updateUrlDB(updatedTodo: any): Promise<TodoItem> {
    logger.info("Url update on image")
    await this.docClient.update({
        TableName: this.todoTable,
        Key: {
            todoId: updatedTodo.todoId,
            userId: updatedTodo.userId
        },
        UpdateExpression: 'set attachmentUrl = :a, hasImage = :i',
        ExpressionAttributeValues: {
            ":a": updatedTodo.attachmentUrl,
            ":i": updatedTodo.hasImage
        },
        ReturnValues:"UPDATED_NEW"
    }).promise();
    return updatedTodo
}
}