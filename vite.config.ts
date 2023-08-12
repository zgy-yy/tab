import {defineConfig} from 'vite'

import vue from '@vitejs/plugin-vue';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/icon-api': {
                target: 'https://api.faviconkit.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/icon-api/, '')
            }
        }
    }
})
