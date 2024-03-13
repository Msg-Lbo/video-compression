import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      Components({
        // dirs: ['src/components'],
        // extensions: ['vue'],
        // dts: 'src/components.d.ts'
        resolvers: [ElementPlusResolver()]
      }),
      AutoImport({
        dts: 'src/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()]
      })
    ]


  }
})
