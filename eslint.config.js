// eslint.config.js
import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    // Or customize the stylistic rules
    stylistic: {
      indent: 2, // 4, or 'tab'
      quotes: 'single', // or 'double'
    },
    // TypeScript and Vue are auto-detected, you can also explicitly enable them:
    typescript: true,
    vue: true,

    // Disable jsonc and yaml support
    jsonc: false,
    yaml: false,

    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
      '**/fixtures',
      // ...globs
    ],
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'no-extra-boolean-cast': 'off',
    },
  },
  // Legacy config
  ...compat.config({
    extends: [
      './.eslintrc-auto-import.json',
      // Other extends...
    ],
  }),
)
