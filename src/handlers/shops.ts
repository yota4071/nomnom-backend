import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { Prisma } from '@prisma/client'
import prisma from '../lib/db'
import { successResponse, errorResponse, paginationResponse } from '../lib/response'
import { validateBody, validateQueryParams, shopCreateSchema, shopUpdateSchema, shopQuerySchema } from '../lib/validator'
import { Shop, ShopCreateInput, ShopUpdateInput, ShopQueryParams } from '../shared/types'

const mapShopToResponse = (shop: any): Shop => ({
  id: shop.id,
  name: shop.name,
  location: shop.location,
  image: shop.image,
  type: shop.type,
  dish: shop.dish,
  rating: shop.rating,
  reviewCount: shop.reviewCount,
  description: shop.description
})

export const getShops = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const queryParams = validateQueryParams(shopQuerySchema, event.queryStringParameters || {})
    if (!queryParams) {
      return errorResponse('Invalid query parameters', 400)
    }

    const {
      dish,
      type,
      search,
      location,
      limit = 20,
      offset = 0,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = queryParams

    let where: Prisma.ShopWhereInput = {
      isActive: true
    }

    if (dish) {
      where.dish = { contains: dish, mode: 'insensitive' }
    }

    if (type) {
      where.type = { contains: type, mode: 'insensitive' }
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { type: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ]
    }

    const orderBy: Prisma.ShopOrderByWithRelationInput = {}
    if (sortBy === 'rating') {
      orderBy.rating = sortOrder
    } else if (sortBy === 'name') {
      orderBy.name = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }

    const [shops, total] = await Promise.all([
      prisma.shop.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset
      }),
      prisma.shop.count({ where })
    ])

    const mappedShops = shops.map(mapShopToResponse)

    return paginationResponse(mappedShops, total, limit, offset)
  } catch (error) {
    console.error('Error fetching shops:', error)
    return errorResponse('Internal server error', 500)
  }
}

export const getShop = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const shopId = event.pathParameters?.id
    if (!shopId) {
      return errorResponse('Shop ID is required', 400)
    }

    const shop = await prisma.shop.findFirst({
      where: {
        id: shopId,
        isActive: true
      }
    })

    if (!shop) {
      return errorResponse('Shop not found', 404)
    }

    return successResponse(mapShopToResponse(shop))
  } catch (error) {
    console.error('Error fetching shop:', error)
    return errorResponse('Internal server error', 500)
  }
}

export const createShop = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const body = validateBody(shopCreateSchema, event.body || '{}')
    if (!body) {
      return errorResponse('Invalid request body', 400)
    }

    const shopData: ShopCreateInput = body

    const shop = await prisma.shop.create({
      data: {
        ...shopData,
        rating: 0,
        reviewCount: 0
      }
    })

    return successResponse(mapShopToResponse(shop), 201)
  } catch (error) {
    console.error('Error creating shop:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return errorResponse('Shop with this name already exists', 409)
      }
    }
    return errorResponse('Internal server error', 500)
  }
}

export const updateShop = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const shopId = event.pathParameters?.id
    if (!shopId) {
      return errorResponse('Shop ID is required', 400)
    }

    const body = validateBody(shopUpdateSchema, event.body || '{}')
    if (!body) {
      return errorResponse('Invalid request body', 400)
    }

    const updateData: ShopUpdateInput = body

    const existingShop = await prisma.shop.findFirst({
      where: {
        id: shopId,
        isActive: true
      }
    })

    if (!existingShop) {
      return errorResponse('Shop not found', 404)
    }

    const shop = await prisma.shop.update({
      where: { id: shopId },
      data: updateData
    })

    return successResponse(mapShopToResponse(shop))
  } catch (error) {
    console.error('Error updating shop:', error)
    return errorResponse('Internal server error', 500)
  }
}

export const deleteShop = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const shopId = event.pathParameters?.id
    if (!shopId) {
      return errorResponse('Shop ID is required', 400)
    }

    const existingShop = await prisma.shop.findFirst({
      where: {
        id: shopId,
        isActive: true
      }
    })

    if (!existingShop) {
      return errorResponse('Shop not found', 404)
    }

    await prisma.shop.update({
      where: { id: shopId },
      data: { isActive: false }
    })

    return successResponse({ message: 'Shop deleted successfully' })
  } catch (error) {
    console.error('Error deleting shop:', error)
    return errorResponse('Internal server error', 500)
  }
}