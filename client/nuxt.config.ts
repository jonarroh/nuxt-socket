// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss'],
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
