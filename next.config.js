/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              "</bbg.png>; rel=preload; as=image, </b.png>; rel=preload; as=image, </customize_bg.png>; rel=preload; as=image, </vid.mp4>; rel=preload; as=video",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [96, 128, 158, 256, 320],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
