/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: '/sahidulturab',
};

export default nextConfig;
