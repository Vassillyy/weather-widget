import adapter from '@sveltejs/adapter-static'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    files: {
      routes: 'src/app/routes',
      lib: 'src',
      // appTemplate: 'index.html',
      assets: 'public'
    },
    alias: {
      '@/*': 'src/*'
    },
    paths: {
      base: '/weather-widget'
    }
  }
}

export default config
