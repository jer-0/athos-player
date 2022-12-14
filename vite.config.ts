import path from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3002
  },
  resolve: {
    alias: {
      '$types': path.resolve('./src/types')
    },
  },
  build: {
		target: 'es2017',
		cssTarget: 'chrome58'
	},
})
