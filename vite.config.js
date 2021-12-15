import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],

  server: {
    proxy: {
      '/api': {
        // target: 'http://120.53.231.88',
        target: 'http://localhost:8023',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
