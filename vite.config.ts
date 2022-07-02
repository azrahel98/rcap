import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
const p = path.resolve(__dirname, '.')

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 8080,
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "${p}/theme.scss";`,
			},
		},
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, './app') }],
	},
	plugins: [vue()],
})
