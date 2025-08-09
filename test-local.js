const { handler: healthHandler } = require('./dist/src/handlers/health.js');
const { getShops } = require('./dist/src/handlers/shops.js');

async function testHealthAPI() {
  console.log('🧪 Testing Health API...');
  
  const event = {
    httpMethod: 'GET',
    path: '/health',
    headers: {},
    queryStringParameters: null,
    body: null,
    pathParameters: null
  };
  
  const context = {};
  
  try {
    const result = await healthHandler(event, context);
    console.log('✅ Health API Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Health API Error:', error.message);
  }
}

async function testShopsAPI() {
  console.log('\n🧪 Testing Shops API...');
  
  const event = {
    httpMethod: 'GET',
    path: '/shops',
    headers: {},
    queryStringParameters: {},
    body: null,
    pathParameters: null
  };
  
  const context = {};
  
  try {
    const result = await getShops(event, context);
    console.log('✅ Shops API Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Shops API Error:', error.message);
  }
}

async function runTests() {
  await testHealthAPI();
  await testShopsAPI();
}

runTests();