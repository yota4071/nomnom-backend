import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

export type LambdaHandler = (
  event: APIGatewayProxyEvent,
  context: Context
) => Promise<APIGatewayProxyResult>

export interface AuthenticatedEvent extends APIGatewayProxyEvent {
  user?: {
    uid: string
    email: string
    name?: string
  }
}

export interface DatabaseConfig {
  url: string
}

export interface FirebaseConfig {
  projectId: string
  privateKey: string
  clientEmail: string
}

export interface ErrorResponse {
  statusCode: number
  message: string
  details?: any
}