/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      }
    ]
  },
}

const stylexPlugin = require('@stylexjs/nextjs-plugin');

module.exports = {
  ...stylexPlugin({
    aliases: {
      '@/*': [path.join(__dirname, '*')],
    },
    rootDir: __dirname,
  })({}),
  ...nextConfig
}