// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: false,
  },
  env: {
    node: true,
    browser: true,
  },
  globals: {
    DEBUG: false,
    HS_URL: false,
    BASE_URL: false,
    NETDISK_URL: false,
    APP_EDITION: false,
    APP_TYPE: false,
    APP_ALIAS: false,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/essential',
    // 'plugin:vue/recommended',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // ignore unused vars start with `_`, e.g. `_foo`
    'no-unused-vars': ['warn', {'args': 'all', 'argsIgnorePattern': '^_(.*)_$'}],
    // allow console in dev
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': ['error', 'never'],
    'prefer-destructuring': 'off',
    'no-unused-expressions': 'off',
    'max-len': 'warn',
    'no-mixed-operators': 'off',
    'indent': ['error', 2],
  },
}