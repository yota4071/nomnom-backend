// Temporary mock for local development without database
export const mockShops = [
  {
    id: "1",
    name: "たこ焼き王国",
    location: "キャンパス前広場",
    image: "/images/sample.jpg",
    type: "たこ焼き",
    dish: "和食",
    rating: 4.5,
    reviewCount: 32,
    description: "本格的な大阪たこ焼きが楽しめます",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "イタリアンピザ屋台",
    location: "学生会館前",
    image: "/images/sample.jpg",
    type: "ピザ",
    dish: "洋食",
    rating: 4.2,
    reviewCount: 28,
    description: "薪窯で焼く本格ナポリピザ",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export const mockPrisma = {
  shop: {
    findMany: async ({ where, take, skip, orderBy }: any = {}) => {
      let shops = mockShops.filter(shop => shop.isActive)
      
      // Simple filtering
      if (where?.dish?.contains) {
        shops = shops.filter(shop => 
          shop.dish.toLowerCase().includes(where.dish.contains.toLowerCase())
        )
      }
      
      if (where?.OR) {
        const searchTerm = where.OR[0]?.name?.contains?.toLowerCase() || ""
        if (searchTerm) {
          shops = shops.filter(shop => 
            shop.name.toLowerCase().includes(searchTerm) ||
            shop.description.toLowerCase().includes(searchTerm)
          )
        }
      }
      
      // Simple pagination
      if (skip) shops = shops.slice(skip)
      if (take) shops = shops.slice(0, take)
      
      return shops
    },
    
    findFirst: async ({ where }: any) => {
      return mockShops.find(shop => 
        shop.id === where.id || (shop.name === where.name && shop.isActive)
      ) || null
    },
    
    count: async ({ where }: any = {}) => {
      return mockShops.filter(shop => shop.isActive).length
    },
    
    create: async ({ data }: any) => {
      const newShop = {
        id: String(mockShops.length + 1),
        ...data,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      mockShops.push(newShop)
      return newShop
    },
    
    update: async ({ where, data }: any) => {
      const index = mockShops.findIndex(shop => shop.id === where.id)
      if (index !== -1) {
        mockShops[index] = { ...mockShops[index], ...data, updatedAt: new Date() }
        return mockShops[index]
      }
      throw new Error('Shop not found')
    }
  }
}