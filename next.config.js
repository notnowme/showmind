/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  images: {
    domains: ['utfs.io'],
  },
  reactStrictMode: false,
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