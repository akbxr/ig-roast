/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    requestIp: {
      applyTrustedProxy: true,
      trustProxy: true,
    },
  },
};

export default nextConfig;
