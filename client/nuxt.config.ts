// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss'],
	components: {
		dirs: [
			'~/components',
			{
				path: '~/components/common',
				prefix: 'Common'
			},
			{
				path: '~/components/SVG',
				prefix: 'SVG'
			},
			{
				path: '~/components/gallery',
				prefix: 'Gallery'
			}
		]
	},
	vite: {
		server: {
			proxy: {
				'/socket.io': {
					target: 'http://localhost:3001',
					ws: true
				}
			}
		}
	}
});
