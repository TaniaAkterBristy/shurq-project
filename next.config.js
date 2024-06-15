module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["shurq.io", "localhost:8000"],
  },

  env:{
    APP_URL: process.env.APP_URL
  },
  output: 'standalone',
 };
