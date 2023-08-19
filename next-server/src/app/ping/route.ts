export async function GET() {
  return new Response('Ping', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
}
