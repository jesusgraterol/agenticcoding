import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import { MOVED_COOKBOOK_RECIPES, SITE_CONFIG } from './src/site.config.ts';

export default defineConfig({
  site: SITE_CONFIG.url,
  output: 'static',
  trailingSlash: 'always',
  // static refresh pages keep former recipe URLs working; Astro leaves them out of the sitemap
  redirects: Object.fromEntries(
    Object.entries(MOVED_COOKBOOK_RECIPES).map(([slug, skill]) => [
      `/cookbook/${slug}`,
      `/workflow/#${skill}`,
    ]),
  ),
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
