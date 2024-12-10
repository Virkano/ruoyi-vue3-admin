import presetRemToPx from '@unocss/preset-rem-to-px'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  //   https://unocss.dev/presets/attributify
  presets: [
    presetUno(),
    presetAttributify(),
    presetRemToPx({
      baseFontSize: 4,
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    // presetWebFonts({
    // fonts: {
    //   sans: 'DM Sans',
    //   serif: 'DM Serif Display',
    //   mono: 'DM Mono',
    // },
    // }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: 'prose m-auto text-left'.split(' '),
  rules: [],
  theme: {
    colors: {},
  },
})
