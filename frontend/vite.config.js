import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
	plugins: [react()],
	server: {
		open: true,
		base: '/',
		// proxy: {
		// 	'/api': {
		// 		target: 'http://localhost:3001',
		// 		changeOrigin: true,
		// 		secure: false,
		// 		rewrite: (path) => path.replace(/^\/api/, ''),
		// 	},
		// },
		// historyApiFallback: true,
	},
});
