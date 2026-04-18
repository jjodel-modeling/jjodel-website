import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jjodel.io',
  output: 'static',
  build: {
    assets: '_assets',
  },
});
