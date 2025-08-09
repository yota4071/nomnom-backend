import { z } from 'zod'

export const shopCreateSchema = z.object({
  name: z.string().min(1, 'Shop name is required').max(100),
  location: z.string().min(1, 'Location is required').max(100),
  image: z.string().url('Invalid image URL'),
  type: z.string().min(1, 'Type is required').max(50),
  dish: z.string().min(1, 'Dish category is required').max(50),
  description: z.string().min(1, 'Description is required').max(500)
})

export const shopUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  location: z.string().min(1).max(100).optional(),
  image: z.string().url('Invalid image URL').optional(),
  type: z.string().min(1).max(50).optional(),
  dish: z.string().min(1).max(50).optional(),
  description: z.string().min(1).max(500).optional()
})

export const shopQuerySchema = z.object({
  dish: z.string().optional(),
  type: z.string().optional(),
  search: z.string().optional(),
  location: z.string().optional(),
  limit: z.preprocess(
    (val) => val ? Number(val) : undefined,
    z.number().min(1).max(100).optional()
  ),
  offset: z.preprocess(
    (val) => val ? Number(val) : undefined,
    z.number().min(0).optional()
  ),
  sortBy: z.enum(['rating', 'name', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
})

export const reviewCreateSchema = z.object({
  rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
  comment: z.string().max(1000).optional(),
  shopId: z.string().min(1, 'Shop ID is required')
})

export const validateBody = <T>(schema: z.ZodSchema<T>, body: string): T | null => {
  try {
    const parsed = JSON.parse(body)
    return schema.parse(parsed)
  } catch (error) {
    return null
  }
}

export const validateQueryParams = <T>(schema: z.ZodSchema<T>, queryParams: any): T | null => {
  try {
    return schema.parse(queryParams)
  } catch (error) {
    return null
  }
}