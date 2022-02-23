const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

const isDevelopment = process.env.NODE_ENV !== 'production';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
