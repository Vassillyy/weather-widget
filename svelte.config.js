import adapter from '@sveltejs/adapter-static'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    files: {
      routes: 'src/app/routes',
      lib: 'src',
      appTemplate: 'index.html',
      assets: 'public'
    },
    alias: {
      '@/*': 'src/*'
    },
    paths: {
      base: process.env.VITE_MY_REPOSITORY || '/weather-widget'
    }
  }
}

export default config
