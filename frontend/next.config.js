/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:8000/:path*',
        basePath: false,
        permanent: false,
      }
    ]
  }
};

export default nextConfig;
