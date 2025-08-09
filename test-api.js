const { handler } = require('./src/handlers/health.ts');

async function testHealthAPI() {
  const event = {
    httpMethod: 'GET',
    path: '/health',
    headers: {},
    queryStringParameters: null,
    body: null
  };
  
  const context = {};
  
  try {
    const result = await handler(event, context);
    console.log('Health API Test Result:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testHealthAPI();