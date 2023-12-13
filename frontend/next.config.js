/** @type {import('next').NextConfig} */

const nextConfig = {
	rewrites() {
		return [
			{
				source: '/images/:path*',
				destination: `${process.env.server}/images/:path*`
			}
		]
	},

	images: {
		remotePatterns: [
			{
				hostname: 'localhost'
			},
			{
				hostname: 'server'
			}
		]
	}
}

module.exports = nextConfig
