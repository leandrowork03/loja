/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.awsli.com.br',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shoppub.io',
      },
      {
        protocol: 'https',
        hostname: 'images.tcdn.com.br',
      },
      {
        protocol: 'https',
        hostname: 'images5.kabum.com.br',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'i.zst.com.br',
      },
      {
        protocol: 'https',
        hostname: 'www.wb.com.br',
      },
    ],
  },
};

module.exports = nextConfig;