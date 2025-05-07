import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Proxy requests starting with /api to your backend server
            '/v1/tasks/': {
                target: 'http://localhost:3000', // your backend server
                changeOrigin: true,
            },
        },
    },
});
