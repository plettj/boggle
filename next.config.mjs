/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "/boggle",
  // TODO: Upgrade to Next.js 15 to remove the following code.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/boggle/_next/:path+",
          destination: "/_next/:path+",
        },
      ],
    };
  },
};

export default nextConfig;
