/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env:{
    API_URL: 'http://localhost:6100',
    DB_URI : 'mongodb://localhost:27017/ecomerce1',
    BASE_URL: 'http://localhost:3000/',
  },
  images: {
    domains: ['res.cloudinary.com','www.cloudflare.com', 'http://localhost:3000', 'http://localhost','localhost'],
  },
}

module.exports = nextConfig
