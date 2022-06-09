/** @type {import('next').NextConfig} */
const withImages = require('next-images');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const withNextEnv = nextEnv();
let moduleExports = withImages(withNextEnv());

// next.js configuration
const nextConfig = {
  images: {
    disableStaticImages: true,
  },
  reactStrictMode: true,
  ...moduleExports,
  devIndicators: {
    autoPrerender: false,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
