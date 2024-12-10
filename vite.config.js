import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'
import { createProxy } from './vite/proxy'
import { wrapperEnv } from './vite/util'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PROXY, VITE_APP_ENV, VITE_PUBLIC_PATH } = viteEnv
  /** 颗粒度更细的分包 */
  const manualChunks = (id) => {
    if (id.includes('node_modules')) {
      if (id.includes('lodash-es')) {
        return 'lodash-vendor'
      }
      if (id.includes('element-plus')) {
        return 'el-vendor'
      }
      if (id.includes('@vue') || id.includes('vue')) {
        return 'vue-vendor'
      }
      return 'vendor'
    }
  }
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.xxx.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.xxxx.com/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === 'development' ? '/' : VITE_PUBLIC_PATH,
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src'),
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    // vite 相关配置
    server: {
      port: VITE_PORT,
      host: true,
      open: true,
      proxy: createProxy(VITE_PROXY),
    },
    define: {
      // 启用生产环境构建下激活不匹配的详细警告
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
    build: {
      chunkSizeWarningLimit: 1500, // 超出 chunk 大小警告阈值，默认500kb
      // Rollup 打包配置
      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/[name]-[hash:8].js', // 入口文件名称
          chunkFileNames: 'assets/js/[name]-[hash:8].js', // 引入文件名名称
          assetFileNames: 'assets/[ext]/[name]-[hash:8][extname]', // 静态资源名称
          manualChunks,
        },
      },
      // 添加esbuild配置 非测试环境去掉console debugger
      esbuild: {
        drop: process.env.NODE_ENV === 'development' ? [] : ['console', 'debugger'],
      },
    },
  }
})
