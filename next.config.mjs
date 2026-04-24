// @ts-check

/**
 * @type {import('next').NextConfig}
 */

export default {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "catalog-images1.s3.us-east-2.amazonaws.com", // Your S3 bucket hostname
        port: "", // Leave this empty unless you need a specific port
        pathname: "/**", // This allows all paths under the bucket
      },
      {
        protocol: "https",
        hostname: "shippo-static.s3.amazonaws.com",
        port: "", // Leave this empty unless you need a specific port
        pathname: "/**", // This allows all paths
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
