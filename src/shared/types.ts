export interface Shop {
  id: string
  name: string
  location: string
  image: string
  type: string
  dish: string
  rating: number
  reviewCount: number
  description: string
}

export interface ShopCreateInput {
  name: string
  location: string
  image: string
  type: string
  dish: string
  description: string
}

export interface ShopUpdateInput {
  name?: string
  location?: string
  image?: string
  type?: string
  dish?: string
  description?: string
}

export interface ShopQueryParams {
  dish?: string
  type?: string
  search?: string
  location?: string
  limit?: number
  offset?: number
  sortBy?: 'rating' | 'name' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface User {
  id: string
  email: string
  name?: string
  firebaseUid: string
}

export interface Review {
  id: string
  rating: number
  comment?: string
  shopId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface ReviewCreateInput {
  rating: number
  comment?: string
  shopId: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasNext: boolean
    hasPrev: boolean
  }
}