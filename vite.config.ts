import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import Markdown from 'vite-plugin-vue-markdown'
import pluginRewriteAll from 'vite-plugin-rewrite-all'

export default defineConfig({
  base: '/simwrapper/',
  build: { sourcemap: true },
  plugins: [
    // vue
    vue({ include: [/\.vue$/, /\.md$/] }),
    // markdown
    Markdown(),
    // why do we need rewriteAll
    pluginRewriteAll(),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '~': '/node_modules',
      path: 'path-browserify',
    },
  },
  define: {
    'process.platform': null,
    'process.env': [],
  },
})
