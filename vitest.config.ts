/// <reference types="vitest" />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    pool: 'forks',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/app/**/*.ts'],
      exclude: [
        'src/app/**/*.spec.ts',
        'src/app/app.config.ts',
        'src/app/app.routes.ts',
        'src/main.ts',
        'src/environments/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@core': new URL('./src/app/core', import.meta.url).pathname,
      '@shared': new URL('./src/app/shared', import.meta.url).pathname,
      '@features': new URL('./src/app/features', import.meta.url).pathname,
      '@layouts': new URL('./src/app/layouts', import.meta.url).pathname,
    },
  },
});
