import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['picsum.photos'],
      },
};

export default withNextVideo(nextConfig);