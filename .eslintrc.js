module.exports = {
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
  },
  plugins: ['react'],
};
