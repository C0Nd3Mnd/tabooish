const WARN = 1

module.exports = {
  root: true,
  extends: ['@c0nd3mnd/eslint-config-typescript', 'plugin:vue/vue3-essential'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020
  },
  env: {
    node: true
  },
  rules: {
    'vue/attribute-hyphenation': WARN,
    'vue/html-self-closing': [
      WARN,
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/v-bind-style': WARN,
    'vue/v-on-style': WARN,
    'vue/attributes-order': WARN,
    'vue/no-v-html': WARN,
    'vue/this-in-template': WARN,
    'vue/component-name-in-template-casing': [WARN, 'kebab-case'],
    'vue/v-slot-style': [
      WARN,
      {
        atComponent: 'longform',
        default: 'longform',
        named: 'longform'
      }
    ],
    'vue/valid-v-bind-sync': WARN,
    'vue/valid-v-slot': WARN,
    'jsdoc/require-jsdoc': [
      WARN,
      {
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true
        },
        contexts: ['ClassProperty', 'TSInterfaceDeclaration']
      }
    ]
  }
}
