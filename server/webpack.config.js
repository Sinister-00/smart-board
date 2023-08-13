const path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './index.ts',
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    },
  },
  module: {
    rules: [{ test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' }],
  },
  externals: ['express', 'express-session'],
  plugins: [
    new webpack.DefinePlugin({
      'typeof window': '"object"',
      'process.env': {
        PORT: JSON.stringify(process.env.PORT || 3000),
      },
    }),
  ],
};
