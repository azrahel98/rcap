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
				additionalData: `@import "./theme.scss";`,
			},
		},
	},
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, './app') },
			{
				find: '@com',
				replacement: path.resolve(__dirname, './src/components'),
			},
			{
				find: '@store',
				replacement: path.resolve(__dirname, './src/store'),
			},
		],
	},
	plugins: [vue()],
})
