import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleShops = [
  {
    name: 'たこ焼き王国',
    location: 'キャンパス前広場',
    image: '/images/sample.jpg',
    type: 'たこ焼き',
    dish: '和食',
    rating: 4.5,
    reviewCount: 32,
    description: '本格的な大阪たこ焼きが楽しめます'
  },
  {
    name: 'イタリアンピザ屋台',
    location: '学生会館前',
    image: '/images/sample.jpg',
    type: 'ピザ',
    dish: '洋食',
    rating: 4.2,
    reviewCount: 28,
    description: '薪窯で焼く本格ナポリピザ'
  },
  {
    name: '中華麺工房',
    location: '図書館横',
    image: '/images/sample.jpg',
    type: 'ラーメン',
    dish: '中華',
    rating: 4.7,
    reviewCount: 45,
    description: '手打ち麺の本格中華ラーメン'
  },
  {
    name: 'タイ屋台カフェ',
    location: '体育館前',
    image: '/images/sample.jpg',
    type: 'タイ料理',
    dish: 'アジア',
    rating: 4.3,
    reviewCount: 22,
    description: '本格タイカレーとパッタイが人気'
  },
  {
    name: 'ハンバーガートラック',
    location: 'メインゲート',
    image: '/images/sample.jpg',
    type: 'ハンバーガー',
    dish: '洋食',
    rating: 4.0,
    reviewCount: 35,
    description: 'ボリューミーな手作りバーガー'
  },
  {
    name: 'クレープ工房',
    location: '学食前',
    image: '/images/sample.jpg',
    type: 'クレープ',
    dish: 'スイーツ',
    rating: 4.6,
    reviewCount: 18,
    description: '甘い系からお食事系まで豊富なクレープ'
  },
  {
    name: '焼き鳥屋台',
    location: '駐車場脇',
    image: '/images/sample.jpg',
    type: '焼き鳥',
    dish: '和食',
    rating: 4.4,
    reviewCount: 29,
    description: '炭火でじっくり焼いた香ばしい焼き鳥'
  },
  {
    name: 'フレンチトースト号',
    location: '噴水前',
    image: '/images/sample.jpg',
    type: 'フレンチトースト',
    dish: 'スイーツ',
    rating: 4.1,
    reviewCount: 24,
    description: 'ふわふわとろとろの絶品フレンチトースト'
  }
]

async function main() {
  console.log('Start seeding...')
  
  for (const shop of sampleShops) {
    const existingShop = await prisma.shop.findFirst({
      where: { name: shop.name }
    })
    
    if (!existingShop) {
      await prisma.shop.create({
        data: shop
      })
    }
  }
  
  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })