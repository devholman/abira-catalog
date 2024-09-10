// @ts-check

/**
 * @type {import('next').NextConfig}
 */

export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "catalog-images1.s3.us-east-2.amazonaws.com", // Your S3 bucket hostname
        port: "", // Leave this empty unless you need a specific port
        pathname: "/**", // This allows all paths under the bucket
      },
    ],
    domains: ["catalog-images1.s3.us-east-2.amazonaws.com"],
  },
};
