import adapter from '@sveltejs/adapter-auto'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
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
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    }
  }
}

export default config
