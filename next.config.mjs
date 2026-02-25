/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "images.unsplash.com",
    //   "api.microlink.io",
    //   "cdn.sanity.io",
    //   "scontent.cdninstagram.com",
    // ],
    remotePatterns: [
     {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
     },
      {
        protocol: "https",
        hostname: "api.microlink.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "trk",
          },
        ],
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
