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
        about: resolve(__dirname, 'about.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: './src/hbs', // путь к частям шаблонов
      context: {
        base: '/LittleLearnes/',
      },
    }),
  ],
  base: '/LittleLearnes/',
  server: {
    open: '/LittleLearnes/'   // чтобы сразу открывался нужный путь
  }
});