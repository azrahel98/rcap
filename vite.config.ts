import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

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
			{
				find: '@boostrap',
				replacement: path.resolve(__dirname, './node_modules/bootstrap'),
			},
			{ find: '@', replacement: path.resolve(__dirname, './app') },
			{
				find: '@com',
				replacement: path.resolve(__dirname, './src/components'),
			},
			{
				find: '@store',
				replacement: path.resolve(__dirname, './src/store'),
			},
			{
				find: '@app/imp',
				replacement: path.resolve(__dirname, './app/implement'),
			},
		],
	},
	plugins: [vue()],
})
