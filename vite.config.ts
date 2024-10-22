import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
	  proxy: {
		'/api': {
		  target: 'http://localhost:1337/',
		//   changeOrigin: true,
		//   rewrite: (path) => {
		// 	console.log('Rewriting path:', path);
		// 	return path.replace(/^\/api/, '');
		//   }
		},
	  }
	}
  });
