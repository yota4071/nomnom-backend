import { APIGatewayProxyResult } from 'aws-lambda'
import { ApiResponse, PaginationResponse } from '../shared/types'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Content-Type': 'application/json'
}

export const successResponse = <T>(
  data: T,
  statusCode: number = 200
): APIGatewayProxyResult => {
  const response: ApiResponse<T> = {
    success: true,
    data
  }
  
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(response)
  }
}

export const paginationResponse = <T>(
  data: T[],
  total: number,
  limit: number,
  offset: number,
  statusCode: number = 200
): APIGatewayProxyResult => {
  const response: PaginationResponse<T> = {
    success: true,
    data,
    pagination: {
      total,
      limit,
      offset,
      hasNext: offset + limit < total,
      hasPrev: offset > 0
    }
  }
  
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(response)
  }
}

export const errorResponse = (
  error: string,
  statusCode: number = 500,
  details?: any
): APIGatewayProxyResult => {
  const response: ApiResponse<null> = {
    success: false,
    error,
    ...(details && { message: details })
  }
  
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(response)
  }
}

export const corsResponse = (): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: ''
  }
}