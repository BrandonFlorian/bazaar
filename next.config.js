/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", process.env.NEXT_PUBLIC_IMAGE_HOSTNAME],
  },
};

module.exports = nextConfig;
