module.exports = {
  'ignorePatterns': ['**/*.js', 'dist/**/*.ts'],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'rules': {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/indent': [
      'error',
      2,
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/type-annotation-spacing': 2,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1,
        'maxEOF': 1,
      },
    ],
  },
}
