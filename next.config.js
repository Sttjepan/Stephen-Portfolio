/** @type {import('next').NextConfig} */
const nextConfig = {
  // enable static “out/” folder export:
  output: 'export',

  images: {
    // disable the Image Optimization API so <Image> will just emit a normal <img>
    unoptimized: true,

    domains: [
      'i.scdn.co',
      'image-cdn-ak.spotifycdn.com',
      'blend-playlist-covers.spotifycdn.com',
      'image-cdn-fa.spotifycdn.com',
      'miro.medium.com',
      'cdn-images-1.medium.com',
    ],
  },
}

export default nextConfig
