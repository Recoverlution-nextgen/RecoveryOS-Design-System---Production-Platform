module.exports = {
  '*.{ts,tsx,js,jsx}': ['eslint --fix'],
  '*.{css,scss}': ['stylelint --fix'],
  'packages/tokens/src.json': [
    'npm --prefix packages/tokens run validate',
    'npm --prefix packages/tokens run build'
  ],
};