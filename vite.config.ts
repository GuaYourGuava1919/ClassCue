// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: './', // ✅ 否則部署後重整會 404
  build: {
    outDir: 'dist'
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // 自動引入 SCSS 變數
        additionalData: `@import "@/scss/_variables.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 這樣才可以用 @ 當作 src 路徑
    },
  },
})
