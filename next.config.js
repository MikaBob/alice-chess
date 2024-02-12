/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/alice-chess',
    images: {
        loader: 'custom',
        loaderFile: './src/img-loader.ts',
    },
    output: 'export',
}

module.exports = nextConfig
