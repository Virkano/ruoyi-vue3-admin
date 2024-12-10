import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

import createAutoImport from './auto-import'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import createSvgIcon from './svg-icon'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue(), UnoCSS()]
  // vitePlugins.push(createAutoImport())
  createAutoImport(vitePlugins)
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
