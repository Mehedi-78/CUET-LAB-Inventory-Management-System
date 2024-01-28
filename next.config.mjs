/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    optimizeFonts: true,
    images: {
        // remotePatterns: ['images.unsplash.com', 'preschool.dreamguystech.com', 'res.cloudinary.com'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: '**',
            },
            {
                protocol: "http",
                hostname: "res.cloudinary.com",
                pathname: '**',
            },
        ],

    }
};

export default nextConfig;
