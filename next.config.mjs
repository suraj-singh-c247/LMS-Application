/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true, // It's using for double invokes functions
  //  in development for catching bugs early.
  // You can stop dobule invoking reactStrictMode should be false.
};

export default nextConfig;
