import 'source-map-support/register';
import { APIGatewayProxyEvent } from 'aws-lambda';
import UidHelper from "../helpers/uidHelper";
import TodosAccess from '../dataLayer/todosAccess';
import TodoS3 from '../dataLayer/todoS3';
import { getUserId } from '../lambda/utils';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import { TodoItem } from '../models/TodoItem';

const todosAccess = new TodosAccess();
const todoS3 = new TodoS3();

export async function createTodo(event: APIGatewayProxyEvent,
                                 createTodoRequest: CreateTodoRequest): Promise<TodoItem> {
    const todoId = new UidHelper().getId()
    const userId = getUserId(event);
    const createdAt = new Date().toISOString();

    const todoItem = {
        userId,
        todoId,
        createdAt,
        done: false,
        hasImage: false,
        attachmentUrl: "",
        ...createTodoRequest
    };

    await todosAccess.createTodoDB(todoItem);

    return todoItem;
}

export async function deleteTodo(event: APIGatewayProxyEvent) {
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);

    await todosAccess.deleteTodoDB(todoId, userId);
    return true;
}

export async function getTodo(event: APIGatewayProxyEvent) {
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);
    return await todosAccess.getTodoDB(todoId, userId);
}

export async function getTodos(event: APIGatewayProxyEvent) {
    const userId = getUserId(event);
    return await todosAccess.getAllDB(userId);
}

export async function updateTodo(event: APIGatewayProxyEvent, updateTodoRequest: UpdateTodoRequest) {
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);

    if (!(await todosAccess.getTodoDB(todoId, userId))) {
        return false;
    }

    return await todosAccess.updateTodoDB(todoId, userId, updateTodoRequest);
}

export async function generateUploadUrl(event: APIGatewayProxyEvent) {
    const bucket = todoS3.getBucket();
    const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION);
    const todoId = event.pathParameters.todoId;

    const createSignedUrlRequest = {
        Bucket: bucket,
        Key: todoId,
        Expires: urlExpiration
    }
    return todoS3.getPresignedUploadURL(createSignedUrlRequest);
}

export async function updateTodoImage(updatedTodo, userId: string, todoId: string): Promise<TodoItem>{
    return await todosAccess.updateUrlDB({
        userId,
        todoId,
        attachmentUrl: updatedTodo.attachmentUrl,
        hasImage: updatedTodo.hasImage
    })
}
