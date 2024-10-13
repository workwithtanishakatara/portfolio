/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "api.microlink.io",
      "cdn.sanity.io",
      "scontent.cdninstagram.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/?trk=:path*",
        destination: "/",
        permanent: true, // This sets it as a 301 redirect
      },
    ];
  },
};

export default nextConfig;
