import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  css: {
    devSourcemap: true, // включаем source maps для стилей
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: './src/html', // путь к частям шаблонов
    }),
  ],
  base: '/LittleLearnes/',
  server: {
    open: '/LittleLearnes/'   // чтобы сразу открывался нужный путь
  }
});