import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    mdxRs: true,              // use the MDX Rust compiler
  },
  webpack: (config) => {
    // Fix for Contentlayer imports in ESM builds
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "contentlayer/generated": "./.contentlayer/generated",
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: false,  // keep true if you want stricter builds
  },
};

export default withContentlayer(nextConfig);

