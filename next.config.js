/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
  },
}

const stylexPlugin = require('@stylexjs/nextjs-plugin');

module.exports = {
  ...stylexPlugin({
    rootDir: __dirname,
  })({}),
  ...nextConfig
}