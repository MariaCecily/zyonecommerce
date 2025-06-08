// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Next.js to export a static HTML site
  output: 'export',
  // For static export, Next.js Image component needs to be unoptimized
  images: {
    unoptimized: true,
  },
  // Add other configurations as needed
};

module.exports = nextConfig;