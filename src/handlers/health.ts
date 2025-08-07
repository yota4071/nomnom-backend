import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { successResponse } from '../lib/response'

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  return successResponse({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.STAGE || 'dev',
    version: '1.0.0'
  })
}