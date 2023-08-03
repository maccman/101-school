export const baseUrl = process.env.APP_HOST
  ? `https://${process.env.APP_HOST}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://101.school'
